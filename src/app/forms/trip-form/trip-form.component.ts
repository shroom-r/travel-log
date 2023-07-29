import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormMode } from '../form-mode.model';
import { TripService } from '../../trips/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripResponse } from '../../trips/trip-response.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent implements OnInit, OnChanges {
  faTrash = faTrash;

  @Input() currentTrip?: TripResponse;
  @Input() loadingTripState?: string;
  tripTitle?: string;
  tripDescription?: string;
  formMode?: FormMode;
  formTitle?: string;
  saveButtonText?: string;
  stateMessage?: string;
  tripForm?: NgForm;
  tripId: string | null;

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) {
    this.tripId = this.route.snapshot.paramMap.get('tripId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
    if (this.loadingTripState) {
      this.showStateMessage(this.loadingTripState);
    } else {
      this.showStateMessage('');
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.tripId) {
      this.initializeMode(FormMode.Modification);
    } else {
      this.initializeMode(FormMode.New);
    }
  }

  initializeMode(formMode: FormMode) {
    this.formMode = formMode;
    switch (formMode) {
      case FormMode.New:
        this.tripTitle = '';
        this.tripDescription = '';
        this.formTitle = 'Create a new trip';
        this.saveButtonText = 'Save';
        break;
      case FormMode.Modification:
        this.tripTitle = this.currentTrip?.title;
        this.tripDescription = this.currentTrip?.description;
        this.formTitle = 'Trip informations';
        this.saveButtonText = 'Save changes';
        break;
      default:
        break;
    }
  }

  submitForm(form: NgForm) {
    if (this.formMode === FormMode.New) {
      this.createTrip();
    } else if (this.formMode === FormMode.Modification) {
      this.updateTrip(form);
    }
  }

  createTrip() {
    if (this.tripTitle && this.tripDescription) {
      this.showStateMessage('Creating trip ...');
      this.tripService
        .createTrip({
          title: this.tripTitle,
          description: this.tripDescription,
        })
        .subscribe({
          next: (response) => {
            this.router.navigate(['tripDetail/' + response.id]);
          },
          error: (error) => {
            this.showStateMessage(
              `An error occured. Trip have not been created. Error message: ${error.error.message}`
            );
          },
        });
    }
  }

  updateTrip(form: NgForm) {
    if (this.tripTitle && this.tripDescription) {
      if (this.currentTrip) {
        this.showStateMessage('Saving trip changes ...');
        this.tripService
          .updateTrip(this.currentTrip.id, {
            title: this.tripTitle,
            description: this.tripDescription,
          })
          .subscribe({
            next: (response) => {
              this.showStateMessage('Changes successfully saved !', 2000);
              form.resetForm(form.value);
              this.router.navigate(['tripDetail/' + response.id]);
            },
            error: (error) => {
              this.showStateMessage(
                `An error occured. Trip changes could not be saved. Error message: ${error.error.message}`
              );
            },
          });
      }
    }
  }

  showStateMessage(message: string, time?: number) {
    this.stateMessage = message;
    if (time) {
      setTimeout(() => {
        this.stateMessage = '';
      }, time);
    }
  }

  deleteTrip() {
    var confirmDeletion = confirm('Are you sure you want to delete?');
    if (confirmDeletion) {
      if (this.currentTrip) {
        this.tripService.deleteTrip(this.currentTrip?.id).subscribe({
          next: () => {
            this.router.navigate(['allMyTrips/']);
          },
          error: (error) => {
            this.showStateMessage(
              `An error occured. Trip changes could not be saved. Error message: ${error.error.message}`
            );
          },
        });
      }
    }
  }
}
