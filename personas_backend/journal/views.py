from django.shortcuts import render

from rest_framework import viewsets
from .models import Persona, DailyEntry
from .serializers import PersonaSerializer, DailyEntrySerializer

class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

class DailyEntryViewSet(viewsets.ModelViewSet):
    queryset = DailyEntry.objects.all()
    serializer_class = DailyEntrySerializer