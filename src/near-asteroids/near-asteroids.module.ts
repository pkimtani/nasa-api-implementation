import { Module } from '@nestjs/common';
import { NearAsteroidsController } from './near-asteroids.controller';
import { NearAsteroidsService } from './near-asteroids.service';
import { HttpModule } from '@nestjs/axios';
import { NasaClient } from './nasa.client';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [NearAsteroidsController],
  providers: [NearAsteroidsService, NasaClient],
})
export class NearAsteroidsModule {}
