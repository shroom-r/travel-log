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
import { Geolocation } from '../../utils/geolocation';
import { faLocationCrosshairs, faPencil, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { GeoJsonPoint } from '../places/geoJsonPoint.model';

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

  constructor(private placeService: PlacesService) {
    this.centerOnMapClicked = new EventEmitter();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getPlaces();
  }
  ngOnInit(): void {
    this.getPlaces();
    Geolocation.getCurrentPosition().then(console.log).catch(console.error);
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

  addPlace(): void {
    console.log("click");
  }

  modifyPlace() {}

  centerOnMap(placeLocation: GeoJsonPoint) {
    this.centerOnMapClicked.emit(placeLocation);
  }
}
