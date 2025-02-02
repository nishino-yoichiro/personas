import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';  // Adjust the import path as necessary
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  imports: [CommonModule],
})
export class DataComponent implements OnInit {
  journalEntries: any[] = [];  // Add this property

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getJournalEntries().subscribe(data => {
        this.journalEntries = data;
        console.log(this.journalEntries);  // Log the data to the console
      }, error => {
        console.error('Error fetching journal entries:', error);
      }
    );
  }
}