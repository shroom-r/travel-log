import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TripCreationRequest } from './trip-creation-request.model';
import { Observable, tap } from 'rxjs';
import { TripResponse } from './trip-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  apiUrlTrips = `${environment.apiUrl}/trips`;
  constructor(private http: HttpClient) {}

  createTrip(
    tripCreationRequest: TripCreationRequest
  ): Observable<TripResponse> {
    return this.http
      .post<TripResponse>(this.apiUrlTrips, tripCreationRequest)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  getUserTrips(userId: string): Observable<TripResponse[]> {
    return this.http
      .get<TripResponse[]>(this.apiUrlTrips + `?user=${userId}`)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }
}
