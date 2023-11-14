import { Module } from '@nestjs/common';
import { OpenpixRegisterOption } from './interfaces';
import { HttpModule } from '@nestjs/axios';
import { OpenPixService } from './services/openpix.service';
import { providers } from './providers';

@Module({})
export class OpenPixModule {
  static register({ appId, version = 'v1' }: OpenpixRegisterOption) {
    return {
      module: OpenPixModule,
      imports: [
        HttpModule.register({
          baseURL: `https://api.openpix.com.br/api/${version}`,
          headers: {
            Authorization: `${appId}`,
            'Content-Type': 'application/json',
          },
        }),
      ],
      providers,
      exports: [OpenPixService],
    };
  }
}
