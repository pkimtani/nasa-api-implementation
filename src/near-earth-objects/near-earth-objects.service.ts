import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { NasaClient } from './nasa.client';
import { NearEarthObjectResponseDto } from './dto/near-earth-object-response.dto';
import { NearEarthObjectsMapper } from './near-earth-objects.mapper';
import { NasaApiResponse } from './interface/nasa-api-response-run.type';

interface DateGroups {
  start: Date;
  end: Date;
}

@Injectable()
export class NearEarthObjectsService {
  private readonly logger = new Logger(NearEarthObjectsService.name);

  constructor(
    private readonly nasaClient: NasaClient,
    private readonly nearEarthObjectsMapper: NearEarthObjectsMapper,
  ) {}

  async getNearEarthObjectsForDates(
    startDate: string,
    endDate: string,
  ): Promise<NearEarthObjectResponseDto[]> {
    try {
      const result: NasaApiResponse[] = [];
      const dateGroups: DateGroups[] = NearEarthObjectsService.getDateGroups(
        new Date(startDate),
        new Date(endDate),
      );

      await Promise.all(
        dateGroups.map(async (date) => {
          const data = await this.nasaClient.getNearEarthObjects(
            date.start,
            date.end,
          );
          result.push(data);
        }),
      );

      return this.nearEarthObjectsMapper.mapToNearEarthObjectsResponseDto(
        result,
      );
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch data from Nasa API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private static getDateGroups(startDate: Date, endDate: Date): DateGroups[] {
    const result: DateGroups[] = [];

    if (startDate.getTime() == endDate.getTime()) {
      return [
        {
          start: startDate,
          end: endDate,
        },
      ];
    }

    while (startDate < endDate) {
      const newEndDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 6,
      );
      result.push({
        start: new Date(startDate),
        end: newEndDate <= endDate ? newEndDate : endDate,
      });
      startDate.setDate(newEndDate.getDate() + 1);
    }

    return result;
  }
}
