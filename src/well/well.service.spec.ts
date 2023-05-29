import { Test, TestingModule } from '@nestjs/testing';
import { WellService } from './well.service';

describe('WellService', () => {
  let service: WellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WellService],
    }).compile();

    service = module.get<WellService>(WellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
