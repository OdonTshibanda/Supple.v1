from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("apps.users.urls")),
    path("api/foods/", include("apps.foods.urls")),
    path("api/orders/", include("apps.orders.urls")),
    path("api/reservations/", include("apps.reservations.urls")),
    path("api/payments/", include("apps.payments.urls")),
    path("api/orders/", include("apps.orders.urls"))
]
