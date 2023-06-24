import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../users/user.model";
import { AuthRequest } from "./auth-request.model";
import { AuthResponse } from "./auth-response.model";

// TODO: Insert here your personnal api URL
const apiUrl = "https://my-travel-log.onrender.com/api";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   * A "ReplaySubject" is a Subject (the source of an Observable) that emits a predefined number of previously emitted
   * values to an Observer when it subscribes to it.
   * It will act as a sort of local "cache" for the AuthResponse object value.
   */
  private authenticated$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient) {
    // Create the ReplaySubject and configure it so that it emits the latest emitted value on each subscription
    this.authenticated$ = new ReplaySubject(1);
    // Emit an undefined value as the initial value, since our user is not logged in
    this.authenticated$.next(undefined);
  }

  /**
   * Checks if the user is authenticated by casting the latest AuthResponse value as a boolean
   */
  isAuthenticated$(): Observable<boolean> {
    return this.authenticated$.pipe(map((auth) => Boolean(auth)));
  }

  /**
   * Retrieves the User object from the latest AuthResponse value
   */
  getUser$(): Observable<User | undefined> {
    return this.authenticated$.pipe(map((auth) => auth?.user));
  }

  /**
   * Retrieves the token string from the latest AuthResponse value
   */
  getToken$(): Observable<string | undefined> {
    return this.authenticated$.pipe(map((auth) => auth?.token));
  }

  /**
   * Logs in a user with the provided AuthRequest object and emits the received AuthResponse if successful.
   */
  login$(authRequest: AuthRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${apiUrl}/auth`, authRequest).pipe(
      map((response) => {
        this.authenticated$.next(response);
        return response.user;
      })
    );
  }

  /**
   * Logs out a user and emit an empty AuthResponse
   */
  logout() {
    this.authenticated$.next(undefined);
  }
}