import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormMode } from '../form-mode.model';
import { TripService } from '../../trips/trip.service';
import { Router } from '@angular/router';
import { TripResponse } from '../../trips/trip-response.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Geolocation } from 'src/utils/geolocation';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent implements OnInit, OnChanges {
  faTrash = faTrash;

  @Input() currentTrip?: TripResponse;
  tripTitle?: string;
  tripDescription?: string;
  formMode?: FormMode;

  constructor(private tripService: TripService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

  ngOnInit(): void {
    // Geolocation.getCurrentPosition().then(console.log).catch(console.error);
    this.initForm();
  }

  initForm() {
    if (this.currentTrip) {
      this.initializeMode(FormMode.Modification);
    } else {
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
            this.router.navigate(['tripDetail/' + response.id]);
          });
      } else if (this.formMode === FormMode.Modification) {
        if (this.currentTrip) {
          this.tripService
            .updateTrip(this.currentTrip.id, {
              title: this.tripTitle,
              description: this.tripDescription,
            })
            .subscribe((response) => {
              this.router.navigate(['tripDetail/' + response.id]);
            });
        }
      }
    }
  }

  deleteTrip() {
    console.log('DELETION');
    if (this.currentTrip) {
      this.tripService.deleteTrip(this.currentTrip?.id).subscribe(() => {
        this.router.navigate(['allMyTrips/']);
      });
    }
  }
}
