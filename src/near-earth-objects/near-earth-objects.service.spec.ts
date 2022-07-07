import { Test, TestingModule } from '@nestjs/testing';
import { NearEarthObjectsService } from './near-earth-objects.service';
import { NasaClient } from './nasa.client';
import { NearEarthObjectsMapper } from './near-earth-objects.mapper';
import { getNearEarthObjectsResponseFactory } from './factory/nasa-client.factory';
import { NearEarthObjectResponseDto } from './dto/near-earth-object-response.dto';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '../config/config.module';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('NearAsteroidsService', () => {
  let nearEarthObjectService: NearEarthObjectsService;
  let nearEarthObjectMapper: NearEarthObjectsMapper;
  let nasaClient: NasaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [NearEarthObjectsService, NasaClient, NearEarthObjectsMapper],
    }).compile();

    nearEarthObjectService = module.get<NearEarthObjectsService>(
      NearEarthObjectsService,
    );
    nearEarthObjectMapper = module.get<NearEarthObjectsMapper>(
      NearEarthObjectsMapper,
    );
    nasaClient = module.get<NasaClient>(NasaClient);
  });

  it('should be defined', () => {
    expect(nearEarthObjectService).toBeDefined();
  });

  it.each`
    startDate       | endDate
    ${'2022-11-05'} | ${'2022-11-05'}
    ${'2022-11-05'} | ${'2022-11-12'}
  `(
    'should fetch near earth objects for given start and end date',
    async ({ startDate, endDate }) => {
      const mockNearEarthObjectsResponse =
        getNearEarthObjectsResponseFactory.build(
          {},
          {
            transient: { date: startDate },
          },
        );

      jest
        .spyOn(nasaClient, 'getNearEarthObjects')
        .mockImplementation(() =>
          Promise.resolve(mockNearEarthObjectsResponse),
        );

      const res = await nearEarthObjectService.getNearEarthObjectsForDates(
        startDate,
        endDate,
      );
      const expectedResult: NearEarthObjectResponseDto[] =
        nearEarthObjectMapper.mapToNearEarthObjectsResponseDto([
          mockNearEarthObjectsResponse,
        ]);

      expect(res).toEqual(expectedResult);
    },
  );

  it('should handle client errors gracefully', async () => {
    jest
      .spyOn(nasaClient, 'getNearEarthObjects')
      .mockImplementation(() =>
        Promise.reject(
          new HttpException(
            'Something went wrong',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        ),
      );

    await expect(
      nearEarthObjectService.getNearEarthObjectsForDates(
        '2022-01-01',
        '2022-01-01',
      ),
    ).rejects.toEqual(
      new HttpException(
        'Failed to fetch data from Nasa API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  });
});
