import { AxiosHeaderValue } from 'axios';

export type OptionalObject<T> = {
  [key: string]: T;
};

export interface HttpHeaders {
  Authorization: string;

  [key: string]: AxiosHeaderValue;
}
