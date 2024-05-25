from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Therapist, Patient, ProfessionalDetails, Preferences
from .serializers import TherapistRegistrationSerializer,TherapistSerializer, PatientSerializer, ProfessionalDetailsSerializer, PreferencesSerializer

class TherapistRegistrationView(APIView):
    def post(self, request):
        serializer = TherapistRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TherapistViewSet(viewsets.ModelViewSet):
    queryset = Therapist.objects.all()
    serializer_class = TherapistSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class ProfessionalDetailsViewSet(viewsets.ModelViewSet):
    queryset = ProfessionalDetails.objects.all()
    serializer_class = ProfessionalDetailsSerializer

class PreferencesViewSet(viewsets.ModelViewSet):
    queryset = Preferences.objects.all()
    serializer_class = PreferencesSerializer
