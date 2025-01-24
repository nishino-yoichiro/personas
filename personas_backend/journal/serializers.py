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