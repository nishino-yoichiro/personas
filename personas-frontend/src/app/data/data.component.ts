import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';  // Adjust the import path as necessary
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  imports: [CommonModule],
})
export class DataComponent implements OnInit {
  journalEntries: any[] = [];
  sortOrder: boolean = true;  // true for ascending, false for descending
  currentMetric: string = 'Event';  // Default sort metric

  constructor(private dataService: DataService, private location: Location) {}

  ngOnInit(): void {
    this.dataService.getJournalEntries().subscribe(data => {
        this.journalEntries = data;
        console.log(this.journalEntries);  // Log the data to the console
      }, error => {
        console.error('Error fetching journal entries:', error);
      }
    );
  }

  sortBy(eventOrMetric: Event | string): void {
    let metric: string;
    if (typeof eventOrMetric === 'string') {
      metric = eventOrMetric;
    } else {
      const target = eventOrMetric.target as HTMLSelectElement;
      metric = target.value;
    }

    if (this.currentMetric === metric) {
      this.sortOrder = !this.sortOrder;  // Toggle sort order if the same metric is clicked
    } else {
      this.currentMetric = metric;
      this.sortOrder = true;  // Default to ascending order for new metric
    }

    this.journalEntries.sort((a, b) => {
      const valueA = this.getMetricValue(a, metric);
      const valueB = this.getMetricValue(b, metric);
      return this.sortOrder ? valueA - valueB : valueB - valueA;
    });
  }

  getMetricValue(entry: any, metric: string): number {
    if (metric === 'To-do list completion rate') {
      return this.parseCompletionRate(entry[metric]);
    } else if (metric === 'Score') {
      return parseFloat(entry[metric]) || 0;
    } else if (metric === 'Sleep time' || metric === 'Wake time') {
      return this.parseTime(entry[metric]);
    }
    return entry[metric] ? entry[metric] : 0;
  }

  parseCompletionRate(rate: string): number {
    if (!rate) return 0;
    const [completed, total] = rate.split('/').map(Number);
    return completed / total;
  }

  parseTime(time: string): number { 
    if (!time) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;  // Convert time to minutes
  }

  goBack(): void {
    this.location.back();
  }
}