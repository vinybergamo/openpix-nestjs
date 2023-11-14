import { Injectable } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ChargeService } from './charge.service';

@Injectable()
export class OpenPixService {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly chargeService: ChargeService,
  ) {}

  public get webhook() {
    return this.webhookService;
  }

  public get charge() {
    return this.chargeService;
  }
}
