import { SubscriptionService } from '../services/subscription.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModuleForTest } from '../constants';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let globalId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModuleForTest],
      providers: [SubscriptionService],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a subscription', async () => {
    const result = await service.create({
      customer: {
        name: 'Customer create by Jest',
        email: 'customer@jest.test',
      },
      value: 1000,
    });

    globalId = result.globalID;
    expect(result).toBeDefined();
    expect(result).toHaveProperty('globalID');
  });

  it('should get one subscription', async () => {
    const result = await service.get(globalId);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('globalID');
  });
});
