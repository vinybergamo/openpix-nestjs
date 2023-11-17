import { OpenPixService } from './services/openpix.service';
import { WebhookService } from './services/webhook.service';
import { ChargeService } from './services/charge.service';
import { CustomerService } from './services/customer.service';
import { SubscriptionService } from './services/subscription.service';
import { TransactionService } from './services/transaction.service';
import { CashbackFidelityService } from './services/cashback-fidelity.service';

export const providers = [
  OpenPixService,
  WebhookService,
  ChargeService,
  CustomerService,
  SubscriptionService,
  TransactionService,
  CashbackFidelityService,
];
