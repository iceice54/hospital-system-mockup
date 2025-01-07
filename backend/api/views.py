from django.shortcuts import render
from django.views import generic
from .serializers import PatientSeralizer, WardSerializer, WardTypeSerializer, CreatePatientSerializer, CreateWardSerializer, CreateWardTypeSerializer
from .models import Patient, Ward, WardType
from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class PatientViewSet(viewsets.ModelViewSet):
    # template_name = "patients/patients.html"
    model = Patient
    serializer_class = PatientSeralizer

    def get_queryset(self):
        return Patient.objects.all()
    
    def perform_create(self, serializer):
        serializer.save()
    
    def create(self, request, *args, **kwargs):
        serializer = CreatePatientSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(PatientSeralizer(serializer.instance).data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)
    
class WardViewSet(viewsets.ModelViewSet):
    model = Ward
    serializer_class = WardSerializer

    def get_queryset(self):
        return Ward.objects.all()

    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = CreateWardSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(WardSerializer(serializer.instance).data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)
    
class WardTypeViewSet(viewsets.ModelViewSet):
    model = WardType
    serializer_class = WardTypeSerializer
    
    def get_queryset(self):
        return WardType.objects.all()
    
    def create(self, request, *args, **kwargs):
        serializer = CreateWardTypeSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(WardTypeSerializer(serializer.instance).data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)
    
# class CreatePatientView(APIView):
#     serializer_class = CreatePatientSerializer

#     def post(self, request, format=None):
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
        
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             name = serializer.data.get("name")
#             age = serializer.data.get("age")
#             nric = serializer.data.get("nric")
#             gender = serializer.data.get("gender")
#             date_of_birth = serializer.data.get("date_of_birth")

#             patient = Patient(name=name, age=age, nric=nric, gender=gender, date_of_birth=date_of_birth)
#             patient.save()

#             return Response(PatientSeralizer(patient).data, status=status.HTTP_201_CREATED)
    
#         return Response({"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)

