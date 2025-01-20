# serializers.py
from rest_framework import serializers
from .models import DailyEntry, Persona

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ['id', 'name', 'description', 'image_url']

class DailyEntrySerializer(serializers.ModelSerializer):
    sleep_duration = serializers.FloatField(read_only=True)  # Automatically calculated
    
    class Meta:
        model = DailyEntry
        fields = [
            'id',
            'entry_date',
            'persona',
            'sleep_time',
            'wake_time',
            'sleep_duration',
            'goals_completed_percentage',
            'tasks_completed',
            'notes',
            'created_at'
        ]
        read_only_fields = ['created_at']

# views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import DailyEntry, Persona
from .serializers import DailyEntrySerializer, PersonaSerializer

class DailyEntryViewSet(viewsets.ModelViewSet):
    serializer_class = DailyEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only return entries for the current user"""
        return DailyEntry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Automatically set the user when creating an entry"""
        serializer.save(user=self.request.user)

class PersonaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
    permission_classes = [IsAuthenticated]

# urls.py (in your app folder)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DailyEntryViewSet, PersonaViewSet

router = DefaultRouter()
router.register(r'daily-entries', DailyEntryViewSet, basename='daily-entry')
router.register(r'personas', PersonaViewSet, basename='persona')

urlpatterns = [
    path('', include(router.urls)),
]