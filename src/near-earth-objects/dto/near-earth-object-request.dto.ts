import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class NearEarthObjectRequestDto {
  @ApiProperty()
  @IsDateString()
  DateRangeStart: string;

  @ApiProperty()
  @IsDateString()
  DateRangeEnd: string;
}
