import { Component } from '@angular/core';
import { TripResponse } from '../../../trips/trip-response.model';
import { PlaceResponse } from '../../../places/place-response.model';
import { TripService } from '../../../trips/trip.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/places/places.service';

type tripWithImages = {
  trip: TripResponse;
  imagesUrl: string[];
};

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
  tripsWithImages: tripWithImages[] = [];

  loading: boolean = true;

  constructor(
    private tripService: TripService,
    private placesService: PlacesService,
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
            } else {
              for (let trip of trips) {
                this.tripsWithImages.push({trip: trip, imagesUrl:[]});
                this.getImagesByTrip(trip.id);
              }
            }
          },
          error: (error) => {
            this.showUserMessage(`An error occured: ${error.message}`);
          },
        });
      }
    });
  }

  getImagesByTrip(tripId: string) {
    // this.imagesByTrips.push({ tripId: tripId, imagesUrl: [] });
    this.placesService.getPlacesOfTrip(tripId).subscribe((response) => {
      let index = Object.values(
        this.tripsWithImages.map((el) => el.trip.id)
      ).indexOf(tripId);
      for (let place of response) {
        if (place.pictureUrl) {
          this.tripsWithImages[index].imagesUrl.push(place.pictureUrl);
        }
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
