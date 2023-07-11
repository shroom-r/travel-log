import { Component, Input, OnInit } from '@angular/core';
import { TripResponse } from '../trips/trip-response.model';
import { PlaceResponse } from '../places/place-response.model';
import { TripService } from '../trips/trip.service';
import { AuthService } from '../auth/auth.service';
import { PlacesService } from '../places/places.service';
import { Observable } from 'rxjs';

type PlacesByTrip = {
  trip?: TripResponse;
  places?: PlaceResponse[];
};

@Component({
  selector: 'app-list-trips-and-places',
  templateUrl: './list-trips-and-places.component.html',
  styleUrls: ['./list-trips-and-places.component.scss'],
})
export class ListTripsAndPlacesComponent implements OnInit {
  tripsList: TripResponse[] = [];
  placesList: PlaceResponse[] = [];
  placesByTrip: PlacesByTrip[] = [];

  @Input() searchValues?: Observable<string>;

  constructor(
    private tripService: TripService,
    private auth: AuthService,
    private placesService: PlacesService
  ) {
    // this.getTripsList();
  }
  ngOnInit(): void {
    this.searchValues?.subscribe((response) => {
      this.getSearchedTripsAndPlaces(response);
    });
  }

  getSearchedTripsAndPlaces(searchValues: string) {
    this.tripService
      .searchTripBySearchValue(searchValues)
      .subscribe((response) => {
        // for (let trip of response) {
        //   this.tripsList.push(trip);
        // }
        this.mapTripsToPlacesByTrip(response);
      });
    this.placesService
      .searchPlaceBySearchValue(searchValues)
      .subscribe((response) => {
        for (let place of response) {
          this.placesList.push(place);
        }
      });
  }

  getTripsList() {
    // this.auth.getUserId().subscribe((userId) => {
    //   if (userId) {
    //     this.tripService.getUserTrips(userId).subscribe((trips) => {
    //       this.tripsList = trips;
    //       this.mapTripsToPlacesByTrip();
    //       this.getPlaces();
    //     });
    //   }
    // });
  }

  getPlaces() {
    // for (let trip of this.tripsList) {
    //   var tripId = trip.id;
    //   this.placesService.getPlacesOfTrip(tripId).subscribe((places) => {
    //     this.mapPlacesToPlacesByTrip(places);
    //   });
    // }
  }

  mapTripsToPlacesByTrip(trips: TripResponse[]) {
    console.log(trips);
    for (let trip of trips) {
      //Check if trip exists
      var tripAlreadyExists = false;
      for (let i = 0; i < this.placesByTrip.length; i++) {
        if (this.placesByTrip[i].trip?.id === trip.id) {
          tripAlreadyExists = true;
          break;
        }
      }
      if (!tripAlreadyExists) {
        this.placesByTrip.push({ trip: trip });
      }
    }
    console.log(this.placesByTrip);
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
