import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ChargeCreateBody } from '../interfaces';
import { v4 as uuid } from 'uuid';
import { AxiosError, AxiosInstance } from 'axios';
import { ChargeStatusEnum } from '../enum';
import { AXIOS_INSTANCE_TOKEN } from '../openpix.constants';

@Injectable()
export class ChargeService {
  private readonly logger = new Logger(ChargeService.name);

  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN)
    private readonly http: AxiosInstance,
  ) {}

  public async list(params?: {
    start?: Date;
    end?: Date;
    status?: ChargeStatusEnum;
  }) {
    const { data } = await this.http
      .get('/charge', {
        params,
      })
      .catch((error: AxiosError) => {
        throw new HttpException(error.response.data, error.response.status);
      });

    return data;
  }

  public async get(correlationId: string) {
    const { data } = await this.http
      .get(`/charge/${correlationId}`)
      .catch((error: AxiosError) => {
        throw new HttpException(error.response.data, error.response.status);
      });
    return data.charge;
  }

  public async create(
    body: ChargeCreateBody,
    params?: {
      return_existing?: boolean;
    },
  ) {
    const correlationID = body.correlationID || uuid();

    const { data } = await this.http
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
      .catch((error: AxiosError) => {
        throw new HttpException(error.response.data, error.response.status);
      });
    return data.charge;
  }

  public async delete(correlationId: string) {
    const { data } = await this.http
      .delete(`/charge/${correlationId}`)
      .catch((error: AxiosError) => {
        throw new HttpException(error.response.data, error.response.status);
      });
    return data;
  }
}
