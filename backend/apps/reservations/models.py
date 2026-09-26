from django.db import models

class Reservation(models.Model):
	class Status(models.TextChoices):
		PENDING = "PENDING", "Pending"
		CONFIRMED = "CONFIRMED", "Confirmed"
		COMPLETED = "COMPLETED", "Completed"
		CANCELLED = "CANCELLED", "Cancelled"

	user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="reservations")
	reservation_at = models.DateTimeField()
	guest_count = models.PositiveIntegerField(default=1)
	status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
	notes = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Reservation #{self.pk}"
