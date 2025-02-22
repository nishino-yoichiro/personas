import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CarouselModule, CommonModule]
})
export class HomeComponent implements OnInit {
  personaName: string = '';
  personaDescription: string = '';
  personas: any[] = [
    { name: 'Isagi', description: 'strategic thinker, adaptive, team player', image: 'graphic_isagi_yoichi.webp' },
    { name: 'Bachira', description: 'creative, unpredictable, instinctive dribbler', image: 'bachira_webp' },
    { name: 'Nagi', description: 'lazy genius, effortless, high potential', image: 'nagi_webp' },
    { name: 'Barou', description: 'egoistic, dominant, powerful', image: 'barou.webp' },
    { name: 'Rin', description: 'calculated, technical, perfectionist', image: 'rin_webp' }
  ];

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  };

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