import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  journalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.journalForm = this.fb.group({
      sleepTime: ['', Validators.required],
      wakeUpTime: ['', Validators.required],
      toDoList: ['', Validators.required],
      percentAccomplished: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      ambitionLevel: [5, [Validators.required, Validators.min(0), Validators.max(10)]],
      notableEvent: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.journalForm.valid) {
      console.log('Journal Entry:', this.journalForm.value);
      // Add logic to save the journal entry, e.g., send it to a backend API
    }
  }
}