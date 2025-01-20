import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JournalComponent } from './journal/journal.component';
import { DataComponent } from './data/data.component'; // Import DataComponent
import { ReactiveFormsModule } from '@angular/forms'; // Ensure ReactiveFormsModule is imported

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JournalComponent,
    DataComponent // Declare DataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule // Ensure ReactiveFormsModule is included in imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }