import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;
  constructor(private placesService: PlacesService, private router: Router, private loadingCtrl: LoadingController, ) { }

  ngOnInit() { //
    this.form = new FormGroup({ 
      //it validate and value the state of the formGroup and it collects all the formControl data validators will validate the data i.e to enter all the data and with some condition
      title: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
// i dint understood the difference between blur and change
      })
    });
  }
onCreateOffer() {
   if (!this.form.valid) { //
    return;
   }
   this.loadingCtrl
   .create({           //create is a method to pass all loading options when we enter all data then and enter the checkmark then it displays the load with message
    //spinner: 'dots',
  //spinner: 'Please wait...', //error
     message: 'Creating place...'
     //spinner: 'dots',
    //content: 'Loading Please Wait...'
    
   })
   .then(loadingEl => { // loadingEl is an arrow function which is the main mechanism to add a place and .then
     loadingEl.present();
     this.placesService
     .addPlace(
       this.form.value.title,
       this.form.value.description,
       +this.form.value.price,
       new Date(this.form.value.dateFrom),
       new Date(this.form.value.dateTo)
   )
   .subscribe(() => { //subscribe() to recieve continuous data
     loadingEl.dismiss(); //it is to stop the loadingEl method
     this.form.reset(); //this form will reset and navigate to offers page
     this.router.navigate(['/places/tabs/offers']); 
   });
 })
  }
}
