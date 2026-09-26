import re
from urllib.parse import urlparse

from django.contrib.auth import get_user_model
from django.core import mail
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()

PASSWORD = "V3ry-Safe!Password-2026"


class RegistrationTests(APITestCase):
    def registration_payload(self, **overrides):
        payload = {
            "email": "new.customer@example.com",
            "username": "new.customer@example.com",
            "password": PASSWORD,
            "first_name": "New",
            "last_name": "Customer",
        }
        payload.update(overrides)
        return payload

    def test_registration_saves_a_hashed_password_in_the_database(self):
        response = self.client.post(
            "/api/auth/register/", self.registration_payload(), format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(email="new.customer@example.com")
        self.assertTrue(user.check_password(PASSWORD))
        self.assertNotEqual(user.password, PASSWORD)
        self.assertEqual(user.role, User.Role.CUSTOMER)

    def test_registration_rejects_duplicate_email(self):
        payload = self.registration_payload()
        self.client.post("/api/auth/register/", payload, format="json")

        response = self.client.post("/api/auth/register/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.filter(email=payload["email"]).count(), 1)

    def test_registration_rejects_a_common_password(self):
        response = self.client.post(
            "/api/auth/register/",
            self.registration_payload(password="password123"),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
        self.assertFalse(User.objects.filter(email="new.customer@example.com").exists())


class JwtAuthenticationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="customer@example.com",
            email="customer@example.com",
            password=PASSWORD,
            first_name="Supple",
            last_name="Customer",
        )

    def login(self, password=PASSWORD):
        return self.client.post(
            "/api/auth/login/",
            {"email": self.user.email, "password": password},
            format="json",
        )

    def test_login_returns_access_and_refresh_tokens(self):
        response = self.login()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["access"])
        self.assertTrue(response.data["refresh"])

    def test_wrong_password_is_rejected(self):
        response = self.login(password="incorrect-password")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_profile_requires_a_token_and_returns_the_database_user(self):
        anonymous_response = self.client.get("/api/auth/me/")
        self.assertEqual(anonymous_response.status_code, status.HTTP_401_UNAUTHORIZED)

        tokens = self.login().data
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")
        profile_response = self.client.get("/api/auth/me/")

        self.assertEqual(profile_response.status_code, status.HTTP_200_OK)
        self.assertEqual(profile_response.data["id"], self.user.id)
        self.assertEqual(profile_response.data["email"], self.user.email)

    def test_refresh_returns_a_new_access_token(self):
        tokens = self.login().data

        response = self.client.post(
            "/api/auth/refresh/", {"refresh": tokens["refresh"]}, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["access"])

    def test_logout_revokes_the_refresh_token(self):
        tokens = self.login().data
        response = self.client.post(
            "/api/auth/logout/",
            {"refresh": tokens["refresh"]},
            format="json",
            HTTP_AUTHORIZATION=f"Bearer {tokens['access']}",
        )

        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)
        refresh_response = self.client.post(
            "/api/auth/refresh/", {"refresh": tokens["refresh"]}, format="json"
        )
        self.assertEqual(refresh_response.status_code, status.HTTP_401_UNAUTHORIZED)


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
    FRONTEND_URL="https://supple.example",
)
class PasswordResetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="reset.customer@example.com",
            email="reset.customer@example.com",
            password=PASSWORD,
        )

    def test_request_sends_a_reset_link_without_disclosing_unknown_emails(self):
        response = self.client.post(
            "/api/auth/password-reset/",
            {"email": self.user.email},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("https://supple.example/auth/reset/", mail.outbox[0].body)

        unknown_response = self.client.post(
            "/api/auth/password-reset/",
            {"email": "unknown@example.com"},
            format="json",
        )
        self.assertEqual(unknown_response.status_code, response.status_code)
        self.assertEqual(unknown_response.data, response.data)
        self.assertEqual(len(mail.outbox), 1)

    def test_reset_link_changes_password_and_allows_login_with_new_password(self):
        self.client.post(
            "/api/auth/password-reset/",
            {"email": self.user.email},
            format="json",
        )
        reset_url = re.search(r"https?://[^\s]+", mail.outbox[0].body).group(0)
        path_parts = urlparse(reset_url).path.strip("/").split("/")
        uid, token = path_parts[-2:]
        new_password = "An0ther-Safe!Password-2026"

        reset_response = self.client.post(
            "/api/auth/password-reset/confirm/",
            {"uid": uid, "token": token, "password": new_password},
            format="json",
        )

        self.assertEqual(reset_response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(new_password))
        self.assertEqual(self.login(new_password).status_code, status.HTTP_200_OK)
        self.assertEqual(self.login(PASSWORD).status_code, status.HTTP_401_UNAUTHORIZED)

    def test_reset_rejects_invalid_token_and_weak_password(self):
        self.client.post(
            "/api/auth/password-reset/",
            {"email": self.user.email},
            format="json",
        )
        reset_url = re.search(r"https?://[^\s]+", mail.outbox[0].body).group(0)
        uid, token = urlparse(reset_url).path.strip("/").split("/")[-2:]

        invalid_token_response = self.client.post(
            "/api/auth/password-reset/confirm/",
            {"uid": uid, "token": "invalid-token", "password": "An0ther-Safe!Password-2026"},
            format="json",
        )
        weak_password_response = self.client.post(
            "/api/auth/password-reset/confirm/",
            {"uid": uid, "token": token, "password": "password123"},
            format="json",
        )

        self.assertEqual(invalid_token_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(weak_password_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(self.user.check_password(PASSWORD))

    def login(self, password):
        return self.client.post(
            "/api/auth/login/",
            {"email": self.user.email, "password": password},
            format="json",
        )
