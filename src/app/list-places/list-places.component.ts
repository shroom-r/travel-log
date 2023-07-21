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

  tripHasNoPlaces: boolean = false;
  userMessage: string = '';

  @Input() places: PlaceResponse[] = [];
  @Input() currentTrip?: TripResponse;

  @Output() centerOnMapClicked: EventEmitter<GeoJsonPoint>;
  @Output() centerMapAroundPlaces: EventEmitter<PlaceResponse[]>;
  @Output() placeDeleted: EventEmitter<void>;

  constructor(private placeService: PlacesService, private router: Router) {
    this.centerOnMapClicked = new EventEmitter();
    this.centerMapAroundPlaces = new EventEmitter();
    this.placeDeleted = new EventEmitter();
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
    this.showUserMessage('Loading places ...');
    this.places = [];
    if (this.currentTrip) {
      this.placeService
        .getPlacesOfTrip(this.currentTrip.id)
        .subscribe({
          next : (response) => {
            this.showUserMessage('');
            if (!response.length) {
              this.checkPlacesListLength();
            } else {
              response.forEach((place) => this.places?.push(place));
            }
          },
          error: (error) => {
            this.showUserMessage(`An error occured : ${error.message}`);
          }
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
    if (this.places.length) {
      this.centerMapAroundPlaces.emit(this.places);
    }
  }

  showUserMessage(message:string) {
    this.userMessage = message;
  }

  checkPlacesListLength() {
    if (this.places.length) {
      this.tripHasNoPlaces = false;
    } else {
      this.tripHasNoPlaces = true;
    }
  }

  deletePlace(placeId: string) {
    var confirmDeletion = confirm('Are you sure you want to delete?');
    if (confirmDeletion) {
      if (placeId) {
        this.placeService.deletePlace(placeId).subscribe({
          next: () => {
            this.places = this.places.filter((place) => place.id !== placeId);
            this.placeDeleted.emit();
            this.checkPlacesListLength();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }
}
