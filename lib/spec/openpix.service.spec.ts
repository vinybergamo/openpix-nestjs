import { OpenPixService } from '../services/openpix.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModuleForTest } from '../constants';
import { WebhookService } from '../services/webhook.service';

describe('OpenpixService', () => {
  let service: OpenPixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModuleForTest],
      providers: [OpenPixService, WebhookService],
    }).compile();

    service = module.get<OpenPixService>(OpenPixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
