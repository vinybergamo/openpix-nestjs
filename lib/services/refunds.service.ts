import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { AXIOS_INSTANCE_TOKEN } from '../openpix.constants';
import { AxiosInstance } from 'axios';
import {
  RefundCreateBody,
  RefundCreateResponse,
} from '../interfaces/refunds-service.interface';

@Injectable()
export class RefundsService {
  private readonly logger = new Logger(RefundsService.name);

  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN)
    private readonly http: AxiosInstance,
  ) {}

  public async refund(body: RefundCreateBody) {
    try {
      const { data } = await this.http.post<RefundCreateResponse>(
        '/refund',
        body,
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error creating refund',
        error.response?.status || 500,
      );
    }
  }
}
