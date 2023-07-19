import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PlaceResponse } from '../places/place-response.model';
import { TripResponse } from '../trips/trip-response.model';
import { PlacesService } from '../places/places.service';
import { faLocationCrosshairs, faPencil, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { GeoJsonPoint } from '../places/geoJsonPoint.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.scss'],
})
export class ListPlacesComponent implements OnInit, OnChanges {
  faPencil = faPencil;
  faSquarePlus = faSquarePlus;
  faLocationCrossHair = faLocationCrosshairs;

  @Input() places: PlaceResponse[] = [];
  @Input() currentTrip?: TripResponse;

  @Output() centerOnMapClicked: EventEmitter<GeoJsonPoint>;

  constructor(private placeService: PlacesService, private router: Router) {
    this.centerOnMapClicked = new EventEmitter();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getPlaces();
  }
  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces() {
    this.places = [];
    if (this.currentTrip) {
      this.placeService
        .getPlacesOfTrip(this.currentTrip.id)
        .subscribe((response) => {
          response.forEach((place) => this.places?.push(place));
        });
    }
  }

  newPlace(): void {
    console.log("click, new place on liste-places");
    this.router.navigate(['/newPlace'], {queryParams: {tripId: this.currentTrip?.id}});
  }

  updatePlace() {
    console.log("updateplace on list-places");
  }

  centerOnMap(placeLocation: GeoJsonPoint) {
    this.centerOnMapClicked.emit(placeLocation);
  }
}
