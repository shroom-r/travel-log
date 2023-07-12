import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from 'src/utils/geolocation'; // pour localiser
import { TripResponse } from '../../trips/trip-response.model'; // pour récupérer l'id du trip


@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss']
})
export class PlaceFormComponent implements OnInit {
  placeForm = new FormGroup({
    placeName: new FormControl(''),
    placeDescription: new FormControl(''),
  });

  // pour id du trip. Nécessaire?
  @Input() currentTrip?: TripResponse;
  id?: string;

/*   constructor() {

  }*/
  // sert à quoi?
  ngOnInit(): void {
    
  } 

/* submit Form
name
description
location
tripID - provient de la page allmytrips ou du trip donc juste récupérer l'ID avec un hidden input.
option: url image - charger un aperçu de l'image? thumbnail
autre: include, à voir
{
"name": "place",
"description": "a quelque part",
}
 selon place-response
  id: string,
  href: string,
  name: string,
  description: string,
  location: GeoJsonPoint,
  tripHref: string,
  tripId: string,
  pictureUrl?: string,
  createdAt: string,
  updatedAt: string,
*/
  // test fonctionne
  submit() {
  console.log("Envoi Formulaire, BINGO");
  }

  // ajouter bouton
  deletePlace() {
    console.log("Delete Place");
    confirm("Are you sur to delete?");
  }
}
