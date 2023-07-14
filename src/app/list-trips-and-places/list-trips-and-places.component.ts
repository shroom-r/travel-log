import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripResponse } from '../trips/trip-response.model';
import { PlaceResponse } from '../places/place-response.model';
import { TripService } from '../trips/trip.service';
import { PlacesService } from '../places/places.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {
  faLocationCrosshairs,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { GeoJsonPoint } from '../places/geoJsonPoint.model';

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
  faPencil = faPencil;
  faLocationCrossHair = faLocationCrosshairs;

  tripsList: TripResponse[] = [];
  placesList: PlaceResponse[] = [];
  placesByTrip: PlacesByTrip[] = [];
  currentUserId?: string;

  @Input() searchValuesObservable?: Observable<string>;
  @Output() newSearch: EventEmitter<void>;
  @Output() showPlaceOnMap: EventEmitter<PlaceResponse>;
  @Output() centerPlaceOnMap: EventEmitter<GeoJsonPoint>;
  @Output() centerMapAroundPlaces: EventEmitter<PlaceResponse[]>;

  currentlySearchedValues?: string;

  constructor(
    private tripService: TripService,
    private placesService: PlacesService,
    private auth: AuthService
  ) {
    this.showPlaceOnMap = new EventEmitter<PlaceResponse>;
    this.newSearch = new EventEmitter<void>;
    this.centerPlaceOnMap = new EventEmitter<GeoJsonPoint>;
    this.centerMapAroundPlaces = new EventEmitter<PlaceResponse[]>;
  }
  ngOnInit(): void {
    this.auth
      .getUserId()
      .subscribe((response) => (this.currentUserId = response));
    this.searchValuesObservable?.subscribe((response) => {
      this.getSearchedTripsAndPlaces(response);
      this.newSearch.emit();
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
          this.mapTrips();
        });
      this.placesService
        .searchPlaceBySearchValue(searchValues)
        .subscribe((response) => {
          for (let place of response) {
            this.placesList.push(place);
          }
          this.mapPlaces();
        });
    }
  }

  mapTrips() {
    if (this.tripsList.length) {
      do {
        var tripId = this.tripsList[0].id;
        //check if trip is owned by current user. If not, discard it
        if (this.tripsList[0].userId === this.currentUserId) {
          //check if trip exists (indexOf returns -1 if not add it)
          var index = this.placesByTrip.map((el) => el.trip?.id).indexOf(tripId);
          if (index < 0) {
            this.placesByTrip.push({ trip: this.tripsList[0] });
          }
          //Remove trip from tripsList
          var indexTripsList = this.tripsList.map((el) => el.id).indexOf(tripId);
          this.tripsList.splice(indexTripsList, 1);
        } else {
          //Remove trip from tripsList
          var indexTripsList = this.tripsList.map((el) => el.id).indexOf(tripId);
          this.tripsList.splice(indexTripsList, 1);
        }
      } while (this.tripsList.length);
    }
  }

  mapPlaces() {
    if (this.placesList.length) {
      do {
        var tripId = this.placesList[0].tripId;
        //check if trip exists in placesByTrip (indexOf returns -1 if not get from place response and add it to this.tripsList)
        var index = this.placesByTrip.map((el) => el.trip?.id).indexOf(tripId);
        if (index < 0) {
          //Check if trip exists in placeResponse and if its userId matches current user. If not, discard it
          if (
            this.placesList[0].trip &&
            this.placesList[0].trip.userId === this.currentUserId
          ) {
            this.tripsList.push(this.placesList[0].trip);
            this.mapTrips();
            this.mapPlaces();
          } else {
            //Remove current place from placesList if
            var indexPlacesList = this.placesList
              .map((el) => el.id)
              .indexOf(this.placesList[0].id);
            this.placesList.splice(indexPlacesList, 1);
          }
          break;
        } else {
          if (!this.placesByTrip[index].places) {
            this.placesByTrip[index].places = [];
          }
          //adds places to corresponding trip
          this.placesByTrip[index].places?.push(this.placesList[0]);
          this.showPlaceOnMap.emit(this.placesList[0]);
          //Remove place from placesList
          var indexPlacesList = this.placesList
            .map((el) => el.id)
            .indexOf(this.placesList[0].id);
          this.placesList.splice(indexPlacesList, 1);
        }
      } while (this.placesList.length);
    }
  }

  centerOnMap(placeLocation: GeoJsonPoint) {
    this.centerPlaceOnMap.emit(placeLocation);
  }

  updatePlace() {}

  centerAroundPlaces(places?: PlaceResponse[]) {
    this.centerMapAroundPlaces.emit(places);
  }

  centerSearchResults() {
    var placesArray:PlaceResponse[] = [];
    for (let trip of this.placesByTrip) {
      if (trip.places?.length) {
        placesArray = placesArray.concat(trip.places);
      }
    }
    this.centerAroundPlaces(placesArray);
  }

  updateTrip() {}
}
