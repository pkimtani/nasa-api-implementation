import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get apiKey(): { key: string } {
    return { key: this.nestConfigService.get<string>('NASA_API_KEY') || '' };
  }
}
