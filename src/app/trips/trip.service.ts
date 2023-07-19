import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TripCreationRequest } from './trip-creation-request.model';
import { Observable, tap } from 'rxjs';
import { TripResponse } from './trip-response.model';
import { environment } from 'src/environments/environment';
import { TripUpdateRequest } from './trip-update-request.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  apiUrlTrips = `${environment.apiUrl}/trips`;
  constructor(private http: HttpClient) {}

  //create a new trip
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

  //Delete a trip
  deleteTrip(tripId: string) {
    return this.http.delete(this.apiUrlTrips + `/${tripId}`).pipe(
      tap((response) => {
        return response;
      })
    );
  }

  //Get all trips for one user
  getUserTrips(userId: string): Observable<TripResponse[]> {
    return this.http
      .get<TripResponse[]>(this.apiUrlTrips + `?user=${userId}`)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  searchTripBySearchValue(searchValue: string): Observable<TripResponse[]> {
    //Build querystring
    //Split searchValue and pass it to array
    var searchValuesArray = [];
    searchValuesArray = searchValue.split(' ');
    //Loop through array to build query string. Delete last '&' after loop completed
    var queryString = '?';
    for (let value of searchValuesArray) {
      queryString += `search=${value}&`;
    }
    queryString = queryString.slice(0, -1);
    return this.http.get<TripResponse[]>(this.apiUrlTrips + queryString).pipe(
      tap((response) => {
        return response;
      })
    );
  }

  getTripById(tripId: string): Observable<TripResponse> {
    return this.http.get<TripResponse>(this.apiUrlTrips + `/${tripId}`).pipe(
      tap((response) => {
        return response;
      })
    );
  }

  updateTrip(
    tripId: string,
    tripUpdate: TripUpdateRequest
  ): Observable<TripResponse> {
    return this.http
      .patch<TripResponse>(this.apiUrlTrips + `/${tripId}`, tripUpdate)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }
}
