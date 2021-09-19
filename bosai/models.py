from django.db import models

# Create your models here.
class ShelterModel(models.Model):
    ward = models.CharField(max_length=10)
    gakku = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    capacity = models.IntegerField(default=0)
    tel = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    hokui = models.DecimalField(max_digits=10, decimal_places=8)
    tokei = models.DecimalField(max_digits=11, decimal_places=8)
    url = models.URLField()
    image = models.URLField()
    distance = models.IntegerField(default=0)
    def __str__(self):
        return self.name