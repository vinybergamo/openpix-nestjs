import { Customer } from './customer-service.interface';
import { OptionalObject } from './common';
import { ChargeTypeEnum } from '../enum';

export interface SubscriptionCreateBody {
  customer: Customer;
  value: number;
  comment?: string;
  additionalInfo?: Array<OptionalObject<string>>;
  dayGenerateCharge?: number;
  chargeType?: ChargeTypeEnum;
  dayDue?: number;
}
