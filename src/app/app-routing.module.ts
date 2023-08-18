import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { TripsOnMapPageComponent } from './pages/trips-on-map-page/trips-on-map-page.component';
import { AllMyTripsPageComponent } from './pages/all-my-trips-page/all-my-trips-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TripDetailPageComponent } from './pages/trip-detail-page/trip-detail-page.component';
import { PlaceDetailPageComponent } from './pages/place-detail-page/place-detail-page.component';
import { CreateTripPageComponent } from './create-trip-page/create-trip-page.component';
import { CreatePlacePageComponent } from './pages/create-place-page/create-place-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'allMyTrips' },
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
      {
        path: 'placeDetail/:placeId',
        component: PlaceDetailPageComponent,
      },
      {
        path: 'newPlace',
        component: CreatePlacePageComponent,
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
