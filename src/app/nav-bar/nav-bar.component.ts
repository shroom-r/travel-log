import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TripResponse } from '../trips/trip-response.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {

 @Output() searchTripsAndPlaces : EventEmitter<string>;

 constructor() {
  this.searchTripsAndPlaces = new EventEmitter();
 }


  search(searchValues: string) {
    this.searchTripsAndPlaces.emit(searchValues);
  }
}
