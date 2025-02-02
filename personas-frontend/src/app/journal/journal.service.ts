import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface JournalEntry {
  entry_date: string;
  persona: number | null;  // Assuming persona is referenced by ID
  sleep_time: string;
  wake_time: string;
  goals_completed_percentage: number;
  tasks_completed: string | null;
  notes: string | null;
  created_at: string;  // Use string for date-time representation
}

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = 'http://127.0.0.1:8000/api/daily-entries/';

  constructor(private http: HttpClient) {}

  createJournalEntry(entry: JournalEntry): Observable<JournalEntry> {
    console.log('Creating journal entry:', entry);
    return this.http.post<JournalEntry>(this.apiUrl, entry);
  }
  getJournalEntries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}