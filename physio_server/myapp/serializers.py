from rest_framework import serializers
from .models import Therapist, Patient, ProfessionalDetails, Preferences

class TherapistRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Therapist
        fields = ['first_name', 'last_name', 'license_id', 'email', 'phone_number', 'password', 'is_professional']

    def create(self, validated_data):
        therapist = Therapist.objects.create(**validated_data)
        therapist.set_password(validated_data['password'])
        therapist.save()
        return therapist
        

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
