# myapp/admin.py
from django.contrib import admin
from .models import Exercise

# Register your models here.

# This will make your Exercise model visible in the Django admin interface.
admin.site.register(Exercise)