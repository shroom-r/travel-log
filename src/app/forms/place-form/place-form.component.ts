import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
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
import { FormMode } from '../form-mode.model';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent implements OnInit, OnChanges, OnDestroy {
  faMapPin = faMapPin;
  faLocationCrossHair = faLocationCrosshairs;

  tripId?: string;
  formTitle: string = 'Place form';
  gettingCoordinates: boolean = false;
  stateMessage: string = '';
  formMode?: FormMode;
  placeName?: string;
  placeDescription?: string;
  longitude?: number;
  latitude?: number;

  private markerSetOnCurrentPositionSubscription?: Subscription;
  private errorSubscription?: Subscription;

  @Output() coordinatesAdded: EventEmitter<GeoJsonPoint>;
  @Output() setCoordinatesOnCurrentPositionEmitter: EventEmitter<void>;
  @Input() currentPlace?: PlaceResponse;
  @Input() clickOnMapObservable?: Observable<GeoJsonPoint>;
  @Input() markerSetOnCurrentPositionObservable?: Observable<GeoJsonPoint>;
  @Input() errorObservable?: Observable<any>;
  @Input() loadingPlaceState?: string;
  private clickOnMapSubscription?: Subscription;
  picUrl?: string;
  errorMessage?: string;
  @ViewChild('placeForm') placeForm?: NgForm;
  placeId?: string;

  constructor(
    private placeService: PlacesService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.coordinatesAdded = new EventEmitter<GeoJsonPoint>();
    this.setCoordinatesOnCurrentPositionEmitter = new EventEmitter<void>();
    this.tripId = this.route.snapshot.queryParams['tripId'];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPlace']) {
      this.initForm();
      if (this.loadingPlaceState) {
        this.showStateMessage(this.loadingPlaceState);
      } else {
        this.showStateMessage('');
      }
    }
    this.changeDetector.detectChanges();
  }

  // initalize the form if update mode
  ngOnInit() {
    this.markerSetOnCurrentPositionSubscription =
      this.markerSetOnCurrentPositionObservable?.subscribe({
        next: (geoJsonPoint) => {
          this.showStateMessage(
            'Coordinates successfully set on current position',
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
    this.initForm();
  }

  ngOnDestroy() {
    this.markerSetOnCurrentPositionSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }

  initForm() {
    if (this.currentPlace) {
      this.initializeMode(FormMode.Modification);
      // this.placeName = this.currentPlace.name;
      // this.placeDescription = this.currentPlace.description;
    } else {
      this.initializeMode(FormMode.New);
    }
  }

  initializeMode(formMode: FormMode) {
    this.formMode = formMode;
    switch (formMode) {
      case FormMode.New:
        this.placeName = '';
        this.placeDescription = '';
        this.formTitle = 'Create a new place';
        // this.saveButtonText = 'Save';
        break;
      case FormMode.Modification:
        this.placeName = this.currentPlace?.name;
        this.placeDescription = this.currentPlace?.description;
        this.longitude = this.currentPlace?.location.coordinates[0];
        this.latitude = this.currentPlace?.location.coordinates[1];
        this.picUrl = this.currentPlace?.pictureUrl;
        this.formTitle = 'Place details';

        // EMIT VALUE TO CENTER MAP ON PLACE LOCATION AND ADD MARKER
        if (this.latitude && this.longitude) {
          this.coordinatesAdded.emit({
            type: 'Point',
            coordinates: [this.longitude, this.latitude],
          });
        }

        // this.saveButtonText = 'Save changes';
        break;
      default:
        break;
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
      this.placeForm?.controls['longitude'].setValue(
        geoJsonPoint.coordinates[0]
      );
      this.placeForm?.controls['latitude'].setValue(
        geoJsonPoint.coordinates[1]
      );
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
