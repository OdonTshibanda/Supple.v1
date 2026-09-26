from rest_framework import generics

from .models import Food
from .permissions import FoodPermission
from .serializer import FoodSerializer


class FoodViewSet(generics.ListCreateAPIView):
	queryset = Food.objects.all()
	serializer_class = FoodSerializer
	permission_classes = [FoodPermission]

class FoodDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Food.objects.all()
	serializer_class = FoodSerializer
	permission_classes = [FoodPermission]
