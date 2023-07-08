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
}
