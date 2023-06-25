import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { User } from "../users/user.model";
import { AuthRequest } from "./auth-request.model";
import { AuthResponse } from "./auth-response.model";
import { environment } from "src/environments/environment";

// Add a constant for the storage key in the LocalStorage
const AUTH_STORAGE_KEY = "travel-log-auth";

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
    // Get the credentials from the localStorage when the AuthService is created
    // It will either contains an AuthResponse object of null if it does not exist
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    // If there is a savedAuth, parse it to an object and emit it as the initial authentication value,
    // otherwise, emit undefined.
    this.authenticated$.next(savedAuth ? JSON.parse(savedAuth) : undefined);
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
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth`, authRequest).pipe(
      // The tap operator allows you to do something with an observable's emitted value
      // and emit it again unaltered.
      // In our case, we just store this AuthResponse in the localStorage
      tap((response) => this.#saveAuth(response)),
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
    // Remove the AuthResponse from the localStorage when user logs out
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // ...
    this.authenticated$.next(undefined);
  }

  /**
   * Saves the AuthResponse in the localStorage
   */
  #saveAuth(authResponse: AuthResponse): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authResponse));
  }
}