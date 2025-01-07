from rest_framework import serializers

from . models import Patient, Ward, WardType

class PatientSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ("id", "name", "age", "nric", "gender", "date_of_birth")

class WardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = ("id", "name", "type", "available_beds")

class WardTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WardType
        fields = ("id", "name", "number_of_beds")

class CreatePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ("name", "age", "nric", "gender", "date_of_birth")

class CreateWardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = ("id", "name", "type", "available_beds")

class CreateWardTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WardType
        fields = ("id", "name", "number_of_beds")