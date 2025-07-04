import { OpenPixService } from './services/openpix.service';
import { ChargeService } from './services/charge.service';
import { TransactionService } from './services/transaction.service';
import { RefundsService } from './services/refunds.service';

export const providers = [
  OpenPixService,
  ChargeService,
  TransactionService,
  RefundsService,
];
