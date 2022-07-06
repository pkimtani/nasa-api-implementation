import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class NearAsteroidsRequestDto {
  @ApiProperty()
  @IsDateString()
  DateRangeStart: string;

  @ApiProperty()
  @IsDateString()
  DateRangeEnd: string;
}
