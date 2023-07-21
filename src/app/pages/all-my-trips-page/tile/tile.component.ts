import { Component} from '@angular/core';
import { TripResponse } from '../../../trips/trip-response.model';
import { PlaceResponse } from '../../../places/place-response.model';
import { TripService } from '../../../trips/trip.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  // construire une tuile qui sera utilisée pour présenter chaque trip
  // on doit afficher au minimum un titre et une description
  userHasNoTrips: boolean = false;
  userMessage: string = '';
  title: string;
  tripDescription: string;
  tripsList: TripResponse[] = [];
  placesList: PlaceResponse[] = [];

  loading: boolean = true;

  constructor(
    private tripService: TripService,
    private auth: AuthService,
    private router: Router
  ) {
    this.title = 'titre Tuile';
    this.tripDescription = 'Description du trip';
    this.getTripsList();
  }

  seeDetail(tripId?: string) {
    this.router.navigate(['tripDetail/' + tripId]);
  }
  
  getTripsList() {
    this.showUserMessage('Getting trips...');
    this.auth.getUserId().subscribe((userId) => {
      if (userId) {
        this.tripService.getUserTrips(userId).subscribe({
          next: (trips) => {
            this.showUserMessage('');
            this.tripsList = trips;
            if (!trips.length) {
              this.userHasNoTrips = true;
            }
          },
          error: (error) => {
            this.showUserMessage(`An error occured: ${error.message}`);
          },
        });
      }
    });
  }

  navigateToNewTrip() {
    this.router.navigate(['newTrip']);
  }

  showUserMessage(message: string) {
    this.userMessage = message;
  }
}
