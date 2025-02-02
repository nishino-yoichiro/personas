# your_app_name/urls.py (app urls)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'daily-entries', views.DailyEntryViewSet, basename='daily-entry')
router.register(r'personas', views.PersonaViewSet, basename='persona')

urlpatterns = [
    path('', include(router.urls)),
    path('journal-data/', views.journal_data, name='journal-data'),
]