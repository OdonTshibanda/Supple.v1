from django.db import models

class Payment(models.Model):
	class Status(models.TextChoices):
		PENDING = "PENDING", "Pending"
		COMPLETED = "COMPLETED", "Completed"
		FAILED = "FAILED", "Failed"
		REFUNDED = "REFUNDED", "Refunded"

	order = models.OneToOneField("orders.Order", on_delete=models.CASCADE, related_name="payment")
	amount = models.DecimalField(max_digits=10, decimal_places=2)
	status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
	transaction_id = models.CharField(max_length=255, unique=True, blank=True)
	paid_at = models.DateTimeField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Payment for Order #{self.order_id}"
