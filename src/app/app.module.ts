import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthModule } from './auth/auth.module';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { ApiTokenInterceptorService } from "./auth/api-token-interceptor.service";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TripsOnMapPageComponent } from './trips-on-map-page/trips-on-map-page.component';
import { AllMyTripsPageComponent } from './all-my-trips-page/all-my-trips-page.component';
import { ListPlacesComponent } from './list-places/list-places.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TripDetailPageComponent } from './trip-detail-page/trip-detail-page.component';
import { PlaceDetailPageComponent } from './place-detail-page/place-detail-page.component';
import { ListTripsAndPlacesComponent } from './list-trips-and-places/list-trips-and-places.component';
import { TileComponent } from './all-my-trips-page/tile/tile.component';
import { TripFormComponent } from './trip-form/trip-form.component';
<<<<<<< HEAD
=======
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateTripPageComponent } from './create-trip-page/create-trip-page.component';
>>>>>>> trip-form

@NgModule({
  declarations: [
    AppComponent,
    DummyPageComponent,
    NavBarComponent,
    TripsOnMapPageComponent,
    AllMyTripsPageComponent,
    ListPlacesComponent,
    PageNotFoundComponent,
    TripDetailPageComponent,
    PlaceDetailPageComponent,
    ListTripsAndPlacesComponent,
    TileComponent,
    TripFormComponent,
    CreateTripPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
