import { WebhookEventEnum } from '../enum';
import { OptionalObject } from './common';

export interface WebhookCreateBody extends OptionalObject<any> {
  name: string;
  url: string;
  isActive: boolean;
  event: WebhookEventEnum;
}
