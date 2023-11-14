import { CustomerService } from '../services/customer.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModuleForTest } from '../constants';

describe('CustomerService', () => {
  let service: CustomerService;
  let customerId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModuleForTest],
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer', async () => {
    const result = await service.create({
      name: 'Customer create by Jest',
      email: 'customer@jest.test',
    });
    expect(result).toBeDefined();
    expect(result.correlationID).toBeDefined();
    customerId = result.correlationID;
  });

  it('should be list customers', async () => {
    const result = await service.list();
    expect(result).toBeDefined();
    expect(result.customers).toBeDefined();
    expect(result.customers).toBeInstanceOf(Array);
  });

  it('should get one customer', () => {
    expect(service.get(customerId)).toBeDefined();
  });
});
