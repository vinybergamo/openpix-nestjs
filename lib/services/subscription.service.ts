import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { SubscriptionCreateBody } from '../interfaces/subcription-service.interface';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(private readonly http: HttpService) {}

  public async get(globalId: string) {
    const { data } = await firstValueFrom(
      this.http.get(`/subscriptions/${globalId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );

    return data.subscription;
  }

  public async create(body: SubscriptionCreateBody) {
    const { data } = await firstValueFrom(
      this.http.post('/subscriptions', body).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );

    return data.subscription;
  }
}
