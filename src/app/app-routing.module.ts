import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path:"", redirectTo: "dummy", pathMatch: "full"},
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "dummy",
    component: DummyPageComponent,
    //Prevent access to this page to unauthenticated users
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
