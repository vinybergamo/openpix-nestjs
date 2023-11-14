import { ChargeService } from '../services/charge.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModuleForTest } from '../constants';

describe('ChargeService', () => {
  let service: ChargeService;
  let correlationId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModuleForTest],
      providers: [ChargeService],
    }).compile();

    service = module.get<ChargeService>(ChargeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a charge', async () => {
    const result = await service.create({
      value: 100,
      comment: 'Charge created by Jest',
    });
    expect(result).toBeDefined();
    expect(result).toHaveProperty('correlationID');
    correlationId = result.correlationID;
  });

  it('should list all charges', async () => {
    const result = await service.list();
    expect(result).toBeDefined();
    expect(result).toHaveProperty('charges');
    expect(result.charges).toBeInstanceOf(Array);
  });

  it('should get one charge', async () => {
    const result = await service.get(correlationId);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('correlationID');
  });

  it('should list a charge refunds', async () => {
    const result = await service.refund(correlationId).list();
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
  });

  it('should delete a charge', async () => {
    expect(service.delete(correlationId)).resolves.toBeDefined();
  });
});
