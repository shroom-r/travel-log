import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TripCreationRequest } from './trip-creation-request.model';
import { Observable, tap } from 'rxjs';
import { TripResponse } from './trip-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) {}

  createTrip(tripCreationRequest : TripCreationRequest): Observable<TripResponse> {
    return this.http.post<TripResponse>(`${environment.apiUrl}/trips`, tripCreationRequest).pipe(
      tap((response) => {return response;})
    )
  }

  getUserTrips(userId: string) : Observable<TripResponse[]> {
    return this.http.get<TripResponse[]>(`${environment.apiUrl}/trips?user=${userId}`).pipe(
      tap((response) => {return response;})
    )
  } 
}
