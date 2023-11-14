import { ChargeTypeEnum } from '../enum';
import { OptionalObject } from './common';
import { Customer } from './customer-service.interface';

export interface ChargeCreateBody {
  correlationID?: string;
  value: number;
  type?: ChargeTypeEnum;
  comment?: string;
  identifier?: string;
  expiresIn?: number;
  customer?: Customer;
  daysForDueDate?: number;
  daysAfterDueDate?: number;
  interests?: {
    value: number;
  };
  fines?: {
    value: number;
  };
  additionalInfo?: Array<OptionalObject<string>>;
  enableCashbackPercentage?: boolean;
  enableCashbackExclusivePercentage?: boolean;
}
