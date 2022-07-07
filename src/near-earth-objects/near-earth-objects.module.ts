import { Module } from '@nestjs/common';
import { NearEarthObjectsController } from './near-earth-objects.controller';
import { NearEarthObjectsService } from './near-earth-objects.service';
import { HttpModule } from '@nestjs/axios';
import { NasaClient } from './nasa.client';
import { ConfigModule } from '../config/config.module';
import { NearEarthObjectsMapper } from './near-earth-objects.mapper';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [NearEarthObjectsController],
  providers: [NearEarthObjectsService, NasaClient, NearEarthObjectsMapper],
})
export class NearEarthObjectsModule {}
