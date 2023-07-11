import { Component, Input, OnInit } from '@angular/core';
import { TripService } from '../../trips/trip.service';
import { AuthService } from '../../auth/auth.service';
import { TripResponse } from '../../trips/trip-response.model';
import { PlacesService } from '../../places/places.service';
import { PlaceResponse } from '../../places/place-response.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trips-on-map-page',
  templateUrl: './trips-on-map-page.component.html',
  styleUrls: ['./trips-on-map-page.component.scss'],
})
export class TripsOnMapPageComponent {

  searchValuesSubject: Subject<string> = new Subject<string>();
  
  
  search(searchValues: string) {
    this.searchValuesSubject.next(searchValues);
  }
}
