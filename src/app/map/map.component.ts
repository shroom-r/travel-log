import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  MapOptions,
  latLng,
  tileLayer,
  Map,
  Marker,
  marker,
  latLngBounds,
} from 'leaflet';
import { defaultIcon } from './default-marker';
import { TripResponse } from '../trips/trip-response.model';
import { PlaceResponse } from '../places/place-response.model';
import { PlacesService } from '../places/places.service';
import { GeoJsonPoint } from '../places/geoJsonPoint.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  mapOptions: MapOptions;
  mapMarkers: Marker[] = [];
  #map?: Map;
  @Input() currentTrip?: TripResponse;
  @Input() places: PlaceResponse[] = [];
  @Input() selectedPlaceCoordinates?: GeoJsonPoint;
  private centerMapEventSubscription?: Subscription;
  private showPlaceOnMapSubscription?: Subscription;
  private newSearchSubscription?: Subscription;
  private centerMapAroundPlacesSubscription?: Subscription;

  @Input() centerMapOnLocationObservable?: Observable<GeoJsonPoint>;
  @Input() showPlaceOnMapObservable?: Observable<PlaceResponse>;
  @Input() newSearchObservable?: Observable<void>;
  @Input() centerMapAroundPlacesObservable?: Observable<PlaceResponse[]>;

  constructor(private placesService: PlacesService) {
    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
        }),
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTrip']) {
      this.getPlaces();
    } else if (changes['selectedPlaceCoordinates']) {
      //this.centerMapOnLocation();
    }
  }

  ngOnInit(): void {
    this.centerMapEventSubscription =
      this.centerMapOnLocationObservable?.subscribe((response) => {
        this.centerMapOnLocation(response);
      });
    this.showPlaceOnMapSubscription = this.showPlaceOnMapObservable?.subscribe(
      (response) => {
        this.places.push(response);
        this.showPlaceOnMap(response);
      }
    );
    this.newSearchSubscription = this.newSearchObservable?.subscribe(() => {
      this.removeAllMarkers();
    });
    this.centerMapAroundPlacesSubscription =
      this.centerMapAroundPlacesObservable?.subscribe((response) => {
        this.centerMapAroundPlaces(response);
      });
    this.getPlaces();
  }

  ngOnDestroy() {
    this.centerMapEventSubscription?.unsubscribe();
    this.showPlaceOnMapSubscription?.unsubscribe();
    this.newSearchSubscription?.unsubscribe();
    this.centerMapAroundPlacesSubscription?.unsubscribe();
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 10);
    this.#map = map;
    this.#map.on('moveend', () => {
      const center = this.#map?.getCenter();
    });
    this.getPlaces();
  }

  getPlaces() {
    if (this.currentTrip) {
      this.placesService
        .getPlacesOfTrip(this.currentTrip.id)
        .subscribe((response) => {
          this.places = response;
          this.showPlacesOnMap();
        });
    }
  }

  showPlaceOnMap(place: PlaceResponse) {
    var lng = place.location.coordinates[0];
    var lat = place.location.coordinates[1];
    this.mapMarkers.push(
      marker([lat, lng], { icon: defaultIcon }).bindTooltip(place.name)
    );
    this.centerMapAroundPlaces(this.places);
  }

  removeAllMarkers() {
    this.mapMarkers = [];
  }

  showPlacesOnMap() {
    for (let place of this.places) {
      this.showPlaceOnMap(place);
    }
  }

  centerMapOnLocation(location: GeoJsonPoint) {
    if (location) {
      var lng = location.coordinates[0];
      var lat = location.coordinates[1];
      this.#map?.setView([lat, lng], 13);
      this.selectedPlaceCoordinates = undefined;
    }
  }

  centerMapAroundPlaces(places: PlaceResponse[]) {
    var lngArray = [];
    var latArray = []
    for (let place of places) {
      lngArray.push(place.location.coordinates[0]);
      latArray.push(place.location.coordinates[1]);
    }
    var minLat = Math.min(...latArray);
    var maxLat = Math.max(...latArray);
    var minLng = Math.min(...lngArray);
    var maxLng = Math.max(...lngArray);
    var bounds = latLngBounds(latLng(minLat, minLng), latLng(maxLat, maxLng));
    this.#map?.fitBounds(bounds, { maxZoom: 13, animate:false });
  }
}
