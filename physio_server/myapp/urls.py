from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TherapistRegistrationView, PatientRegistrationView, CustomLoginView, TherapistViewSet, PatientViewSet, ProfessionalDetailsViewSet, PreferencesViewSet, ExerciseViewSet, upload_video_view

# urls to django APIs
router = DefaultRouter()
router.register(r'therapists', TherapistViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'professional_details', ProfessionalDetailsViewSet)
router.register(r'preferences', PreferencesViewSet)
router.register(r'exercises', ExerciseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/therapist/', TherapistRegistrationView.as_view(), name='therapist-register'),
    path('register/patient/', PatientRegistrationView.as_view(), name='patient-register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('create-exercise/', ExerciseViewSet.as_view({'post': 'create'}),name='create_exercise'),
    path('upload/', upload_video_view, name='upload_video'),
]
