import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
//import { Router } from '@angular/core';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  
  offers: Place[]; // in place.service.ts file:const places = []; array data.
  isLoading = false;
 // router: any;
  private placesSub: Subscription;
  route: any;
  //route: any;
  //router: any;

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => { 
      //here in placesSub it stores the data from places
      this.offers = places;
    });
   }
 //ionViewWillEnter:Runs when the page is about to enter and become the active page.
 //
   ionViewWillEnter() {
     this.isLoading = true; //if load=true then
     this.placesService.fetchPlaces().subscribe(() => { //it goes to fetchPlaces() in places.service.ts
       this.isLoading = false;
     }
     );
   }
   onEdit(offerId: string, slidingItem: IonItemSliding) { //this is the edit function when user click on edit button it comes to onEdit function
  slidingItem.close();
  this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]); //it navigate to edit file and edit the file with respective offersId
  console.log('Editing item', offerId);
}
ngOnDestroy() { // it destroy the data which is stored in placesSub in ngOnInit()
  if (this.placesSub) {
    this.placesSub.unsubscribe(); //unsubcribe will stop sending the data
  }
}

}
