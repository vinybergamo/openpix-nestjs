import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CustomerCreateBody } from '../interfaces';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private readonly httpService: HttpService) {}

  public async list() {
    const { data } = await firstValueFrom(
      this.httpService.get('/customer').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );

    return data;
  }

  public async get(correlationID: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`/customer/${correlationID}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );

    return data;
  }

  public async create(body: CustomerCreateBody) {
    const { data } = await firstValueFrom(
      this.httpService.post('/customer', body).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );

    return data.customer;
  }
}
