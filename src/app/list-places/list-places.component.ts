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
import {
  faLocationCrosshairs,
  faPencil,
  faSquarePlus,
  faExpand,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
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
  faExpand = faExpand;
  faTrash = faTrash;

  @Input() places: PlaceResponse[] = [];
  @Input() currentTrip?: TripResponse;

  @Output() centerOnMapClicked: EventEmitter<GeoJsonPoint>;
  @Output() centerMapAroundPlaces: EventEmitter<PlaceResponse[]>;

  constructor(private placeService: PlacesService, private router: Router) {
    this.centerOnMapClicked = new EventEmitter();
    this.centerMapAroundPlaces = new EventEmitter();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTrip']) {
      this.getPlaces();
    }
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
    this.router.navigate(['newPlace'], {
      queryParams: { tripId: this.currentTrip?.id },
    });
  }

  updatePlace(placeId: string) {
    this.router.navigate(['placeDetail/' + placeId]);
  }

  centerOnMap(placeLocation: GeoJsonPoint) {
    this.centerOnMapClicked.emit(placeLocation);
  }

  centerAroundAllPlaces() {
    this.centerMapAroundPlaces.emit(this.places);
  }

  deletePlace(placeId: string) {
    var confirmDeletion = confirm('Are you sure you want to delete?');
    if (confirmDeletion) {
      if (placeId) {
        this.placeService.deletePlace(placeId).subscribe({
          next: () => {
            this.places = this.places.filter((place) => place.id !== placeId);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }
}
