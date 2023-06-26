import { Injectable } from '@angular/core';
import { RegisterAccountRequest } from './register-account-request.model';
import { Observable, map, tap } from 'rxjs';
import { User } from '../users/user.model';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterAccount {

  constructor(private http: HttpClient) { }

  registerAccount$(registerAccountRequest: RegisterAccountRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, registerAccountRequest).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
