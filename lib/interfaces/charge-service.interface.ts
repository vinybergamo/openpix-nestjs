import { ChargeTypeEnum } from '../enum';
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
  additionalInfo?: Array<{
    key: string;
    value: string;
  }>;
  enableCashbackPercentage?: boolean;
  enableCashbackExclusivePercentage?: boolean;
}

export interface ChargeRefundCreateBody {
  correlationID: string;
  value?: number;
  comment?: string;
}
