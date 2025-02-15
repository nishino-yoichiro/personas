import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  personaName: string = '';
  personaDescription: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getMostRecentJournalEntry();
  }

  getMostRecentJournalEntry(): void {
    this.http.get<{ entry: string }>('http://127.0.0.1:8000/api/most-recent-journal-entry/').subscribe(
      response => {
        const journalEntry = response.entry;
        this.getPersonaOfTheDay(journalEntry);
      },
      error => {
        console.error('Error fetching most recent journal entry', error);
      }
    );
  }

  getPersonaOfTheDay(journalEntry: string): void {
    this.http.post<{ persona: string }>('http://127.0.0.1:8000/api/classify-persona/', { entry: journalEntry }).subscribe(
      response => {
        this.personaName = response.persona;
        this.personaDescription = this.getPersonaDescription(response.persona);
      },
      error => {
        console.error('Error fetching persona of the day', error);
      }
    );
  }

  getPersonaDescription(persona: string): string {
    const descriptions: { [key: string]: string } = {
      "Isagi": "strategic thinker, adaptive, team player",
      "Bachira": "creative, unpredictable, instinctive dribbler",
      "Nagi": "lazy genius, effortless, high potential",
      "Barou": "egoistic, dominant, powerful",
      "Rin": "calculated, technical, perfectionist"
    };
    return descriptions[persona] || 'Description not available';
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}