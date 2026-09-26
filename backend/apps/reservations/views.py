from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Reservation
from .serializers import ReservationSerializer


class ReservationViewSet(viewsets.ModelViewSet):
	serializer_class = ReservationSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		return Reservation.objects.filter(user=self.request.user).order_by("-reservation_at")
