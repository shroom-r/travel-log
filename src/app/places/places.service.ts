import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PlaceCreationRequest } from './place-creation-request.model';
import { PlaceResponse } from './place-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  apiUrlPlaces = `${environment.apiUrl}/places`;
  constructor(private http: HttpClient) {}

  createPlace(
    placeCreationRequest: PlaceCreationRequest
  ): Observable<PlaceResponse> {
    return this.http
      .post<PlaceResponse>(this.apiUrlPlaces, placeCreationRequest)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  getPlacesOfTrip(tripId: string): Observable<PlaceResponse[]> {
    return this.http
      .get<PlaceResponse[]>(this.apiUrlPlaces + `?trip=${tripId}`)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }
}
