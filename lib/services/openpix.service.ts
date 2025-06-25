import { Injectable } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { TransactionService } from './transaction.service';
import { RefundsService } from './refunds.service';

@Injectable()
export class OpenPixService {
  constructor(
    private readonly chargeService: ChargeService,
    private readonly transactionService: TransactionService,
    private readonly refundsService: RefundsService,
  ) {}

  get charge(): ChargeService {
    return this.chargeService;
  }

  get transaction(): TransactionService {
    return this.transactionService;
  }
}
