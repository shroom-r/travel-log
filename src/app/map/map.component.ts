import { Component, Input } from '@angular/core';
import { MapOptions, latLng, tileLayer, Map, Marker, marker } from 'leaflet';
import { defaultIcon } from './default-marker';
import { TripResponse } from '../trips/trip-response.model';
import { PlaceResponse } from '../places/place-response.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  #map?: Map;
  @Input() currentTrip?: TripResponse;

  constructor() {
    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
        }),
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524),
    };
    this.mapMarkers = [
      marker([46.778186, 6.641524], { icon: defaultIcon }).bindTooltip('Hello'),
      marker([46.780796, 6.647395], { icon: defaultIcon }),
      marker([46.784992, 6.652267], { icon: defaultIcon }),
    ];
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 10);
    this.#map = map;
    this.#map.on('moveend', () => {
      const center = this.#map?.getCenter();
      console.log(`Map moved to ${center?.lng}, ${center?.lat}`);
    })
    this.getPlaces();
  }

  getPlaces() {
    //Get places
    var places: PlaceResponse[] = [];
    //SERVICE TO GET PLACES HERE.............................
    this.showPlacesOnMap(places);
  }

  showPlacesOnMap(places: PlaceResponse[]) {
    //FOR EACHE PLACE IN PLACES

    //GET COORDINATES

    //PUSH THEM TO MAPMARKERS INSIDE MARKER OBJECTS
  }
}
