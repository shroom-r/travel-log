import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PlaceResponse } from '../places/place-response.model';
import { TripResponse } from '../trips/trip-response.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;

  searchValues: string = '';
  searchedPlaces: PlaceResponse[] = [];
  searchedTrips: TripResponse[] = [];

  @Output() searchTripsAndPlaces: EventEmitter<string>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.searchTripsAndPlaces = new EventEmitter();
  }

  ngOnInit(): void {
    this.emitSearchValues();
  }

  emitSearchValues() {
    this.route.queryParams.subscribe((params) => {
      this.searchValues = params['search'];
    });
    if (this.searchValues) {
      this.searchTripsAndPlaces.emit(this.searchValues);
    }
  }

  search() {
    this.router
      .navigate(['/tripsOnMap'], {
        queryParams: { search: this.searchValues },
      })
      .then(() => this.emitSearchValues());
  }
}
