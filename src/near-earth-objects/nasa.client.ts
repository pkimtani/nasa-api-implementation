import { HttpService } from '@nestjs/axios';
import { lastValueFrom, timeout } from 'rxjs';
import {
  NasaApiResponse,
  NasaApiResponseRunType,
} from './interface/nasa-api-response-run.type';
import { ConfigService } from '../config/config.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NasaClient {
  private readonly logger = new Logger(NasaClient.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getNearEarthObjects(
    startDate: Date,
    endDate: Date,
  ): Promise<NasaApiResponse> {
    try {
      const response$ = this.httpService
        .get(
          this.apiUrl(
            startDate.toISOString().split('T')[0],
            endDate.toISOString().split('T')[0],
          ),
        )
        .pipe(timeout(30000));
      const response = await lastValueFrom(response$);
      return NasaApiResponseRunType.check(response.data);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch data from Nasa API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private apiUrl = (startDate: string, endDate: string): string =>
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${this.configService.apiKey.key}`;
}
