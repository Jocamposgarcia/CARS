from django.db import models

# Create your models here.


class Car(models.Model):

    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    mileage = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)




