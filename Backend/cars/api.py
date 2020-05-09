from .models import Car
from rest_framework import viewsets, permissions

from .serializers import CarSerializer
from django.contrib import admin
from django.contrib.auth.decorators import permission_required
from .permissions import CustomedModelPermissions

# Car Viewset


class CarViewSet(viewsets.ModelViewSet):

    permission_classes = [
        # permissions.DjangoModelPermissions
        # CustomedModelPermissions
    ]

    def get_queryset(self):
        return Car.objects.all()

    serializer_class = CarSerializer
