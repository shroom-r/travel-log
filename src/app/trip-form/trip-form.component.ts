import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class TripFormComponent implements OnInit {
  @Input() currentTrip?: TripResponse;
  tripTitle?: string;
  tripDescription?: string;
  formMode: FormMode = FormMode.New;
  @Input() tripId?: string | null;
  @Output() tripCreated: EventEmitter<TripResponse>;

  constructor(private tripService: TripService) {
    this.tripCreated = new EventEmitter();
  }

  ngOnInit(): void {
    //Call different initialization if tripIp is has value or is empty string'
    //If empty, it's a new trip so set New mode
    if (this.tripId) {
      //INITIALIZE IN MODIFICATION MODE HERE
      this.initializeMode(FormMode.Modification);
      
    } else {
      //INITIALIZE IN NEW MODE HERE
      this.initializeMode(FormMode.New);
    }
  }

  initializeMode(mode: FormMode) {
    this.formMode = mode;
    switch (mode) {
      case FormMode.New:
        break;
      case FormMode.Modification:
        this.tripTitle='Existing trip';
        this.tripDescription='Existing description'
        break;
      default:
        break;
    }
  }

  changeFormMode(mode: FormMode) {
    if (mode === FormMode.New) {
      this.formMode = FormMode.New;
    } else if (mode === FormMode.Modification) {
      this.formMode = FormMode.Modification;
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
          .subscribe((response) => {
            //this.currentTrip = response;
            this.tripCreated.emit(response);
          });
        //Après la création du voyage, récupérer le voyage et changer le mode du formulaire en "Modification".
        //Pour ça il faut émettre un evenement au parent pour dire que le voyage a été créé. Dans l'évènement, passer au parent le voyage pour ne pas avoir à le recharger
      } else if (this.formMode === FormMode.Modification) {
        //Mettre ici le service pour modifier un trip existant. Mais pour ça il faut récupérer l'ID du trip en cours
      }
    }
  }
}
