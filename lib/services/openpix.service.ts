import { Injectable } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ChargeService } from './charge.service';
import { SubscriptionService } from './subscription.service';
import { CustomerService } from './customer.service';

@Injectable()
export class OpenPixService {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly chargeService: ChargeService,
    private readonly subscriptionService: SubscriptionService,
    private readonly customerService: CustomerService,
  ) {}

  public get webhook() {
    return this.webhookService;
  }

  public get charge() {
    return this.chargeService;
  }

  public get subscription() {
    return this.subscriptionService;
  }

  public get customer() {
    return this.customerService;
  }
}
