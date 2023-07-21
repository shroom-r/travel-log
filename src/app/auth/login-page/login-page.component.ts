import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { AuthRequest } from "../auth-request.model";
import { RegisterAccount } from "../register-account.service";

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
  pageTitle: string;
  userMessage: string = '';

  constructor(private auth: AuthService, private registerAccount: RegisterAccount, private router: Router) {
    this.authRequestInput = {};
    this.pageMode = PageMode.login;
    this.submitButtonText = "Log in";
    this.changeModeLinkText = "Create account";
    this.pageTitle = "Log in to TravelLog";
  }

  setDefaultValues() {
    
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      // Hide any previous login error.
      this.loginError = undefined;

      switch (this.pageMode) {
        case PageMode.login:
          this.login();
          break;
        case PageMode.createAccount:
          this.createAccount();
      }
    }
  }

  login() {
    // Perform the authentication request to the API.
    // Since the login$() method requires an AuthRequest param, but
    // our authRequestInput has optional properties, we need to convert it
    // to an new object that matches the AuthRequest type.
    this.showUserMessage('Loging in');
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

  createAccount() {
    this.showUserMessage('Creating account');
    this.registerAccount
      .registerAccount$({
        name: this.authRequestInput.username ?? "",
        password: this.authRequestInput.password ?? ""
      })
      .subscribe({
        next: () => {
          this.login();
        },
        error: (err) => (this.showErrorMessage(err.message)),
      });
  }

  switchPageMode() {
    if (this.pageMode === PageMode.login) {
      this.pageMode = PageMode.createAccount;
      this.submitButtonText = "Create account";
      this.changeModeLinkText = "Back to login page";
      this.pageTitle = "Create a new account"
    } else {
      this.pageMode = PageMode.login;
      this.submitButtonText = "Log in";
      this.changeModeLinkText = "Create account";
      this.pageTitle = "Log in to TravelLog"
    }

  }

  showUserMessage(message:string, time?:number) {
    this.userMessage = message;
  }

  showErrorMessage(message: string) {
    this.userMessage = '';
    this.loginError = message;
  }
}