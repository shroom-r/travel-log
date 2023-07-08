import { Component } from '@angular/core';
import { TripService } from '../../trips/trip.service';
import { TripResponse } from '../../trips/trip-response.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { PlacesService } from 'src/app/places/places.service';
import { PlaceResponse } from 'src/app/places/place-response.model';

@Component({
  selector: 'app-trip-detail-page',
  templateUrl: './trip-detail-page.component.html',
  styleUrls: ['./trip-detail-page.component.scss'],
})
export class TripDetailPageComponent {
  routeTripId?: string | null;
  currentTrip?: TripResponse;
  places: PlaceResponse[] = [];

  constructor(
    private tripService: TripService,
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.pipe(tap(console.log)).subscribe((params) => {
      this.routeTripId = params.get('tripId');
      this.getTrip();
      this.getPlaces();
    });
  }

  getTrip() {
    if (this.routeTripId) {
      this.tripService.getTripById(this.routeTripId).subscribe({
        next: (response) => {
          console.log(response);
          this.currentTrip = response;
        },
        error: (err) => {
          alert(`Le trip ID ${this.routeTripId} n'existe pas.`);
          this.router.navigate(['tripDetail/']);
        },
      });
    }
  }

  getPlaces() {
    if (this.routeTripId) {
      this.placesService
        .getPlacesOfTrip(this.routeTripId)
        .subscribe((response) => {
          for (let place of response) {
            this.places.push(place);
            console.log(this.places);
          }
        });
    }
  }
}
