import pandas as pd
from django.http import JsonResponse

from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Persona, DailyEntry
from .serializers import PersonaSerializer, DailyEntrySerializer

from django.views.decorators.csrf import csrf_exempt
import json
from .models import Persona, DailyEntry
from .bert import classify_persona

class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

class DailyEntryViewSet(viewsets.ModelViewSet):
    queryset = DailyEntry.objects.all()
    serializer_class = DailyEntrySerializer
    # permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
    # def create(self, request, *args, **kwargs):
    #     print("Received POST data:", request.data)  # Log the incoming request data
    #     serializer = self.get_serializer(data=request.data)
    #     try:
    #         serializer.is_valid(raise_exception=True)
    #     except ValidationError as e:
    #         print("Validation errors:", e.detail)  # Print validation errors
    #         return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

def journal_data(request):
    print("Request received for journal data.")
    csv_file_path = '../journal_entries.csv'
    df = pd.read_csv(csv_file_path)

    df = df.where(pd.notnull(df), None)

    data = df.to_dict(orient='records')
    return JsonResponse(data, safe=False)

@csrf_exempt
def classify_persona_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            journal_entry = data.get("entry", "")

            if not journal_entry:
                return JsonResponse({"error": "No journal entry provided"}, status=400)

            # Call the classify_persona function
            best_match = classify_persona(journal_entry)
            return JsonResponse({"persona": best_match})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

def most_recent_journal_entry(request):
    try:
        most_recent_entry = DailyEntry.objects.latest('created_at')
        serializer = DailyEntrySerializer(most_recent_entry)
        entry_string = json.dumps(serializer.data)
        return JsonResponse({"entry": entry_string})
    except DailyEntry.DoesNotExist:
        return JsonResponse({"error": "No journal entries found"}, status=404)