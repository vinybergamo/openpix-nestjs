import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class TransactionService {
  public async;
  private readonly logger = new Logger(TransactionService.name);

  constructor(private readonly http: HttpService) {}

  public async get(transactionId: string) {
    const { data } = await firstValueFrom(
      this.http.get(`/transaction/${transactionId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );

    return data.transaction;
  }

  public async list(params?: {
    start?: Date;
    end?: Date;
    charge?: string;
    pixQrCode?: string;
    withdrawal?: string;
  }) {
    const { data } = await firstValueFrom(
      this.http.get('/transactions', { params }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );

    return data;
  }
}
