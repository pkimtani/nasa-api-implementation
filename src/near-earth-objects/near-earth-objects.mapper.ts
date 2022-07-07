import { Injectable } from '@nestjs/common';
import { NasaApiResponse } from './interface/nasa-api-response-run.type';
import { NearEarthObjectResponseDto } from './dto/near-earth-object-response.dto';

@Injectable()
export class NearEarthObjectsMapper {
  public mapToNearEarthObjectsResponseDto(
    nasaApiResponseData: NasaApiResponse[],
  ): NearEarthObjectResponseDto[] {
    const nearObjectsResponse: NearEarthObjectResponseDto[] = [];
    for (const nasaApiResponse of nasaApiResponseData) {
      for (const nearEarthObjectsDate in nasaApiResponse.near_earth_objects) {
        for (const nearEarthObject of nasaApiResponse.near_earth_objects[
          nearEarthObjectsDate
        ]) {
          nearObjectsResponse.push({
            date: nearEarthObjectsDate,
            id: nearEarthObject.id,
            name: nearEarthObject.name,
            missDistanceKilometers: nearEarthObject.close_approach_data.map(
              (closeApproach) => closeApproach.miss_distance.kilometers,
            ),
          });
        }
      }
    }

    return nearObjectsResponse;
  }
}
