import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss']
})
export class PlaceFormComponent {
  placeForm = new FormGroup({
    placeName: new FormControl(''),
    placeDescription: new FormControl(''),
  });

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

*/
  submit() {
  console.log("Envoi Formulaire, BINGO");
  }

  deletePlace() {
    console.log("Delete Place");

    confirm("Are you sur to delete?");

  }


}
