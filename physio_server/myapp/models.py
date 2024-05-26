from django.db import models

# how the tables should look like
# After adding new models (tables) run both commands in terminal to apply to DB:
#   python3 manage.py makemigrations
#   python3 manage.py migrate

class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=128)  # Consider using Django's built-in authentication system

    class Meta:
        abstract = True

class Therapist(User):
    license_id = models.CharField(max_length=50)
    is_professional = models.BooleanField(default=False)

class Patient(User):
    id_photo = models.ImageField(upload_to='id_photos/')
    injury = models.TextField()
    pain_scale = models.IntegerField()
    height = models.FloatField()
    weight = models.FloatField()

class ProfessionalDetails(models.Model):
    therapist = models.OneToOneField(Therapist, on_delete=models.CASCADE, related_name='professional_details')

class Preferences(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name='preferences')
    interested_in_notifications = models.BooleanField(default=True)
    interested_in_calendar_sync = models.BooleanField(default=True)
