import {
  NasaApiResponse,
  NearEarthObject, NearEarthObjects
} from "../interface/nasa-api-response-run.type";
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

const speedKilometersPerSecond = [
  '18.1279547773',
  '19.7498128142',
  '9.7498128',
];

const speedKilometersPerHour = [
  '65260.6371983344',
  '1099.3261312856"',
  '5260.6371983344',
];

const speedMilesPerHour = [
  '0550.4220413761',
  '44178.3562841869',
  '4178.3562841869',
];

const distanceAstronomical = ['0.3027478814', '0.2591250701', '0.4917435147'];

const distanceLunar = ['117.7689258646', '100.7996522689', '191.2882272183'];

const distanceKilometers = [
  '45290438.204452618',
  '38764558.550560687',
  '73563782.385433689',
];

const distanceMiles = [
  '28142173.3303294084',
  '24087179.7459520006',
  '45710414.7542113482',
];

export const getNearAsteroidsResponseFactory: Factory<NasaApiResponse> =
  Factory.define<NasaApiResponse>(({ sequence }) => ({
    links: {
      next: faker.internet.url(),
      prev: faker.internet.url(),
      self: faker.internet.url(),
    },
    element_count: 1,
    near_earth_objects: {
      [faker.date.past().getDate().toString()]: nearEarthObjectsFactory.buildList(faker.datatype.number({ min: 1, max: 10 })),
    },
  }));

const nearEarthObjectsFactory: Factory<NearEarthObjects> =
  Factory.define<NearEarthObjects>(({ sequence }) => ({
    [faker.date.past().getDate().toString()]: []
  });

const nearEarthObjectsFactory: Factory<NearEarthObject> =
  Factory.define<NearEarthObject>(({ sequence }) => ({
    links: {
      self: faker.internet.url(),
    },
    id: sequence,
    neo_reference_id: faker.datatype.number(),
    name: faker.name.firstName(),
    nasa_jpl_url: faker.internet.url(),
    absolute_magnitude_h: faker.datatype.number(),
    estimated_diameter: {
      kilometers: {
        estimated_diameter_max: faker.datatype.number(),
        estimated_diameter_min: faker.datatype.number(),
      },
      meters: {
        estimated_diameter_max: faker.datatype.number(),
        estimated_diameter_min: faker.datatype.number(),
      },
      miles: {
        estimated_diameter_max: faker.datatype.number(),
        estimated_diameter_min: faker.datatype.number(),
      },
      feet: {
        estimated_diameter_max: faker.datatype.number(),
        estimated_diameter_min: faker.datatype.number(),
      },
    },
    is_potentially_hazardous_asteroid: faker.datatype.boolean(),
    close_approach_data: {
      close_approach_date: faker.date.past().toDateString(),
      close_approach_date_full: faker.date.past().toDateString(),
      epoch_date_close_approach: faker.datatype.number(),
      relative_velocity: {
        kilometers_per_hour: faker.helpers.arrayElement(
          speedKilometersPerSecond,
        ),
        kilometers_per_second: faker.helpers.arrayElement(
          speedKilometersPerHour,
        ),
        miles_per_hour: faker.helpers.arrayElement(speedMilesPerHour),
      },
      miss_distance: {
        astronomical: faker.helpers.arrayElement(distanceAstronomical),
        lunar: faker.helpers.arrayElement(distanceLunar),
        kilometers: faker.helpers.arrayElement(distanceKilometers),
        miles: faker.helpers.arrayElement(distanceMiles),
      },
      orbiting_body: 'Earth',
    },
    is_sentry_object: faker.datatype.boolean(),
  }));
