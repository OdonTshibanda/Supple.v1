from django.db import models

# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=150)

    description = models.TextField(blank=True)

    price = models.DecimalField(max_digits=5, decimal_places=2)

    image = models.URLField(blank=True)

    isAvailable = models.BooleanField(default=True)

    def __str__(self):
        return self.name