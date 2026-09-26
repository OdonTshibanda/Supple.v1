from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from .models import Payment
from .serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
	serializer_class = PaymentSerializer
	permission_classes = [IsAdminUser]

	def get_queryset(self):
		return Payment.objects.filter(order__user=self.request.user).select_related("order")
