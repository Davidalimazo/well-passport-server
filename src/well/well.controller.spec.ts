import { Test, TestingModule } from '@nestjs/testing';
import { WellController } from './well.controller';

describe('WellController', () => {
  let controller: WellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WellController],
    }).compile();

    controller = module.get<WellController>(WellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
