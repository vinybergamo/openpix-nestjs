import { OpenPixService } from './services/openpix.service';
import { WebhookService } from './services/webhook.service';
import { ChargeService } from './services/charge.service';

export const providers = [OpenPixService, WebhookService, ChargeService];
