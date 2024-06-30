from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TherapistRegistrationView, PatientRegistrationView, CustomLoginView, TherapistViewSet, PatientViewSet, ProfessionalDetailsViewSet, PreferencesViewSet,TrainingViewSet,TrainingView,ExerciseViewSet,ExercisePlanView,ExercisePlanViewSet, upload_video_view,get_patient_summary,get_patient_id



# urls to django APIs
router = DefaultRouter()
router.register(r'therapists', TherapistViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'professional_details', ProfessionalDetailsViewSet)
router.register(r'preferences', PreferencesViewSet)
router.register(r'training',TrainingViewSet)
router.register(r'exercise_plan',ExercisePlanViewSet)
# router.register(r'exercises', ExerciseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/therapist/', TherapistRegistrationView.as_view(), name='therapist-register'),
    path('register/patient/', PatientRegistrationView.as_view(), name='patient-register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('register/training/',TrainingView.as_view(),name='training'),
    path('register/exercise_plan/',ExercisePlanView.as_view(),name='exercise_plan'),
    path('create-exercise/', ExerciseViewSet.as_view({'post': 'create'}),name='create_exercise'),
    path('upload/', upload_video_view, name='upload_video'),
    path('exercise/getAll/', ExerciseViewSet.as_view({'get': 'list'}), name='get-all-exercise'),
    path('exerciseplan/getAll/', ExercisePlanViewSet.as_view({'get': 'list'}), name='get-all-exerciseplans'),
    path('training/getAll/', TrainingViewSet.as_view({'get': 'list'}), name='get-all-training'),
    path('patient-summary/<int:patient_id>/', get_patient_summary, name='patient-summary'),
    path('patient/get-id/', get_patient_id, name='get-patient-id'),




]
