import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { PlacesService } from 'src/app/places/places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripResponse } from '../../trips/trip-response.model';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent {
  tripId?: string;
  placeName = '';
  placeDescription = '';
  picUrl?: string;
  errorMessage?: string;

  // @Input() tripId?: string;

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

  submit() {
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
            this.router.navigate(['placeDetail/' + response.id]);
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

  /*   deletePlace() {
      console.log("Delete Place");
      confirm("Are you sur to delete?");
    }
   */
}
