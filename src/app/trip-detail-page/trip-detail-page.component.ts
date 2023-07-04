import { Component } from '@angular/core';
import { TripService } from '../trips/trip.service';
import { TripCreationRequest } from '../trips/trip-creation-request.model';
import { AuthService } from '../auth/auth.service';
import { Observable, map } from 'rxjs';
import { TripResponse } from '../trips/trip-response.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-trip-detail-page',
  templateUrl: './trip-detail-page.component.html',
  styleUrls: ['./trip-detail-page.component.scss'],
})
export class TripDetailPageComponent {
  tripsList: TripResponse[] = [];
  activeTripId?: string | null;

  constructor(
    private tripService: TripService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.getTripsList();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.activeTripId = params.get('tripId');
      console.log(this.activeTripId);
    });
  }

  createNewTrip(trip: TripCreationRequest) {
    this.tripService.createTrip(trip).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  getTripsList() {
    this.auth.getUserId().subscribe((userId) => {
      if (userId) {
        this.tripService.getUserTrips(userId).subscribe((trips) => {
          this.tripsList = trips;
        });
      }
    });
  }
}
