import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthModule } from './auth/auth.module';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { ApiTokenInterceptorService } from "./auth/api-token-interceptor.service";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TripsOnMapPageComponent } from './pages/trips-on-map-page/trips-on-map-page.component';
import { AllMyTripsPageComponent } from './pages/all-my-trips-page/all-my-trips-page.component';
import { ListPlacesComponent } from './list-places/list-places.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TripDetailPageComponent } from './pages/trip-detail-page/trip-detail-page.component';
import { PlaceDetailPageComponent } from './pages/place-detail-page/place-detail-page.component';
import { ListTripsAndPlacesComponent } from './list-trips-and-places/list-trips-and-places.component';
import { TileComponent } from './pages/all-my-trips-page/tile/tile.component';
import { TripFormComponent } from './forms/trip-form/trip-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateTripPageComponent } from './create-trip-page/create-trip-page.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { PlaceFormComponent } from './forms/place-form/place-form.component';
import { CreatePlacePageComponent } from './pages/create-place-page/create-place-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ErrorMessageComponent } from './utils/error-message/error-message.component';

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
    CreateTripPageComponent,
    MapComponent,
    PlaceFormComponent,
    CreatePlacePageComponent,
    SearchBarComponent,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    FontAwesomeModule,
    LeafletModule,
    ReactiveFormsModule,
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
