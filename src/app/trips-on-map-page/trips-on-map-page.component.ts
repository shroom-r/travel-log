import { Component } from '@angular/core';
import { TripService } from '../trips/trip.service';
import { AuthService } from '../auth/auth.service';
import { TripResponse } from '../trips/trip-response.model';
import { PlacesService } from '../places/places.service';
import { PlaceResponse } from '../places/place-response.model';

type PlacesByTrip = {
  tripId?: string;
  places?: PlaceResponse[];
};

@Component({
  selector: 'app-trips-on-map-page',
  templateUrl: './trips-on-map-page.component.html',
  styleUrls: ['./trips-on-map-page.component.scss'],
})
export class TripsOnMapPageComponent {
  tripsList: TripResponse[] = [];
  placesByTrip: PlacesByTrip[] = [];
  placesList: PlaceResponse[] = [];

  constructor(
    private tripService: TripService,
    private auth: AuthService,
    private placesService: PlacesService
  ) {
    this.getTripsList();
  }

  getTripsList() {
    this.auth.getUserId().subscribe((userId) => {
      if (userId) {
        this.tripService.getUserTrips(userId).subscribe((trips) => {
          this.tripsList = trips;
          this.getPlaces();
        });
      }
    });
  }

  getPlaces() {
    for (let trip of this.tripsList) {
      var tripId = trip.id;
      this.placesService
        .getPlacesOfTrip(tripId)
        .subscribe((places) => {
          this.mapPlacesToplacesByTrip(places);
        });
    }
  }

  mapPlacesToplacesByTrip(placesArray: PlaceResponse[]) {
    var tripId : string;
    var index: number;
    for (let place of placesArray) {
      //For each place in placesArray
      //Get trip id 
      tripId = place.tripId;
      //If tripId doesn't exist in placesByTrip, create it
      if (!this.placesByTrip.map(el => el.tripId).includes(tripId)) {
        this.placesByTrip.push({tripId: tripId});
      }
      //get index of corresponding trip
      index = this.placesByTrip.map(el => el.tripId).indexOf(tripId);
      //create array for places if it doesn't exist
      if (!this.placesByTrip[index].places) {
        this.placesByTrip[index].places = [];
      }
      //adds places to corresponding trip
      this.placesByTrip[index].places?.push(place);
    }
    console.log(this.placesByTrip);
  }
}
