from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Therapist, Patient, ProfessionalDetails, Preferences, Exercise

# here the request is sent from frondend to backend, fe - create new therapist
class TherapistRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Therapist
        fields = ['first_name', 'last_name', 'id', 'license_id', 'email', 'phone_number', 'password', 'is_professional']
        extra_kwargs = {'password': {'write_only': True}}  # Hide password field from response

    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])

        therapist = Therapist.objects.create(**validated_data)
        return therapist

class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = ['interested_in_notifications', 'interested_in_calendar_sync']

class PatientSerializer(serializers.ModelSerializer):
    preferences = PreferencesSerializer()

    class Meta:
        model = Patient
        fields = [
            'first_name', 'last_name', 'id', 'email', 'phone_number', 'password',
            'id_photo', 'injury', 'pain_scale', 'height', 'weight', 'preferences'
        ]

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        preferences_data = validated_data.pop('preferences')
        preferences = Preferences.objects.create(**preferences_data)
        patient = Patient.objects.create(preferences=preferences, **validated_data)
        return patient
        

class TherapistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Therapist
        fields = '__all__'
        

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class ProfessionalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalDetails
        fields = '__all__'

class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = '__all__'
        
class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'