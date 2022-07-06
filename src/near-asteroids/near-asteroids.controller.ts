import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { NearAsteroidsResponseDto } from './dto/near-asteroids-response.dto';
import { NearAsteroidsRequestDto } from './dto/near-asteroids-request.dto';
import { NearAsteroidsService } from './near-asteroids.service';

@Controller('asteroids')
export class NearAsteroidsController {
  constructor(private readonly nearAsteroidService: NearAsteroidsService) {}

  @Get()
  getNearAsteroidsForDates(
    @Query(ValidationPipe) query: NearAsteroidsRequestDto,
  ): NearAsteroidsResponseDto {
    return { result: 'good' };
  }
}
