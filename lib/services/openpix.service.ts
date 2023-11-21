import { Injectable } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ChargeService } from './charge.service';
import { SubscriptionService } from './subscription.service';
import { CustomerService } from './customer.service';
import { TransactionService } from './transaction.service';
import { CashbackFidelityService } from './cashback-fidelity.service';
import { HttpService } from '@nestjs/axios';
import { HttpHeaders } from '../interfaces/common';

@Injectable()
export class OpenPixService {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly chargeService: ChargeService,
    private readonly subscriptionService: SubscriptionService,
    private readonly customerService: CustomerService,
    private readonly transactionService: TransactionService,
    private readonly cashbackFidelityService: CashbackFidelityService,
    private readonly httpService: HttpService,
  ) {}

  get webhook(): WebhookService {
    return this.webhookService;
  }

  get charge(): ChargeService {
    return this.chargeService;
  }

  get subscription(): SubscriptionService {
    return this.subscriptionService;
  }

  get customer(): CustomerService {
    return this.customerService;
  }

  get transaction(): TransactionService {
    return this.transactionService;
  }

  get cashbackFidelity(): CashbackFidelityService {
    return this.cashbackFidelityService;
  }

  public setHeaders(headers: HttpHeaders) {
    const openpixSerice = new OpenPixService(
      this.webhookService,
      this.chargeService,
      this.subscriptionService,
      this.customerService,
      this.transactionService,
      this.cashbackFidelityService,
      this.httpService,
    );

    openpixSerice.defineHaders(headers);

    return openpixSerice;
  }

  private defineHaders(headers: HttpHeaders) {
    this.httpService.axiosRef.defaults.headers = {
      ...this.httpService.axiosRef.defaults.headers,
      ...headers,
    };
  }
}
