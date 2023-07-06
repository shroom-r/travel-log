import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class TripFormComponent implements OnInit, OnChanges {
  @Input() currentTrip?: TripResponse;
  tripTitle?: string;
  tripDescription?: string;
  formMode?: FormMode;
  @Input() tripId?: string | null;
  @Output() tripUpdated: EventEmitter<TripResponse>;
  @Output() tripDeleted: EventEmitter<null>;

  constructor(private tripService: TripService) {
    this.tripUpdated = new EventEmitter();
    this.tripDeleted = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    //Call different initialization if tripIp is has value or is empty string'
    //If empty, it's a new trip so set New mode
    if (this.currentTrip) {
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
        this.tripTitle = '';
        this.tripDescription = '';
        break;
      case FormMode.Modification:
        this.tripTitle = this.currentTrip?.title;
        this.tripDescription = this.currentTrip?.description;
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
            this.tripUpdated.emit(response);
          });
      } else if (this.formMode === FormMode.Modification) {
        //Mettre ici le service pour modifier un trip existant. Mais pour ça il faut récupérer l'ID du trip en cours
        if (this.currentTrip) {
          this.tripService
            .updateTrip(this.currentTrip.id, {
              title: this.tripTitle,
              description: this.tripDescription,
            })
            .subscribe((response) => {
              //this.currentTrip = response;
              this.tripUpdated.emit(response);
            });
        }
      }
    }
  }

  deleteTrip() {
    console.log('DELETION');
    if (this.currentTrip) {
      this.tripService.deleteTrip(this.currentTrip?.id).subscribe(() => {
        this.tripDeleted.emit();
      });
    }
  }
}
