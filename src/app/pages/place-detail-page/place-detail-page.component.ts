import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlacesService } from 'src/app/places/places.service';
import { PlaceResponse } from 'src/app/places/place-response.model';
import { ErrorMessageComponent } from 'src/app/utils/error-message/error-message.component';

@Component({
  selector: 'app-place-detail-page',
  templateUrl: './place-detail-page.component.html',
  styleUrls: ['./place-detail-page.component.scss']
})
export class PlaceDetailPageComponent implements OnDestroy {
  place?: PlaceResponse;
  errorMessage?: string;
  private destroy$ = new Subject<void>();

  latitude?: number;
  longitude?: number;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlacesService
  ) { }

  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('placeId');
    if (placeId) {
      this.placeService.getPlace(placeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (response) => {
            this.place = response;
            this.longitude = response.location.coordinates[0];
            this.latitude = response.location.coordinates[1];
          },
          (error) => {
            this.errorMessage = 'Error fetching place details. Please try again later.';
            console.error('Error fetching place:', error);
          }
        );
    }
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
