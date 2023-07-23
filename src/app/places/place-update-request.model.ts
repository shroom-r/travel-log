import { GeoJsonPoint } from "./geoJsonPoint.model"

export type PlaceUpdateRequest = {
    name?: string;
    description?: string;
    location?: GeoJsonPoint;
    tripHref?: string;
    tripId?: string;
    pictureUrl?: string;
  }
