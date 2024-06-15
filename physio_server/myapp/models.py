from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# how the tables should look like
# After adding new models (tables) run both commands in terminal to apply to DB:
#   python3 manage.py makemigrations
#   python3 manage.py migrate

class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    user_id = models.CharField(max_length=10, unique=True)
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
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, null=True, blank=True)
    interested_in_notifications = models.BooleanField(default=True)
    interested_in_calendar_sync = models.BooleanField(default=True)
    
class Exercise(models.Model):
    Eid = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    videoUrl = models.CharField(max_length=100)
    approval = models.BooleanField(default=False)
    # imgUrl = models.FileField(upload_to='exercise_images/')
    # a foreign key relationship with the User model to store the user ID
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Training(models.Model):
    training_name = models.CharField(max_length=100)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.training_name

class ExercisePlan(models.Model):
    exercise_id = models.CharField(max_length=100)
    training = models.ForeignKey(Training, related_name='exercises_plan', on_delete=models.CASCADE)
    value = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.exercise_id} - {self.training.training_name}'
