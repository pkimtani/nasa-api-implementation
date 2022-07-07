import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NearEarthObjectsModule } from './near-earth-objects/near-earth-objects.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [NearEarthObjectsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
