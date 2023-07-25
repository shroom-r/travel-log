import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PlaceCreationRequest } from './place-creation-request.model';
import { PlaceResponse } from './place-response.model';
import { environment } from 'src/environments/environment';
import { PlaceUpdateRequest } from './place-update-request.model';
// import { PlaceUpdateRequest } from './place-update-request.model';

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

  deletePlace(placeId: string) {
    return this.http.delete(this.apiUrlPlaces + `/${placeId}`).pipe(
      tap((response) => {
        return response;
      })
    );
  }

  updatePlace(
    placeId: string,
    placeUpdate: PlaceUpdateRequest
  ): Observable<PlaceResponse> {
    return this.http
      .patch<PlaceResponse>(this.apiUrlPlaces + `/${placeId}`, placeUpdate)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  getPlace(placeId: string): Observable<PlaceResponse> {
    return this.http.get<PlaceResponse>(`${this.apiUrlPlaces}/${placeId}`);
  }

  searchPlaceBySearchValue(searchValue: string): Observable<PlaceResponse[]> {
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
    //Include trip object in reponse body so we can filter by trip
    queryString += '&include=trip';
    return this.http.get<PlaceResponse[]>(this.apiUrlPlaces + queryString).pipe(
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
