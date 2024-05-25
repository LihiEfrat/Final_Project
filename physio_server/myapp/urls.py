from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TherapistRegistrationView, TherapistViewSet, PatientViewSet, ProfessionalDetailsViewSet, PreferencesViewSet

router = DefaultRouter()
router.register(r'therapists', TherapistViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'professional_details', ProfessionalDetailsViewSet)
router.register(r'preferences', PreferencesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', TherapistRegistrationView.as_view(), name='therapist-register'),
]
