import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlacesService } from 'src/app/places/places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceResponse } from 'src/app/places/place-response.model';
import { PlaceUpdateRequest } from 'src/app/places/place-update-request.model';
import { Observable, Subscription } from 'rxjs';
import { GeoJsonPoint } from 'src/app/places/geoJsonPoint.model';
import {
  faLocationCrosshairs,
  faMapPin,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent implements OnInit, OnDestroy {
  faMapPin = faMapPin;
  faLocationCrossHair = faLocationCrosshairs;

  tripId?: string;
  formTitle: string = 'Place form';
  gettingCoordinates: boolean = false;
  stateMessage: string = '';

  private markerSetOnCurrentPositionSubscription?: Subscription;
  private errorSubscription?: Subscription;

  @Output() coordinatesAdded: EventEmitter<GeoJsonPoint>;
  @Output() setCoordinatesOnCurrentPositionEmitter: EventEmitter<void>;
  @Input() placeName?: string;
  @Input() placeDescription?: string;
  @Input() currentPlace?: PlaceResponse;
  // coordinates (lon, lat) by GeoJSON / leaflet (lat, lon) Lat:N Lon:E
  @Input() longitude?: number;
  @Input() latitude?: number;
  @Input() clickOnMapObservable?: Observable<GeoJsonPoint>;
  @Input() markerSetOnCurrentPositionObservable?: Observable<GeoJsonPoint>;
  @Input() errorObservable?: Observable<any>;
  private clickOnMapSubscription?: Subscription;
  picUrl?: string;
  errorMessage?: string;
  placeForm?: NgForm;
  placeId?: string;

  constructor(
    private placeService: PlacesService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.coordinatesAdded = new EventEmitter<GeoJsonPoint>();
    this.setCoordinatesOnCurrentPositionEmitter = new EventEmitter<void>();

    this.initTripId();
  }

  initTripId() {
    this.route.queryParams.subscribe((params) => {
      this.tripId = params['tripId'];
    });
  }

  // initalize the form if update mode
  ngOnInit() {
    this.markerSetOnCurrentPositionSubscription =
      this.markerSetOnCurrentPositionObservable?.subscribe({
        next: (geoJsonPoint) => {
          this.showStateMessage(
            'Coordinates currently set on current position',
            2000
          );
          this.setCoordinates(geoJsonPoint);
        },
        error: (error) => {
          this.showStateMessage('An error occured: ' + error.message);
        },
      });
    this.errorSubscription = this.errorObservable?.subscribe((error) => {
      this.showStateMessage('An error occured : ' + error.message);
    });
    if (this.currentPlace) {
      this.initForm();
    }
  }

  ngOnDestroy() {
    this.markerSetOnCurrentPositionSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }

  initForm() {
    if (this.currentPlace) {
      this.placeName = this.currentPlace.name;
      this.placeDescription = this.currentPlace.description;
    }
  }

  submit(form: NgForm) {
    if (this.placeName && this.placeDescription) {
      if (this.currentPlace) {
        this.updatePlace(form);
      } else {
        this.createPlace();
      }
    }
  }

  createPlace() {
    if (
      this.placeName &&
      this.placeDescription &&
      this.latitude &&
      this.longitude
    ) {
      this.showStateMessage('Updating place...');
      this.placeService
        .createPlace({
          name: this.placeName,
          description: this.placeDescription,
          location: {
            type: 'Point',
            coordinates: [this.longitude, this.latitude],
          },
          tripId: this.tripId,
          pictureUrl: this.picUrl,
        })
        .subscribe({
          next: (response) => {
            this.router.navigate(['tripDetail/' + response.tripId]);
          },
          error: (error) => {
            this.showStateMessage('');
            console.error('Error occurred while creating the place:', error);
            if (error.status === 422) {
              this.errorMessage =
                'Place name is already taken. Please choose a different name.' +
                error;
            } else {
              this.errorMessage =
                'An error occurred while creating the place. Please try again later.' +
                error;
            }
          },
        });
    }
  }

  updatePlace(form: NgForm) {
    if (
      this.placeName &&
      this.placeDescription &&
      this.latitude &&
      this.longitude
    ) {
      if (this.currentPlace) {
        this.showStateMessage('Updating place...');
        const updateRequest: PlaceUpdateRequest = {
          name: this.placeName,
          description: this.placeDescription,
          location: {
            type: 'Point',
            coordinates: [this.longitude, this.latitude],
          },
          tripId: this.currentPlace.tripId,
          pictureUrl: this.picUrl,
        };
        this.placeService
          .updatePlace(this.currentPlace.id, updateRequest)
          .subscribe({
            next: (response) => {
              this.router.navigate(['tripDetail/' + this.currentPlace?.tripId]);
            },
            error: (error) => {
              this.showStateMessage('');
              console.error('Error occurred while updating the place:', error);
              this.errorMessage =
                'An error occurred while updating the place. Please try again later.' +
                error;
            },
          });
      }
    }
  }

  getCoordinates() {
    if (!this.gettingCoordinates) {
      this.startGettingCoordinates();
    } else {
      this.stopGettingCoordinates();
    }
  }

  startGettingCoordinates() {
    try {
      var map = document.getElementsByClassName('leaflet-map')[0];
      map.classList.add('cursor-crosshair');
    } catch (err) {}
    this.gettingCoordinates = true;
    this.clickOnMapSubscription = this.clickOnMapObservable?.subscribe(
      (value) => {
        this.stopGettingCoordinates();
        this.setCoordinates(value);
        this.addMarkerOnClick(value);
      }
    );
    this.changeDetector.detectChanges();
  }

  stopGettingCoordinates() {
    try {
      var map = document.getElementsByClassName('leaflet-map')[0];
      map.classList.remove('cursor-crosshair');
    } catch (err) {}
    this.clickOnMapSubscription?.unsubscribe();
    this.gettingCoordinates = false;
    this.changeDetector.detectChanges();
  }

  setCoordinates(geoJsonPoint: GeoJsonPoint) {
    this.longitude = geoJsonPoint.coordinates[0];
    this.latitude = geoJsonPoint.coordinates[1];
    this.changeDetector.detectChanges();
  }

  setCoordinatesOnCurrentPosition() {
    this.showStateMessage('Setting coordinates on current position...');
    this.setCoordinatesOnCurrentPositionEmitter.emit();
  }

  showStateMessage(message: string, time?: number) {
    this.stateMessage = message;
    if (time) {
      setTimeout(() => {
        this.stateMessage = '';
      }, time);
    }
  }

  addMarkerOnClick(geoJsonPoint: GeoJsonPoint) {
    this.coordinatesAdded.emit(geoJsonPoint);
  }

  coordinatesChanged() {
    if (this.latitude && this.longitude) {
      var lat = this.latitude;
      var lng = this.longitude;
      this.addMarkerOnClick({ type: 'point', coordinates: [lng, lat] });
    }
  }
}
