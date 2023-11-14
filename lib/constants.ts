import { HttpModule } from '@nestjs/axios';
import { config } from 'dotenv';

config();

export const HttpModuleForTest = HttpModule.register({
  baseURL: `https://api.openpix.com.br/api/v1`,
  headers: {
    Authorization: `${process.env.TEST_APP_ID}`,
    'Content-Type': 'application/json',
  },
});
