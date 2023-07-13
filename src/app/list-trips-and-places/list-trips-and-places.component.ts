import { Component, Input, OnInit } from '@angular/core';
import { TripResponse } from '../trips/trip-response.model';
import { PlaceResponse } from '../places/place-response.model';
import { TripService } from '../trips/trip.service';
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

  @Input() searchValuesObservable?: Observable<string>;

  currentlySearchedValues?: string;

  constructor(
    private tripService: TripService,
    private placesService: PlacesService
  ) {
    // this.getTripsList();
  }
  ngOnInit(): void {
    this.searchValuesObservable?.subscribe((response) => {
      this.getSearchedTripsAndPlaces(response);
    });
  }

  getSearchedTripsAndPlaces(searchValues: string) {
    //If the new searchValues is different thant the one stored, it means it's a new search so we can clear the array containing service responses
    if (searchValues !== this.currentlySearchedValues) {
      this.tripsList = [];
      this.placesList = [];
      this.placesByTrip = [];
      this.currentlySearchedValues = searchValues;
      this.tripService
        .searchTripBySearchValue(searchValues)
        .subscribe((response) => {
          for (let trip of response) {
            this.tripsList.push(trip);
          }
          console.log(this.tripsList);
          this.mapTrips();
          // this.mapTripsToPlacesByTrip(response);
        });
      this.placesService
        .searchPlaceBySearchValue(searchValues)
        .subscribe((response) => {
          for (let place of response) {
            this.placesList.push(place);
          }
          console.log(this.placesList);
          this.mapPlaces();
          // this.mapPlacesToPlacesByTrip(response);
        });
    }
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

  mapTrips() {
    debugger;
    do {
      var tripId = this.tripsList[0].id;
      //check if trip exists (indexOf returns -1 if not add it)
      var index = this.placesByTrip.map((el) => el.trip?.id).indexOf(tripId);
      if (index < 0) {
        this.placesByTrip.push({ trip: this.tripsList[0] });
      }
      //Remove trip from tripsList
      var indexTripsList = this.tripsList.map((el) => el.id).indexOf(tripId);
      this.tripsList.splice(indexTripsList, 1);
    } while (this.tripsList.length);
  }

  mapPlaces() {
    debugger;
    do {
      var tripId = this.placesList[0].tripId;
      //check if trip exists (indexOf returns -1 if not get it from API, add it and start mapPlaces again)
      var index = this.placesByTrip.map((el) => el.trip?.id).indexOf(tripId);
      if (index < 0) {
        this.tripService.getTripById(tripId).subscribe((response) => {
          this.tripsList.push(response);
          this.mapTrips();
          this.mapPlaces();
        });
        break;
      } else {
        if (!this.placesByTrip[index].places) {
          this.placesByTrip[index].places = [];
        }
        //adds places to corresponding trip
        this.placesByTrip[index].places?.push(this.placesList[0]);
        //Remove place from placesList
        var indexPlacesList = this.placesList
          .map((el) => el.id)
          .indexOf(this.placesList[0].id);
        this.placesList.splice(indexPlacesList, 1);
      }
    } while (this.placesList.length);
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

      //get index of corresponding trip. If index < 0 (means trip doesn't exist) we get it from API
      index = this.placesByTrip.map((el) => el.trip?.id).indexOf(tripId);
      //create array for places if it doesn't exist
      if (index < 0) {
        this.tripService.getTripById(tripId).subscribe((response) => {
          this.mapTripsToPlacesByTrip([response]);
          this.mapPlacesToPlacesByTrip([place]);
        });
      } else {
        if (!this.placesByTrip[index].places) {
          this.placesByTrip[index].places = [];
        }
        //adds places to corresponding trip
        this.placesByTrip[index].places?.push(place);
      }
    }
  }
}
