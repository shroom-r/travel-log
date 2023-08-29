import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
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
import { Geolocation } from 'src/utils/geolocation';

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
  private centerMapOnCurrentLocationSubscription?: Subscription;
  private placeDeletedSubscription?: Subscription;
  private addMarkerSubscription?: Subscription;
  private setCoordinatesOnCurrentPositionSubscription?: Subscription;

  @Input() centerMapOnLocationObservable?: Observable<GeoJsonPoint>;
  @Input() showPlaceOnMapObservable?: Observable<PlaceResponse>;
  @Input() newSearchObservable?: Observable<void>;
  @Input() centerMapAroundPlacesObservable?: Observable<PlaceResponse[]>;
  @Input() centerMapOnCurrentLocationObservable?: Observable<void>;
  @Input() placeDeletedObservable?: Observable<void>;
  @Input() addMarkerObservable?: Observable<GeoJsonPoint>;
  @Input() setCoordinatesOnCurrentPositionObservable?: Observable<void>;

  @Output() clickOnMapEmitter: EventEmitter<GeoJsonPoint>;
  @Output() currentPositionEmitter: EventEmitter<GeoJsonPoint>;
  @Output() errorEmitter: EventEmitter<any>;

  constructor(
    private placesService: PlacesService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
        }),
      ],
      zoom: 18,
      center: latLng(47.14530977472236, 6.988554596900941),
    };
    this.clickOnMapEmitter = new EventEmitter<GeoJsonPoint>();
    this.currentPositionEmitter = new EventEmitter<GeoJsonPoint>();
    this.errorEmitter = new EventEmitter<any>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTrip']) {
      this.getPlaces();
    }
  }

  ngOnInit(): void {
    this.centerMapEventSubscription =
      this.centerMapOnLocationObservable?.subscribe((response) => {
        this.centerMapOnLocation(response, 13);
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
    this.centerMapOnCurrentLocationSubscription =
      this.centerMapOnCurrentLocationObservable?.subscribe(() => {
        this.centerOnCurrentLocation();
      });
    this.placeDeletedSubscription = this.placeDeletedObservable?.subscribe(
      () => {
        this.getPlaces();
      }
    );
    this.addMarkerSubscription = this.addMarkerObservable?.subscribe(
      (geoJsonPoint) => {
        this.addMarkerOnClick(geoJsonPoint);
      }
    );
    this.setCoordinatesOnCurrentPositionSubscription =
      this.setCoordinatesOnCurrentPositionObservable?.subscribe(() => {
        this.setMarkerOnCurrentPosition();
      });
    // this.getPlaces();
  }

  ngOnDestroy() {
    this.centerMapEventSubscription?.unsubscribe();
    this.showPlaceOnMapSubscription?.unsubscribe();
    this.newSearchSubscription?.unsubscribe();
    this.centerMapAroundPlacesSubscription?.unsubscribe();
    this.centerMapOnCurrentLocationSubscription?.unsubscribe();
    this.placeDeletedSubscription?.unsubscribe();
    this.addMarkerSubscription?.unsubscribe();
    this.setCoordinatesOnCurrentPositionSubscription?.unsubscribe();
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 10);
    this.#map = map;
    //Click event on map to get coordinates
    this.#map.on('click', (event) => {
      var lng = event.latlng.lng;
      var lat = event.latlng.lat;
      this.clickOnMapEmitter.emit({ type: 'point', coordinates: [lng, lat] });
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
    this.removeAllMarkers();
    for (let place of this.places) {
      this.showPlaceOnMap(place);
    }
  }

  centerMapOnLocation(location: GeoJsonPoint, zoom?: number) {
    if (location) {
      var lng = location.coordinates[0];
      var lat = location.coordinates[1];
      this.#map?.setView([lat, lng], zoom);
      this.selectedPlaceCoordinates = undefined;
    }
  }

  centerMapAroundPlaces(places: PlaceResponse[]) {
    var lngArray = [];
    var latArray = [];
    for (let place of places) {
      lngArray.push(place.location.coordinates[0]);
      latArray.push(place.location.coordinates[1]);
    }
    var minLat = Math.min(...latArray);
    var maxLat = Math.max(...latArray);
    var minLng = Math.min(...lngArray);
    var maxLng = Math.max(...lngArray);
    var bounds = latLngBounds(latLng(minLat, minLng), latLng(maxLat, maxLng));
    this.#map?.fitBounds(bounds, { maxZoom: 13, animate: false });
  }

  centerOnCurrentLocation() {
    Geolocation.getCurrentPosition()
      .then((position) => {
        console.log(position);
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.#map?.setView([lat, lng], 13);
      })
      .catch(console.error);
  }

  addMarkerOnClick(geoJsonObject: GeoJsonPoint) {
    this.mapMarkers = [];
    var lng = geoJsonObject.coordinates[0];
    var lat = geoJsonObject.coordinates[1];
    this.mapMarkers.push(marker([lat, lng], { icon: defaultIcon }));
    this.centerMapOnLocation(geoJsonObject);
    this.changeDetector.detectChanges();
  }

  setMarkerOnCurrentPosition() {

    Geolocation.getCurrentPosition()
      .then((position) => {
        this.mapMarkers = [];

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var geoJsonPoint = {
          type: 'point',
          coordinates: [lng, lat],
        };
        this.currentPositionEmitter.emit(geoJsonPoint);
        this.mapMarkers.push(marker([lat, lng], { icon: defaultIcon }));
        this.centerMapOnLocation(geoJsonPoint);
        this.changeDetector.detectChanges();
      })
      .catch((error) => {
        this.errorEmitter.emit(error);
        console.error(error.message);
      });
  }
}
