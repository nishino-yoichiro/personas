from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Persona(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    image_url = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class DailyEntry(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    entry_date = models.DateField()
    persona = models.ForeignKey(Persona, on_delete=models.SET_NULL, null=True)
    
    # Sleep-related fields
    sleep_time = models.TimeField(help_text="Time went to bed previous night")
    wake_time = models.TimeField(help_text="Time woke up")
    
    # Goals and tasks
    goals_completed_percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Percentage of daily goals completed"
    )
    
    # Store as JSON array of completed tasks
    tasks_completed = models.JSONField(
        default=list,
        help_text="List of tasks completed during the day"
    )
    
    # Optional notes field
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # unique_together = ['user', 'entry_date']
        ordering = ['-entry_date']  # Most recent entries first

    def __str__(self):
        return f"{self.user.username} - {self.entry_date}"
    
    @property
    def sleep_duration(self):
        """Calculate sleep duration in hours"""
        if self.sleep_time and self.wake_time:
            # Note: This is a simple calculation and might need adjustment 
            # for sleep times that cross midnight
            from datetime import datetime, timedelta
            sleep = datetime.combine(datetime.today(), self.sleep_time)
            wake = datetime.combine(datetime.today(), self.wake_time)
            if wake < sleep:  # Handle crossing midnight
                wake += timedelta(days=1)
            duration = wake - sleep
            return round(duration.total_seconds() / 3600, 2)  # Convert to hours
        return None