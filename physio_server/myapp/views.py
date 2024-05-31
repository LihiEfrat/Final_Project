from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Therapist, Patient, ProfessionalDetails, Preferences,Training,Exercise
from .serializers import TherapistRegistrationSerializer,TherapistSerializer, PatientSerializer, ProfessionalDetailsSerializer, PreferencesSerializer,TrainingSerializer, ExerciseSerializer
from django.contrib.auth.hashers import check_password

class CustomLoginView(APIView):
    def match_passwords(self, input_password, obj):
        if check_password(input_password, obj.password):
            return obj
        else:
            return None
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Attempt to authenticate the user
        therapist = Therapist.objects.filter(email=email).first()
        patient = Patient.objects.filter(email=email).first()
        if therapist:
            user = self.match_passwords(password, therapist)
            is_therapist = True
        elif patient:
            user = self.match_passwords(password, patient)
            is_therapist = False
        else:
            # User with the provided email does not exist
            return Response({'detail': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        if user is not None:
            # Authentication successful
            return Response({'is_therapist': is_therapist}, status=status.HTTP_200_OK)
        else:
            # Invalid credentials
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

class TherapistRegistrationView(APIView):
    def post(self, request):
        serializer = TherapistRegistrationSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientRegistrationView(APIView):
    def post(self, request):
        serializer = PatientSerializer(data=request.data)
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

class TrainingView(APIView):
    def post(self, request):
        serializer = TrainingSerializer(data=request.data)
        if serializer.is_valid():
            training = serializer.save()
            return Response(TrainingSerializer(training).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExerciseView(APIView):
    def post(self, request):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TrainingViewSet(viewsets.ModelViewSet):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
