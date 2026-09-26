from os import name

from django.urls import path

from .views import FoodViewSet, FoodDetailView


urlpatterns = [
	path("", FoodViewSet.as_view(), name="food-list"),
    path("<int:pk>/", FoodDetailView.as_view(), name="food-detail")
]