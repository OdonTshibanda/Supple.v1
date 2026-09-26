from rest_framework.permissions import BasePermission


class FoodPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        #TOUT LE MONDE PEUT CONSULTER FOOD

        if not request.user.is_authenticated:
            return False

        #SAUF LES NON AUTH..

        is_admin = (
            request.user.is_superuser
            or request.user.is_staff
            or request.user.role == "ADMIN"
        )

        if request.method in ["POST", "PATCH", "PUT"]:
            return is_admin or request.user.role == "STAFF"

        if request.method == "DELETE":
            return is_admin
        
        return False