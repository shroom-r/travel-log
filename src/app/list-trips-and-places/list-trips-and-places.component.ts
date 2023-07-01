import { Component } from '@angular/core';
import { TripResponse } from '../trips/trip-response.model';
import { PlaceResponse } from '../places/place-response.model';
import { TripService } from '../trips/trip.service';
import { AuthService } from '../auth/auth.service';
import { PlacesService } from '../places/places.service';

type PlacesByTrip = {
  trip?: TripResponse;
  places?: PlaceResponse[];
};

@Component({
  selector: 'app-list-trips-and-places',
  templateUrl: './list-trips-and-places.component.html',
  styleUrls: ['./list-trips-and-places.component.scss']
})
export class ListTripsAndPlacesComponent {
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
      if (!this.placesByTrip.map(el => el.trip?.id).includes(tripId)) {
        //Get trip from trips array
        var indexOfTrip = this.tripsList.map(el => el.id).indexOf(tripId);
        var trip = this.tripsList[indexOfTrip];
        this.placesByTrip.push({trip: trip});
      }
      //get index of corresponding trip
      index = this.placesByTrip.map(el => el.trip?.id).indexOf(tripId);
      //create array for places if it doesn't exist
      if (!this.placesByTrip[index].places) {
        this.placesByTrip[index].places = [];
      }
      //adds places to corresponding trip
      this.placesByTrip[index].places?.push(place);
    }
  }
}
