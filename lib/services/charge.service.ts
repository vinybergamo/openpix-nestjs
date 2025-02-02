import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ChargeCreateBody } from '../interfaces';
import { v4 as uuid } from 'uuid';
import { AxiosInstance } from 'axios';
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
    try {
      const { data } = await this.http.get('/charge', {
        params,
      });
      return data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  public async get(correlationId: string) {
    try {
      const { data } = await this.http.get(`/charge/${correlationId}`);
      return data.charge;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  public async create(
    body: ChargeCreateBody,
    params?: {
      return_existing?: boolean;
    },
  ) {
    const correlationID = body.correlationID || uuid();

    try {
      const { data } = await this.http.post(
        '/charge',
        {
          ...body,
          correlationID,
        },
        {
          params,
        },
      );
      return data.charge;
      return data.charge;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  public async delete(correlationId: string) {
    try {
      const { data } = await this.http.delete(`/charge/${correlationId}`);
      return data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
