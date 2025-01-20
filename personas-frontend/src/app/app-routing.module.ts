import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JournalComponent } from './journal/journal.component';
import { DataComponent } from './data/data.component'; // Import DataComponent

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'data', component: DataComponent }, // Add route for DataComponent
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }