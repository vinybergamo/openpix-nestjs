import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosInstance } from 'axios';
import { AXIOS_INSTANCE_TOKEN } from '../openpix.constants';

@Injectable()
export class TransactionService {
  public async;
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN)
    private readonly http: AxiosInstance,
  ) {}

  public async get(transactionId: string) {
    const { data } = await this.http
      .get(`/transaction/${transactionId}`)
      .catch((error: AxiosError) => {
        throw new HttpException(error.response.data, error.response.status);
      });

    return data.transaction;
  }

  public async list(params?: {
    start?: Date;
    end?: Date;
    charge?: string;
    pixQrCode?: string;
    withdrawal?: string;
  }) {
    const { data } = await this.http
      .get('/transactions', { params })
      .catch((error: AxiosError) => {
        throw new HttpException(error.response.data, error.response.status);
      });
    return data;
  }
}
