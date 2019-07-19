import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonsComponent } from 'src/persons/persons.component';
import { PersonInputComponent } from 'src/persons/person-input-component';
@NgModule({
 /** here we have define all components we want a use inside of this module each has to be define*/
  declarations: [
    AppComponent, PersonsComponent, PersonInputComponent
  ],
  imports: [
    BrowserModule, FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent] /**we can add multiple components here */
})
export class AppModule { }
