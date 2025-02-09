import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://127.0.0.1:8000/api/journal-data/';  // Adjust the URL as necessary

  constructor(private http: HttpClient) {}

  getJournalEntries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  submitJournalEntry(entry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entry);
  }
}