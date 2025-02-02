import { Injectable } from '@nestjs/common';
import { ChargeService } from './charge.service';

@Injectable()
export class OpenPixService {
  constructor(private readonly chargeService: ChargeService) {}

  get charge(): ChargeService {
    return this.chargeService;
  }
}
