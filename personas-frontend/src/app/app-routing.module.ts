import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { HomeComponent } from './home/home.component';
import { JournalComponent } from './journal/journal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';  // Import CarouselModule
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'data', component: DataComponent },
  { path: 'journal', component: JournalComponent },
  // Add other routes as necessary
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    CarouselModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    JournalComponent  // Import JournalComponent here
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }