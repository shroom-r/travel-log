import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlacesService } from 'src/app/places/places.service';
import { PlaceResponse } from 'src/app/places/place-response.model';
import { ErrorMessageComponent } from 'src/app/utils/error-message/error-message.component';
import { GeoJsonPoint } from 'src/app/places/geoJsonPoint.model';

@Component({
  selector: 'app-place-detail-page',
  templateUrl: './place-detail-page.component.html',
  styleUrls: ['./place-detail-page.component.scss'],
})
export class PlaceDetailPageComponent implements OnDestroy {
  currentPlace?: PlaceResponse;
  placeId?: string | null;
  errorMessage?: string;
  private destroy$ = new Subject<void>();
  latitude?: number;
  longitude?: number;
  loadingPlaceState?: string;

  clickOnMapSubject: Subject<GeoJsonPoint> = new Subject<GeoJsonPoint>();
  addMarkerSubject: Subject<GeoJsonPoint> = new Subject<GeoJsonPoint>();
  setCoorindatesOnCurrentPositionSubject: Subject<void> = new Subject<void>();
  markerSetOnCurrentPositionSubject: Subject<GeoJsonPoint> =
    new Subject<GeoJsonPoint>();
  errorSubject: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private placeService: PlacesService
  ) {}

  ngOnInit() {
    this.placeId = this.route.snapshot.paramMap.get('placeId');
    if (this.placeId) {
      this.loadingPlaceState = 'Loading place...';
      this.placeService
        .getPlace(this.placeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.loadingPlaceState = '';
            this.currentPlace = response;
            this.longitude = response.location.coordinates[0];
            this.latitude = response.location.coordinates[1];
          },
          error: (error) => {
            alert(
              `Place ${this.placeId} can not be fetched. You will be redirected.`
            );
            this.errorMessage =
              'Error fetching place details. Please try again later.';
            console.error('Error fetching place:', error);
            this.router.navigate(['allMyTrips']);
          },
        });
    }
  }

  goBack() {
    if (this.currentPlace?.tripId) {
      this.router.navigate(['tripDetail', this.currentPlace.tripId]);
    } else {
      console.warn(
        'Unable to navigate back to trip-detail page. Missing tripId.'
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deletePlace(placeId: string) {
    var confirmDeletion = confirm('Are you sure you want to delete?');
    if (confirmDeletion) {
      if (placeId) {
        this.placeService.deletePlace(placeId).subscribe({
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }

  clickOnMap(location: GeoJsonPoint) {
    this.clickOnMapSubject.next(location);
  }

  addMarkerOnMap(geoJsonPoint: GeoJsonPoint) {
    this.addMarkerSubject.next(geoJsonPoint);
  }

  setCoordinatesOnCurrentPosition() {
    this.setCoorindatesOnCurrentPositionSubject.next();
  }

  markerSetOnCurrentPosition(geoJsonPoint: GeoJsonPoint) {
    this.markerSetOnCurrentPositionSubject.next(geoJsonPoint);
  }

  mapError(error: any) {
    this.errorSubject.next(error);
  }
}
