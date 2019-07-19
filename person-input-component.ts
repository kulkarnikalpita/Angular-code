import { Component, Input } from '@angular/core';

@Component ({
  selector: 'app-person-input',
  templateUrl: './person-input-component.html',
  styleUrls: ['./person-input-component.css']
})
export class PersonInputComponent {
enteredPersonName = '';
  onCreatePerson(personName: string) {
  console.log('person is created: ' + this.enteredPersonName);
  this.enteredPersonName = '';
}
}
