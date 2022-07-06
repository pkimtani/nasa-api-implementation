import { HttpService } from '@nestjs/axios';
import { lastValueFrom, timeout } from 'rxjs';
import {
  NasaApiResponse,
  NasaApiResponseRunType,
} from './interface/nasa-api-response-run.type';
import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NasaClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getNearAsteroids(
    startDate: string,
    endDate: string,
  ): Promise<NasaApiResponse> {
    try {
      const response$ = this.httpService
        .get(this.apiUrl(startDate, endDate))
        .pipe(timeout(30000));
      const response = await lastValueFrom(response$);
      return NasaApiResponseRunType.check(response.data);
    } catch (error) {
      return error;
    }
  }

  private apiUrl = (startDate: string, endDate: string): string =>
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${this.configService.apiKey.key}`;
}
