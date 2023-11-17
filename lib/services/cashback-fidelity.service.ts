import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class CashbackFidelityService {
  private readonly logger = new Logger(CashbackFidelityService.name);

  constructor(private readonly httpService: HttpService) {}

  public async get(taxID: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`/cashback-fidelity/balance/${taxID}`).pipe(
        catchError(error => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );

    return data;
  }

  public async create(taxID: string, value: number) {
    const { data } = await firstValueFrom(
      this.httpService.post(`/cashback-fidelity`, { value, taxID }).pipe(
        catchError(error => {
          this.logger.error(error.response.data);
          throw error.response.data;
        }),
      ),
    );

    return data;
  }
}
