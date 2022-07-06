import { NearAsteroidsModule } from './near-asteroids.module';
import { Test, TestingModule } from '@nestjs/testing';
import { NasaClient } from './nasa.client';
import { HttpService } from '@nestjs/axios';
import { NasaApiResponse } from './interface/nasa-api-response-run.type';
import { Boolean, Number } from 'runtypes';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpStatus } from '@nestjs/common';

describe('NasaClient', () => {
  let testModule: TestingModule;
  let httpService: HttpService;
  let nasaClient: NasaClient;

  const mockAxiosResponse: AxiosResponse = {
    data: {},
    status: HttpStatus.OK,
    statusText: '',
    headers: {},
    config: {},
  };

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      imports: [NearAsteroidsModule],
    }).compile();

    httpService = await testModule.resolve(HttpService);
    nasaClient = await testModule.resolve(NasaClient);

    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => of(mockAxiosResponse));
  });

  it.each`
    startDate       | endDate
    ${'2020-11-05'} | ${'2020-11-05'}
    ${'2022-11-05'} | ${'2022-11-12'}
  `(
    'should fetch near earth asteroids for given start and end date',
    async ({ startDate, endDate }) => {
      console.log(`Start date: ${startDate} | End date: ${endDate}`);
      const res = await nasaClient.getNearAsteroids(startDate, endDate);
      console.log(res);
      const expectedResult: NasaApiResponse = {
        links: {
          next: expect.any(String),
          prev: expect.any(String),
          self: expect.any(String),
        },
        element_count: expect.any(Number),
        near_earth_objects: {
          date: [
            {
              links: {
                self: expect.any(String),
              },
              id: expect.any(Number),
              neo_reference_id: expect.any(Number),
              name: expect.any(String),
              nasa_jpl_url: expect.any(String),
              absolute_magnitude_h: expect.any(Number),
              estimated_diameter: {
                kilometers: {
                  estimated_diameter_max: expect.any(Number),
                  estimated_diameter_min: expect.any(Number),
                },
                meters: {
                  estimated_diameter_max: expect.any(Number),
                  estimated_diameter_min: expect.any(Number),
                },
                miles: {
                  estimated_diameter_max: expect.any(Number),
                  estimated_diameter_min: expect.any(Number),
                },
                feet: {
                  estimated_diameter_max: expect.any(Number),
                  estimated_diameter_min: expect.any(Number),
                },
              },
              is_potentially_hazardous_asteroid: expect.any(Boolean),
              close_approach_data: {
                close_approach_date: expect.any(String),
                close_approach_date_full: expect.any(String),
                epoch_date_close_approach: expect.any(Number),
                relative_velocity: {
                  kilometers_per_hour: expect.any(String),
                  kilometers_per_second: expect.any(String),
                  miles_per_hour: expect.any(String),
                },
                miss_distance: {
                  astronomical: expect.any(String),
                  lunar: expect.any(String),
                  kilometers: expect.any(String),
                  miles: expect.any(String),
                },
                orbiting_body: expect.any(String),
              },
              is_sentry_object: expect.any(Boolean),
            },
          ],
        },
      };
      expect(res).toEqual({});
    },
  );

  it.todo('should throw error for a very long date range');
  it.todo('should handle client errors gracefully');
});
