import { Component } from '@angular/core';
import { TripService } from '../trips/trip.service';
import { AuthService } from '../auth/auth.service';
import { TripResponse } from '../trips/trip-response.model';
import { PlacesService } from '../places/places.service';
import { PlaceResponse } from '../places/place-response.model';

type PlacesByTrip = {
  tripId?: string,
  places?: PlaceResponse[]
}

@Component({
  selector: 'app-trips-on-map-page',
  templateUrl: './trips-on-map-page.component.html',
  styleUrls: ['./trips-on-map-page.component.scss'],
})
export class TripsOnMapPageComponent {
  tripsList: TripResponse[] = [];
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
          this.getPlaces();
        });
      }
    });
  }

  getPlaces() {
    for (let trip of this.tripsList) {
      var tripId = trip.id;
      this.placesByTrip.push({tripId: tripId});
      this.placesService.getPlacesOfTrip(tripId).subscribe((places) => {
        for (let place of places) {
          var index = this.placesByTrip.map(trip => trip.tripId).indexOf(place.tripId);
          this.placesByTrip[index].places?.push(place);
        }
      });
    }
  }

}
