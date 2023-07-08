import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapOptions, latLng, tileLayer, Map, Marker, marker } from 'leaflet';
import { defaultIcon } from './default-marker';
import { TripResponse } from '../trips/trip-response.model';
import { PlaceResponse } from '../places/place-response.model';
import { PlacesService } from '../places/places.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  mapOptions: MapOptions;
  mapMarkers: Marker[] = [];
  #map?: Map;
  @Input() currentTrip?: TripResponse;
  @Input() places: PlaceResponse[] = [];

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
    // this.mapMarkers = [
    //   marker([46.778186, 6.641524], { icon: defaultIcon }).bindTooltip('Hello'),
    //   marker([46.780796, 6.647395], { icon: defaultIcon }),
    //   marker([46.784992, 6.652267], { icon: defaultIcon }),
    // ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getPlaces();
  }

  ngOnInit(): void {
    this.getPlaces();
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 10);
    this.#map = map;
    this.#map.on('moveend', () => {
      const center = this.#map?.getCenter();
      console.log(`Map moved to ${center?.lng}, ${center?.lat}`);
    });
    this.getPlaces();
  }

  getPlaces() {
    if (this.currentTrip) {
      this.placesService.getPlacesOfTrip(this.currentTrip.id).subscribe((response) => {
        this.places = response;
        this.showPlacesOnMap();
      })
    }
  }

  showPlacesOnMap() {
    this.mapMarkers=[];
    for (let place of this.places) {
      var lng = place.location.coordinates[0];
      var lat = place.location.coordinates[1];
      console.log(`longiture:${lng} - latitude:${lat}`);
      this.mapMarkers.push(
        marker([lat, lng], { icon: defaultIcon }).bindTooltip(place.name)
      );
    }
    var lastPlace = this.places[0];
    if (lastPlace?.location) {
      this.#map?.setView([lastPlace?.location.coordinates[1], lastPlace?.location.coordinates[0]]);
    }
    console.log('Centered on ' + lastPlace?.name);
  }
}
