import { Test, TestingModule } from '@nestjs/testing';
import { RecycleService } from './recycle.service';

describe('RecycleService', () => {
  let service: RecycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecycleService],
    }).compile();

    service = module.get<RecycleService>(RecycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
