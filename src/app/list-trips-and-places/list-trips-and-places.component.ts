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
  styleUrls: ['./list-trips-and-places.component.scss'],
})
export class ListTripsAndPlacesComponent {
  tripsList: TripResponse[] = [];
  placesList: PlaceResponse[] = [];
  placesByTrip: PlacesByTrip[] = [];

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
          this.mapTripsToPlacesByTrip();
          this.getPlaces();
        });
      }
    });
  }

  getPlaces() {
    for (let trip of this.tripsList) {
      var tripId = trip.id;
      this.placesService.getPlacesOfTrip(tripId).subscribe((places) => {
        this.mapPlacesToPlacesByTrip(places);
      });
    }
  }

  mapTripsToPlacesByTrip() {
    for (let trip of this.tripsList) {
      //push every trip to placesByTrip
      this.placesByTrip.push({ trip: trip });
    }
  }

  mapPlacesToPlacesByTrip(placesArray: PlaceResponse[]) {
    var tripId: string;
    var index: number;
    for (let place of placesArray) {
      //For each place in placesArray
      //Get trip id
      tripId = place.tripId;
      //get index of corresponding trip
      index = this.placesByTrip.map((el) => el.trip?.id).indexOf(tripId);
      //create array for places if it doesn't exist
      if (!this.placesByTrip[index].places) {
        this.placesByTrip[index].places = [];
      }
      //adds places to corresponding trip
      this.placesByTrip[index].places?.push(place);
    }
  }
}
