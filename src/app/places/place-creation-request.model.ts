import { GeoJsonPoint } from "./geoJsonPoint.model"

export type PlaceCreationRequest = {
  name: string,
  description: string,
  location: GeoJsonPoint
  tripHref?: string,
  tripId?: string,
  pictureUrl?: string,
}