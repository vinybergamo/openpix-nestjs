import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { WebhookCreateBody } from '../interfaces';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly http: HttpService) {}

  public async list(params?: { url?: string }) {
    const { data } = await firstValueFrom(
      this.http
        .get('/webhook', {
          params,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error.response.data;
          }),
        ),
    );
    return data;
  }

  public async create(body: WebhookCreateBody) {
    const { data } = await firstValueFrom(
      this.http
        .post('/webhook', {
          webhook: {
            ...body,
            event: `OPENPIX:${body.event}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error.response.data;
          }),
        ),
    );
    return data.webhook;
  }

  public async delete(webhookId: string) {
    const { data } = await firstValueFrom(
      this.http.delete(`/webhook/${webhookId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );
    this.logger.log(data);
    return data;
  }
}
