from socketserver import ThreadingUDPServer
from django.db import models

# Create your models here.
from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    vip = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveSmallIntegerField(unique=True)

class Appointment(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    owner = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField(auto_now=False, auto_now_add=False)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    reason = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)