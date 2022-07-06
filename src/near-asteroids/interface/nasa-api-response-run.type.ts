import * as RT from 'runtypes';
import { Dictionary } from 'runtypes';

const TopLinks = RT.Record({
  next: RT.String,
  prev: RT.String,
  self: RT.String,
});

const SelfLinks = RT.Record({
  self: RT.String,
});

const EstimatedDiameterMinMax = RT.Record({
  estimated_diameter_min: RT.Number,
  estimated_diameter_max: RT.Number,
});

const EstimatedDiameter = RT.Record({
  kilometers: EstimatedDiameterMinMax,
  meters: EstimatedDiameterMinMax,
  miles: EstimatedDiameterMinMax,
  feet: EstimatedDiameterMinMax,
});

const RelativeVelocity = RT.Record({
  kilometers_per_second: RT.String,
  kilometers_per_hour: RT.String,
  miles_per_hour: RT.String,
});

const MissDistance = RT.Record({
  astronomical: RT.String,
  lunar: RT.String,
  kilometers: RT.String,
  miles: RT.String,
});

const CloseApproachDate = RT.Record({
  close_approach_date: RT.String,
  close_approach_date_full: RT.String,
  epoch_date_close_approach: RT.Number,
  relative_velocity: RelativeVelocity,
  miss_distance: MissDistance,
  orbiting_body: RT.String,
});

const NearEarthObject = RT.Record({
  links: SelfLinks,
  id: RT.Number,
  neo_reference_id: RT.Number,
  name: RT.String,
  nasa_jpl_url: RT.String,
  absolute_magnitude_h: RT.Number,
  estimated_diameter: EstimatedDiameter,
  is_potentially_hazardous_asteroid: RT.Boolean,
  close_approach_data: CloseApproachDate,
  is_sentry_object: RT.Boolean,
});

const NearEarthObjects = Dictionary(RT.Array(NearEarthObject), 'string');

export const NasaApiResponseRunType = RT.Record({
  links: TopLinks,
  element_count: RT.Number,
  near_earth_objects: NearEarthObjects,
});

export type NearEarthObject = RT.Static<typeof NearEarthObject>;
export type NearEarthObjects = RT.Static<typeof NearEarthObjects>;
export type NasaApiResponse = RT.Static<typeof NasaApiResponseRunType>;
