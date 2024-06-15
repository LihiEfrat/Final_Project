import requests
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

from .models import Therapist, Patient, ProfessionalDetails, Preferences, Exercise, ExercisePlan, Training
# here the request is sent from frondend to backend, fe - create new therapist
class TherapistRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Therapist
        fields = ['first_name', 'last_name', 'user_id', 'license_id', 'email', 'phone_number', 'password', 'is_professional']
        extra_kwargs = {'password': {'write_only': True}}  # Hide password field from response

    def create(self, validated_data):

        # Extract the license_id from the validated data
        license_id = validated_data.get('license_id')

        # External API endpoint
        url = f"https://practitionersapi.health.gov.il/Practitioners/api/Practitioners/GetProfessionsLicenseCount?professionId=10&licenseNum={license_id}"
        
        # Make the API call
        response = requests.get(url)
        
        if response.status_code == 200:
            # Check the API response
            api_result = response.json()
            if api_result != 1:
                # If the license is invalid, raise a ValidationError
                raise ValidationError({"license_id": "The provided license ID is invalid."})
        else:
            # If the API call fails, raise a ValidationError
            raise ValidationError({"license_id": "There was an error validating the license ID. Please try again later."})



        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])

        therapist = Therapist.objects.create(**validated_data)
        return therapist

class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = ['interested_in_notifications', 'interested_in_calendar_sync']

class PatientRegisterSerializer(serializers.ModelSerializer):
    preferences = PreferencesSerializer()

    class Meta:
        model = Patient
        fields = [
            'first_name', 'last_name', 'user_id', 'email', 'phone_number', 'password',
            'id_photo', 'injury', 'pain_scale', 'height', 'weight', 'preferences'
        ]

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        preferences_data = validated_data.pop('preferences')
        
        # Create the Patient object first
        patient = Patient.objects.create(**validated_data)
        
        # Now create the Preferences object with a reference to the created Patient
        preferences = Preferences.objects.create(patient=patient, **preferences_data)
        
        # Update the Patient object to include the Preferences
        patient.preferences = preferences
        patient.save()

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

class ExercisePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExercisePlan
        fields = ['exercise_id', 'value']

class TrainingSerializer(serializers.ModelSerializer):
    exercises_plans = ExercisePlanSerializer(many=True)
    patient_id = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all(), source='user')

    class Meta:
        model = Training
        fields = ['id', 'training_name', 'user_id', 'exercises_plans']

    def create(self, validated_data):
        exercises_plans_data = validated_data.pop('exercises_plans')
        training = Training.objects.create(**validated_data)
        for exercise_plan_data in exercises_plans_data:
            ExercisePlan.objects.create(training=training, **exercise_plan_data)
        return training

        
class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

