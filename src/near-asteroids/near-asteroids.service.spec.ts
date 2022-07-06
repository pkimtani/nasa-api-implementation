import { Test, TestingModule } from '@nestjs/testing';
import { NearAsteroidsService } from './near-asteroids.service';

describe('NearAsteroidsService', () => {
  let service: NearAsteroidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearAsteroidsService],
    }).compile();

    service = module.get<NearAsteroidsService>(NearAsteroidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
