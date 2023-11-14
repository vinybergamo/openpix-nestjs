import { Injectable } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Injectable()
export class OpenPixService {
  constructor(private readonly webhookService: WebhookService) {}

  public get webhook() {
    return this.webhookService;
  }
}
