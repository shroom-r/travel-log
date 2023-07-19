import { Component } from '@angular/core';
import { TripService } from '../../trips/trip.service';
import { TripResponse } from '../../trips/trip-response.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { PlacesService } from 'src/app/places/places.service';
import { PlaceResponse } from 'src/app/places/place-response.model';
import { GeoJsonPoint } from 'src/app/places/geoJsonPoint.model';

@Component({
  selector: 'app-trip-detail-page',
  templateUrl: './trip-detail-page.component.html',
  styleUrls: ['./trip-detail-page.component.scss'],
})
export class TripDetailPageComponent {
  routeTripId?: string | null;
  currentTrip?: TripResponse;
  places: PlaceResponse[] = [];
  selectedPlaceCoordinates?: GeoJsonPoint;
  selectPlaceToCenter: Subject<GeoJsonPoint> = new Subject<GeoJsonPoint>();
  centerMapAroundPlacesSubject: Subject<PlaceResponse[]> = new Subject<PlaceResponse[]>();
  loadingTripState?: string;

  constructor(
    private tripService: TripService,
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      this.routeTripId = params.get('tripId');
      this.getTrip();
      this.getPlaces();
    });
  }

  getTrip() {
    this.loadingTripState = 'Loading trip...';
    if (this.routeTripId) {
      this.tripService.getTripById(this.routeTripId).subscribe({
        next: (response) => {
          this.currentTrip = response;
          this.loadingTripState = '';
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
          }
        });
    }
  }

  centerPlaceOnMap(location: GeoJsonPoint) {
    this.selectPlaceToCenter.next(location);
  }

  centerMapAroundPlaces(places: PlaceResponse[]) {
    this.centerMapAroundPlacesSubject.next(places);
  }
}
