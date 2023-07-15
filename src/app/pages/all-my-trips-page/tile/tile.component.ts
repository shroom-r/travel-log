import { Component, OnInit } from '@angular/core';
import { TripResponse } from '../../../trips/trip-response.model';
import { PlaceResponse } from '../../../places/place-response.model';
import { TripService } from '../../../trips/trip.service';
import { AuthService } from '../../../auth/auth.service';
import { PlacesService } from '../../../places/places.service';
import { Router } from '@angular/router';
import { Geolocation } from '../../../../utils/geolocation';
import { forkJoin } from 'rxjs';


type PlacesByTrip = {
  trip?: TripResponse;
  places?: PlaceResponse[];
};

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  // construire une tuile qui sera utilisée pour présenter chaque trip
  // on doit afficher au minimum un titre et une description
  title: string;
  tripDescription: string;
  tripsList: TripResponse[] = [];
  placesList: PlaceResponse[] = [];
  placesByTrip: PlacesByTrip[] = [];

  loading: boolean = true;


  constructor(private tripService: TripService,
    private auth: AuthService,
    private placesService: PlacesService,
    private router: Router
  ) {
    this.title = 'titre Tuile';
    this.tripDescription = 'Description du trip';
    this.getTripsList();
  }

  ngOnInit(): void {
    //Geolocation.getCurrentPosition().then(console.log).catch(console.error);
  }

  seeDetail(tripId?: string) {
    this.router.navigate(["tripDetail/" + tripId]);
  }
  /* 
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
    } */
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
    const observables = this.tripsList.map((trip) =>
      this.placesService.getPlacesOfTrip(trip.id)
    );

    forkJoin(observables).subscribe((results) => {
      results.forEach((places, index) => {
        this.placesByTrip.push({ trip: this.tripsList[index], places });
      });
      this.loading = false;
    });
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

