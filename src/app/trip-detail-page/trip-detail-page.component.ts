import { Component } from '@angular/core';
import { CreateNewTripService } from '../trips/create-new-trip.service';
import { TripCreationRequest } from '../trips/trip-creation-request.model';

@Component({
  selector: 'app-trip-detail-page',
  templateUrl: './trip-detail-page.component.html',
  styleUrls: ['./trip-detail-page.component.scss'],
})
export class TripDetailPageComponent {
  
  constructor(private createTripService: CreateNewTripService) {
    
  }

  createNewTrip(trip : TripCreationRequest) {
    this.createTripService.createTrip(trip).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    })
  }
}
