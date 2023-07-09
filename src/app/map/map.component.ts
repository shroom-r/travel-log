import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MapOptions, latLng, tileLayer, Map, Marker, marker, latLngBounds } from 'leaflet';
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

  @Input() centerMapOnLocationObservable?: Observable<GeoJsonPoint>;

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
    this.getPlaces();
  }

  ngOnDestroy() {
    this.centerMapEventSubscription?.unsubscribe();
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

  showPlacesOnMap() {
    this.mapMarkers = [];
    for (let place of this.places) {
      var lng = place.location.coordinates[0];
      var lat = place.location.coordinates[1];
      this.mapMarkers.push(
        marker([lat, lng], { icon: defaultIcon }).bindTooltip(place.name)
      );
    }
    var lastPlace = this.places[0];
    if (lastPlace?.location) {
      this.#map?.setView([
        lastPlace?.location.coordinates[1],
        lastPlace?.location.coordinates[0],
      ]);
    }
    //Calculate zoom bounds :
    //Get max an min values of Latitude and longitude
    var lngArray: number[] = [];
    var latArray: number[] = [];
    for (let place of this.places) {
      lngArray.push(place.location.coordinates[0]);
      latArray.push(place.location.coordinates[1]);
    }
    var minLat = Math.min(...latArray);
    var maxLat = Math.max(...latArray);
    var minLng = Math.min(...lngArray);
    var maxLng = Math.max(...lngArray);
    var bounds = latLngBounds(latLng(minLat, minLng), latLng(maxLat, maxLng));
    console.log(bounds);
    this.#map?.fitBounds(bounds);
  }

  centerMapOnLocation(location: GeoJsonPoint) {
    if (location) {
      var lng = location.coordinates[0];
      var lat = location.coordinates[1];
      this.#map?.setView([lat, lng], 13);
      this.selectedPlaceCoordinates = undefined;
    }
  }
}
