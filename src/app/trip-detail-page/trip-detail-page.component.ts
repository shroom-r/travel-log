import { Component } from '@angular/core';
import { TripService } from '../trips/trip.service';
import { TripResponse } from '../trips/trip-response.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-trip-detail-page',
  templateUrl: './trip-detail-page.component.html',
  styleUrls: ['./trip-detail-page.component.scss'],
})
export class TripDetailPageComponent {
  routeTripId?: string | null;
  currentTrip?: TripResponse;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.routeTripId = params.get('tripId');
      this.getTrip();
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
          this.router.navigate(['tripDetail/'])
        },
      });
    }
  }

  tripCreated(trip: TripResponse) {
    this.currentTrip = trip;
    this.router.navigate(['tripDetail/' + this.currentTrip.id]);
  }
}