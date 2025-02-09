import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JournalService } from './journal.service';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class JournalComponent implements OnInit {
  journalForm: FormGroup;

  constructor(private fb: FormBuilder, private journalService: JournalService, private router: Router, private dataService: DataService) {
    this.journalForm = this.fb.group({
      entry_date: ['', Validators.required],
      persona: [null],  // Assuming persona is optional and referenced by ID
      sleep_time: ['', Validators.required],
      wake_time: ['', Validators.required],
      goals_completed_percentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      tasks_completed: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() { 
    if (this.journalForm.valid) {
      this.journalService.createJournalEntry(this.journalForm.value).subscribe(
        response => {
          console.log('Journal Entry saved:', response);
          this.router.navigate(['/home']);
          // Handle successful save, e.g., reset form or show a success message
        }, 
        error => {
          console.error('Error saving journal entry:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
  }
}