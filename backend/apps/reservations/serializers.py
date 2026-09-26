from rest_framework import serializers

from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Reservation
        fields = [
            "id",
            "user",
            "user_email",
            "reservation_at",
            "guest_count",
            "status",
            "notes",
            "created_at",
        ]
        read_only_fields = ["id", "user", "user_email", "created_at"]

    def validate_guest_count(self, value):
        if value < 1:
            raise serializers.ValidationError("Le nombre de personnes doit être supérieur à zéro.")
        return value

    def create(self, validated_data):
        return Reservation.objects.create(user=self.context["request"].user, **validated_data)