import { Component} from '@angular/core';
import { PlaceResponse } from '../../places/place-response.model';
import { Subject } from 'rxjs';
import { GeoJsonPoint } from 'src/app/places/geoJsonPoint.model';

@Component({
  selector: 'app-trips-on-map-page',
  templateUrl: './trips-on-map-page.component.html',
  styleUrls: ['./trips-on-map-page.component.scss'],
})
export class TripsOnMapPageComponent {
  searchValuesSubject: Subject<string> = new Subject<string>();
  showPlaceOnMapSubject: Subject<PlaceResponse> = new Subject<PlaceResponse>();
  newSearchSubject: Subject<void> = new Subject<void>();
  centerPlaceOnMapSubject: Subject<GeoJsonPoint> = new Subject<GeoJsonPoint>();
  centerMapAroundPlacesSubject: Subject<PlaceResponse[]> = new Subject<PlaceResponse[]>;

  search(searchValues: string) {
    this.searchValuesSubject.next(searchValues);
  }

  showPlaceOnMap(place: PlaceResponse) {
    this.showPlaceOnMapSubject.next(place);
  }

  newSearch() {
    this.newSearchSubject.next();
  }

  centerPlaceOnMap(placeLocation: GeoJsonPoint) {
    this.centerPlaceOnMapSubject.next(placeLocation);
  }

  centerMapAroundPlaces(places: PlaceResponse[]) {
    this.centerMapAroundPlacesSubject.next(places);
  }
}
