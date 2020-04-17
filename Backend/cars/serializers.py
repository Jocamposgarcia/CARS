from rest_framework import serializers
from .models import Car


# Car serializer
class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'
