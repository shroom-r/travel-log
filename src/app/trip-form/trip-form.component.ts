import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormMode } from '../forms/form-mode.model';
import { TripService } from '../trips/trip.service';
import { ActivatedRoute } from '@angular/router';
import { TripResponse } from '../trips/trip-response.model';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent {
  tripTitle?: string;
  tripDescription?: string;
  formMode: FormMode = FormMode.New;
  @Input() tripId?: string | null;

  constructor(private tripService: TripService) {}

  changeFormMode() {
    if (this.formMode === FormMode.New) {
      this.formMode = FormMode.Modification;
    } else {
      this.formMode = FormMode.New;
    }
  }

  submitForm() {
    console.log('Form submit');
    if (this.tripTitle && this.tripDescription) {
      if (this.formMode === FormMode.New) {
        this.tripService
          .createTrip({
            title: this.tripTitle,
            description: this.tripDescription,
          })
          .subscribe();
        //Après la création du voyage, récupérer le voyage et changer le mode du formulaire en "Modification"
      } else if (this.formMode === FormMode.Modification) {
        //Mettre ici le service pour modifier un trip existant. Mais pour ça il faut récupérer l'ID du trip en cours
      }
    }
  }
}
