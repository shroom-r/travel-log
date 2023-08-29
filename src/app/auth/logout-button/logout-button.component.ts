import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout-button",
  template: '<button type="button" class="btn btn-danger m-2" (click)="logout()">Logout</button>',
})
export class LogoutButtonComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }
}