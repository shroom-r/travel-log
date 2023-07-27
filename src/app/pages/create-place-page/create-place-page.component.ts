import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GeoJsonPoint } from 'src/app/places/geoJsonPoint.model';

@Component({
  selector: 'app-create-place-page',
  templateUrl: './create-place-page.component.html',
  styleUrls: ['./create-place-page.component.scss']
})
export class CreatePlacePageComponent {

  clickOnMapSubject: Subject<GeoJsonPoint> = new Subject<GeoJsonPoint>();

  clickOnMap(location: GeoJsonPoint) {
    this.clickOnMapSubject.next(location);
  }
}
