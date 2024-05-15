# myapp/models.py
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Exercise(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    file = models.FileField(upload_to='uploads/')
    approval = models.BooleanField(default=False)
    # a foreign key relationship with the User model to store the user ID
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
