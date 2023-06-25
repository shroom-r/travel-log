import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { AuthRequest } from "../auth-request.model";

enum PageMode {
  login = "login",
  createAccount = "createAccount",
}

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   *
   * Partial is a generic typescript that creates a type from the type param,
   * with all the properties optionally undefined.
   */
  authRequestInput: Partial<AuthRequest>;

  /**
   * If defined, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError?: string;

  //Set pageMode to default value = login
  pageMode: PageMode = PageMode.login;
  submitButtonText: string;
  changeModeLinkText: string;

  constructor(private auth: AuthService, private router: Router) {
    this.authRequestInput = {};
    this.pageMode = PageMode.login;
    this.submitButtonText = "Log in";
    this.changeModeLinkText = "Create account";
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      // Hide any previous login error.
      this.loginError = undefined;

      // Perform the authentication request to the API.
      // Since the login$() method requires an AuthRequest param, but
      // our authRequestInput has optional properties, we need to convert it
      // to an new object that matches the AuthRequest type.
      this.auth
        .login$({
          password: this.authRequestInput.password ?? "",
          username: this.authRequestInput.username ?? "",
        })
        .subscribe({
          next: () => this.router.navigateByUrl("/"),
          error: (err) => (this.loginError = err.message),
        });
    }
  }

  switchPageMode() {
    if (this.pageMode === PageMode.login) {
      this.pageMode = PageMode.createAccount;
      this.submitButtonText = "Create account";
      this.changeModeLinkText = "Back to login page";
    } else {
      this.pageMode = PageMode.login;
      this.submitButtonText = "Log in";
      this.changeModeLinkText = "Create account";
    }

  }
}