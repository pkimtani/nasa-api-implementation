import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NearAsteroidsModule } from './near-asteroids/near-asteroids.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [NearAsteroidsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
