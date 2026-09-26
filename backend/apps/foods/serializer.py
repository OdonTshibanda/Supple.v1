from rest_framework import serializers

from .models import Food


class FoodSerializer(serializers.ModelSerializer):
	class Meta:
		model = Food
		fields = [
			"id",
			"name",
			"description",
			"price",
			"image",
			"isAvailable",
		]
		read_only_fields = ["id"]

	def validate_price(self, value):
		if value < 0:
			raise serializers.ValidationError("Le prix ne peut pas être négatif.")
		return value
