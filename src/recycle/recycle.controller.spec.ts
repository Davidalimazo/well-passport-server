import { Test, TestingModule } from '@nestjs/testing';
import { RecycleController } from './recycle.controller';

describe('RecycleController', () => {
  let controller: RecycleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecycleController],
    }).compile();

    controller = module.get<RecycleController>(RecycleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
