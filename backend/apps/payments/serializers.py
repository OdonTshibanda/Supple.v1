from rest_framework import serializers

from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    order_total = serializers.DecimalField(
        source="order.total_amount",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    class Meta:
        model = Payment
        fields = [
            "id",
            "order",
            "order_total",
            "amount",
            "status",
            "transaction_id",
            "paid_at",
            "created_at",
        ]
        read_only_fields = ["id", "order_total", "amount", "created_at"]

    def validate(self, attrs):
        order = attrs.get("order")
        if order is None and self.instance is not None:
            order = self.instance.order

        if order is None:
            raise serializers.ValidationError({"order": "La commande est obligatoire."})

        if Payment.objects.filter(order=order).exclude(pk=getattr(self.instance, "pk", None)).exists():
            raise serializers.ValidationError("Cette commande possède déjà un paiement.")
        attrs["amount"] = order.total_amount
        return attrs