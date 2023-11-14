import { WebhookService } from '../services/webhook.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModuleForTest } from '../constants';
import { WebhookEventEnum } from '../enum';

describe('WebhookService', () => {
  let service: WebhookService;
  let webhookId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModuleForTest],
      providers: [WebhookService],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a webhook', async () => {
    const webhook = await service.create({
      event: WebhookEventEnum.CHARGE_CREATED,
      name: 'Webhook created by Jest',
      isActive: true,
      url: 'https://webhook-create-test.vinybergamo.tech',
    });
    expect(webhook).toBeDefined();
    expect(webhook).toHaveProperty('id');
    webhookId = webhook.id;
  });

  it('should list webhooks', async () => {
    const webhooks = await service.list();
    expect(webhooks).toBeDefined();
    expect(webhooks).toHaveProperty('webhooks');
    expect(webhooks.webhooks).toBeInstanceOf(Array);
  });

  it('should delete a webhook', () => {
    expect(service.delete(webhookId)).resolves.toBeDefined();
  });
});
