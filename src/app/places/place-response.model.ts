import { TripResponse } from "../trips/trip-response.model";
import { GeoJsonPoint } from "./geoJsonPoint.model";

export type PlaceResponse = {
  id: string,
  href: string,
  name: string,
  description: string,
  location: GeoJsonPoint,
  tripHref: string,
  tripId: string,
  pictureUrl?: string,
  createdAt: string,
  updatedAt: string,
  trip?: TripResponse
}