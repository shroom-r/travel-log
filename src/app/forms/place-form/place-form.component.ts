import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { PlacesService } from 'src/app/places/places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripResponse } from '../../trips/trip-response.model';
import { PlaceResponse } from 'src/app/places/place-response.model';
import { PlaceUpdateRequest } from 'src/app/places/place-update-request.model';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent {
  tripId?: string;
  @Input() placeName = '';
  @Input() placeDescription = '';
  @Input() currentPlace?: PlaceResponse;
  longitude?: number;
  latitude?: number;
  picUrl?: string;
  errorMessage?: string;
  placeForm?: NgForm;
  placeId?: string;

  constructor(
    private placeService: PlacesService,
    private router: Router,
    private route: ActivatedRoute
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
      };
    } else {
      this.createPlace();
    }
  }


  createPlace() {
    if (this.placeName && this.placeDescription) {
      console.log('It is functioning weri vell');
      this.placeService
        .createPlace({
          name: this.placeName,
          description: this.placeDescription,
          location: { type: 'Point', coordinates: [-71.218, 46.801] },
          tripId: this.tripId,
          pictureUrl: this.picUrl,
        })
        .subscribe({
          next: (response) => {
            this.router.navigate(['tripDetail/' + response.tripId]);
          },
          error: (error) => {
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
    if (this.placeId && this.placeName && this.placeDescription) {
      const updateRequest: PlaceUpdateRequest = {
        name: this.placeName,
        description: this.placeDescription,
        location: { type: 'Point', coordinates: [6.66, 6.66] },
        tripId: this.tripId,
        pictureUrl: this.picUrl,
      };
      this.placeService
        .updatePlace(this.placeId)
/*         .subscribe({
          next: (response) => {
            this.router.navigate(['placeDetail/' + response.id]);
          },
          error: (error) => {
            console.error('Error occurred while updating the place:', error);
            this.errorMessage =
              'An error occurred while updating the place. Please try again later.' +
              error;
          },
        }); */
    }
  }
}
