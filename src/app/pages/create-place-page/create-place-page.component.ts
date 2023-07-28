import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GeoJsonPoint } from 'src/app/places/geoJsonPoint.model';

@Component({
  selector: 'app-create-place-page',
  templateUrl: './create-place-page.component.html',
  styleUrls: ['./create-place-page.component.scss'],
})
export class CreatePlacePageComponent {
  clickOnMapSubject: Subject<GeoJsonPoint> = new Subject<GeoJsonPoint>();
  addMarkerSubject: Subject<GeoJsonPoint> = new Subject<GeoJsonPoint>();
  setCoorindatesOnCurrentPositionSubject: Subject<void> = new Subject<void>();
  markerSetOnCurrentPositionSubject: Subject<GeoJsonPoint> =
    new Subject<GeoJsonPoint>();
  errorSubject: Subject<any> = new Subject<any>();

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
