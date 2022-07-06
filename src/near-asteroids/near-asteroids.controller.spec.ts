import { Test, TestingModule } from '@nestjs/testing';
import { NearAsteroidsController } from './near-asteroids.controller';
import { NearAsteroidsModule } from "./near-asteroids.module";

describe('NearAsteroidsController', () => {
  let controller: NearAsteroidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NearAsteroidsModule],
    }).compile();

    controller = module.get<NearAsteroidsController>(NearAsteroidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
