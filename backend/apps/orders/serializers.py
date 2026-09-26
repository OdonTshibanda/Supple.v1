from rest_framework import serializers

from apps.foods.models import Food
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    food_name = serializers.CharField(source="food.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "food",
            "food_name",
            "quantity",
            "unit_price",
        ]
        read_only_fields = ["id", "food_name", "unit_price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "status",
            "total_amount",
            "created_at",
            "items",
        ]
        read_only_fields = [
            "id",
            "user",
            "status",
            "total_amount",
            "created_at",
        ]

    def create(self, validated_data):
        items_data = self.initial_data.get("items", [])
        order = Order.objects.create(
            user=self.context["request"].user,
            **validated_data,
        )

        total = 0

        for item_data in items_data:
            food_id = item_data.get("food")
            quantity = item_data.get("quantity", 1)
            food = Food.objects.get(id=food_id)
            unit_price = food.price

            OrderItem.objects.create(
                order=order,
                food=food,
                quantity=quantity,
                unit_price=unit_price,
            )
            total += unit_price * quantity

        order.total_amount = total
        order.save(update_fields=["total_amount"])
        return order