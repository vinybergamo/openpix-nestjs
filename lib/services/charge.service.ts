import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ChargeCreateBody } from '../interfaces';
import { v4 as uuid } from 'uuid';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ChargeStatusEnum } from '../enum';

@Injectable()
export class ChargeService {
  private readonly logger = new Logger(ChargeService.name);

  constructor(private readonly http: HttpService) {}

  public async list(params?: {
    start?: Date;
    end?: Date;
    status?: ChargeStatusEnum;
  }) {
    const { data } = await firstValueFrom(
      this.http
        .get('/charge', {
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

  public async get(correlationId: string) {
    const { data } = await firstValueFrom(
      this.http.get(`/charge/${correlationId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );
    return data.charge;
  }

  public async create(
    body: ChargeCreateBody,
    params?: {
      return_existing?: boolean;
    },
  ) {
    const correlationID = body.correlationID || uuid();

    const { data } = await firstValueFrom(
      this.http
        .post(
          '/charge',
          {
            ...body,
            correlationID,
          },
          {
            params,
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error.response.data;
          }),
        ),
    );
    return data.charge;
  }

  public async delete(correlationId: string) {
    const { data } = await firstValueFrom(
      this.http.delete(`/charge/${correlationId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );
    return data;
  }
}
