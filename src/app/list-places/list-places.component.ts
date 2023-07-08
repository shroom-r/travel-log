import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PlaceResponse } from '../places/place-response.model';
import { TripResponse } from '../trips/trip-response.model';
import { PlacesService } from '../places/places.service';
import { Geolocation } from '../../utils/geolocation';
import { faPencil, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.scss'],
})
export class ListPlacesComponent implements OnInit, OnChanges {
  faPencil = faPencil;
  faSquarePlus = faSquarePlus;

  @Input() places: PlaceResponse[] = [];
  @Input() currentTrip?: TripResponse;

  constructor(private placeService: PlacesService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getPlaces();
  }
  ngOnInit(): void {
    this.getPlaces();
    Geolocation.getCurrentPosition().then(console.log).catch(console.error);
  }

  getPlaces() {
    this.places = [];
    if (this.currentTrip) {
      this.placeService
        .getPlacesOfTrip(this.currentTrip.id)
        .subscribe((response) => {
          console.log(response);
          response.forEach((place) => this.places?.push(place));
        });
    }
  }

  addPlace(): void {
    console.log("click");
  }

  modifyPlace() {}
}
