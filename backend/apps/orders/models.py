from decimal import Decimal

from django.conf import settings
from django.db import models


class Order(models.Model):
	class Status(models.TextChoices):
		PENDING = "PENDING", "Pending"
		CONFIRMED = "CONFIRMED", "Confirmed"
		PREPARING = "PREPARING", "Preparing"
		READY = "READY", "Ready"
		DELIVERED = "DELIVERED", "Delivered"
		CANCELLED = "CANCELLED", "Cancelled"

	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="orders")
	status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
	total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) 
	created_at = models.DateTimeField(auto_now_add=True) 

	def __str__(self):
		return f"Order #{self.id}"


class OrderItem(models.Model):
	order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
	food = models.ForeignKey("foods.Food", on_delete=models.PROTECT, related_name="order_items")
	quantity = models.PositiveIntegerField(default=1)
	unit_price = models.DecimalField(max_digits=10, decimal_places=2)

	def __str__(self):
		return f"{self.quantity} x {self.food.name}"
