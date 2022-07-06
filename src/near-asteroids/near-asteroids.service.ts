import { Injectable } from '@nestjs/common';
import { NasaClient } from './nasa.client';

@Injectable()
export class NearAsteroidsService {
  constructor(private readonly nasaClient: NasaClient) {}

  async getNearAsteroidForDates(startDate: string, endDate: string) {
    try {
      return await this.nasaClient.getNearAsteroids(startDate, endDate);
    } catch (error) {
      return error;
    }
  }
}
