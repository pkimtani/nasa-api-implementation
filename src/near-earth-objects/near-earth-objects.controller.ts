import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { NearEarthObjectResponseDto } from './dto/near-earth-object-response.dto';
import { NearEarthObjectRequestDto } from './dto/near-earth-object-request.dto';
import { NearEarthObjectsService } from './near-earth-objects.service';

@Controller('asteroids')
export class NearEarthObjectsController {
  private readonly logger = new Logger(NearEarthObjectsController.name);

  constructor(
    private readonly nearEarthObjectsService: NearEarthObjectsService,
  ) {}

  @Get()
  async getNearEarthObjectsForDates(
    @Query(ValidationPipe) query: NearEarthObjectRequestDto,
  ): Promise<NearEarthObjectResponseDto[]> {
    try {
      return await this.nearEarthObjectsService.getNearEarthObjectsForDates(
        query.DateRangeStart,
        query.DateRangeEnd,
      );
    } catch (err) {
      this.logger.error(err);
      new HttpException(
        'Oops! Something went wrong while fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
