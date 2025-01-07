from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator


#https://dbdiagram.io/d/67633acf84c7410727213f67
# Create your models here.
class Patient(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    nric = models.CharField(
        max_length=255,
        validators=[
            RegexValidator(
                regex=r"[A-Z]\d{7}[A-Z]",
                message="Enter a valid NRIC",
            )
        ],
        unique=True
    )
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=4, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()

    def __str__(self):
        return self.nric
    
class WardType(models.Model):
    WARD_CHOICES = (
        ("A1", "A1"),
        ("B1", "B1"),
        ("B2", "B2"),
        ("C1", "C1"),
        ("C2", "C2")
    )
    name = models.CharField(max_length=2, choices=WARD_CHOICES, unique=True)
    number_of_beds = models.IntegerField()

    def __str__(self):
        return self.name
    
class Ward(models.Model):
    name = models.CharField(max_length=255, unique=True)
    type = models.ForeignKey(WardType, on_delete=models.CASCADE)
    available_beds = models.IntegerField()

    def __str__(self):
        return self.name

class Admission(models.Model):
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE)
    reason_for_admission = models.CharField(max_length=255)
    date_and_time_of_admission = models.DateTimeField()
    assigned_ward = models.ForeignKey(Ward, on_delete=models.CASCADE)
    is_discharged = models.BooleanField()
    date_and_time_of_discharge = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return str(self.pk).zfill(5)
