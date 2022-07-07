import { ApiProperty } from '@nestjs/swagger';

export class NearEarthObjectResponseDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  missDistanceKilometers: string[];
}
