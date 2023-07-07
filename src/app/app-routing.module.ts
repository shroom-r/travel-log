import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { TripsOnMapPageComponent } from './trips-on-map-page/trips-on-map-page.component';
import { AllMyTripsPageComponent } from './all-my-trips-page/all-my-trips-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TripDetailPageComponent } from './trip-detail-page/trip-detail-page.component';
import { PlaceDetailPageComponent } from './place-detail-page/place-detail-page.component';
import { CreateTripPageComponent } from './create-trip-page/create-trip-page.component';

const routes: Routes = [
  //{ path: "", redirectTo: "dummy", pathMatch: "full" },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'dummy',
    component: DummyPageComponent,
    //Prevent access to this page to unauthenticated users
    canActivate: [authGuard],
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'tripsOnMap' },
      {
        path: 'tripsOnMap',
        component: TripsOnMapPageComponent,
      },
      {
        path: 'allMyTrips',
        component: AllMyTripsPageComponent,
      },
      {
        path: 'newTrip',
        component: CreateTripPageComponent
      },
      {
        path: 'tripDetail/:tripId',
        component: TripDetailPageComponent,
      },
      // {
      //   path: 'tripDetail',
      //   children: [
      //     { path: '', component: TripDetailPageComponent },
      //     { path: ':tripId', component: TripDetailPageComponent },
      //   ],
      // },
      {
        path: 'placeDetail',
        component: PlaceDetailPageComponent,
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
