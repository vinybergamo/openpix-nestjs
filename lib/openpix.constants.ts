export const OPENPIX_MODULE_ID = 'OPENPIX_MODULE_ID';
export const OPENPIX_MODULE_OPTIONS = 'OPENPIX_MODULE_OPTIONS';
export const OPENPIX_INSTANCE_TOKEN = 'OPENPIX_INSTANCE_TOKEN';
export const AXIOS_INSTANCE_TOKEN = 'AXIOS_INSTANCE_TOKEN';
export const OPENPIX_BASE_URL = (isSandbox: boolean) =>
  isSandbox
    ? 'https://api.woovi-sandbox.com/api/'
    : 'https://api.openpix.com.br/api/';
