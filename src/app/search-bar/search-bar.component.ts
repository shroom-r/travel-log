import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { TripService } from '../trips/trip.service';
import { PlacesService } from '../places/places.service';
import { PlaceResponse } from '../places/place-response.model';
import { TripResponse } from '../trips/trip-response.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  faMagnifyingGlass = faMagnifyingGlass;

  searchValues: string = '';
  searchedPlaces: PlaceResponse[] = [];
  searchedTrips: TripResponse[] = [];

  @Output() searchTripsAndPlaces: EventEmitter<string>;

  // gotTripsFromApi: Subject<TripResponse[]> = new Subject<TripResponse[]>();
  // gotPlacesFromApi: Subject<PlaceResponse[]> = new Subject<PlaceResponse[]>();

  constructor(
    private tripService: TripService,
    private placeService: PlacesService,
    private router: Router,
  ) {
    this.searchTripsAndPlaces = new EventEmitter();
  }

  search() {
    this.router.navigate(['/tripsOnMap']);
    this.searchTripsAndPlaces.emit(this.searchValues);
    // this.tripService.searchTripBySearchValue(this.searchValues).subscribe((response) => {
    //   // this.gotTripsFromApi.next(response);
    //   console.log(response);
    // });
    // this.placeService.searchPlaceBySearchValue(this.searchValues).subscribe((response) => {
    //   // this.gotPlacesFromApi.next(response);
    //   console.log(response);
    // })
    // console.log(this.searchValues);
  }
}
