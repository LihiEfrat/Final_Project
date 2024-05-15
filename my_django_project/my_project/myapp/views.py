# myapp/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Exercise
from .serializers import ExerciseSerializer

@api_view(['POST'])
def create_exercise(request):
    serializer = ExerciseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
