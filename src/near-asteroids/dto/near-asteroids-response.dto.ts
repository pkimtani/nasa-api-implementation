import { ApiProperty } from '@nestjs/swagger';

export class NearAsteroidsResponseDto {
  @ApiProperty()
  result: string;
}
