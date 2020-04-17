from .models import Car
from rest_framework import viewsets, permissions
from .serializers import CarSerializer

# Car Viewset


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CarSerializer
