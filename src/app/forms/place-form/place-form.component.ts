import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlacesService } from 'src/app/places/places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceResponse } from 'src/app/places/place-response.model';
import { PlaceUpdateRequest } from 'src/app/places/place-update-request.model';
import { Observable, Subscription } from 'rxjs';
import { GeoJsonPoint } from 'src/app/places/geoJsonPoint.model';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent {
  faTrash = faMapPin;

  tripId?: string;
  formTitle: string = 'Place form';
  gettingCoordinates: boolean = false;
  stateMessage: string = '';
  @Input() placeName?: string;
  @Input() placeDescription?: string;
  @Input() currentPlace?: PlaceResponse;
  // coordinates (lon, lat) by GeoJSON / leaflet (lat, lon) Lat:N Lon:E
  @Input() longitude?: number;
  @Input() latitude?: number;
  @Input() clickOnMapObservable?: Observable<GeoJsonPoint>;
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
    this.initTripId();
  }

  initTripId() {
    this.route.queryParams.subscribe((params) => {
      this.tripId = params['tripId'];
    });
  }

  // initalize the form if update mode
  ngOnInit() {
    if (this.currentPlace) {
      this.initForm();
    }
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
    this.gettingCoordinates = !this.gettingCoordinates;
    this.clickOnMapSubscription = this.clickOnMapObservable?.subscribe(
      (value) => {
        this.clickOnMapSubscription?.unsubscribe();
        this.gettingCoordinates = !this.gettingCoordinates;
        this.longitude = value.coordinates[0];
        this.latitude = value.coordinates[1];
        this.changeDetector.detectChanges();
      }
    );
  }

  showStateMessage(message: string, time?: number) {
    this.stateMessage = message;
    if (time) {
      setTimeout(() => {
        this.stateMessage = '';
      }, time);
    }
  }
}
