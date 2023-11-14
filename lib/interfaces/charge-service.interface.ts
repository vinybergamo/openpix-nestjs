import { ChargeTypeEnum } from '../enum';
import { Customer, OptionalObject } from './common';

export interface ChargeCreateBody {
  correlationId?: string;
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
