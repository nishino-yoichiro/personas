import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { HomeComponent } from './home/home.component';
import { JournalComponent } from './journal/journal.component';
import { ReactiveFormsModule } from '@angular/forms';
// Import other components as necessary

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'data', component: DataComponent },
  { path: 'journal', component: JournalComponent },
  // Add other routes as necessary
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }