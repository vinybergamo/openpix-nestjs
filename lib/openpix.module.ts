import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenPixService } from './services/openpix.service';
import { providers } from './providers';
import {
  OpenPixModuleAsyncOptions,
  OpenPixModuleOptions,
  OpenPixOptionsFactory,
} from './interfaces';
import { OPENPIX_MODULE_ID, OPENPIX_MODULE_OPTIONS } from './openpix.constants';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Module({})
export class OpenPixModule {
  static register(options: OpenPixModuleOptions): DynamicModule {
    const { appId, version, global } = options;
    return {
      module: OpenPixModule,
      global: global,
      imports: [
        HttpModule.register({
          baseURL: `https://api.openpix.com.br/api/${version ?? 'v1'}`,
          headers: {
            Authorization: `${appId}`,
            'Content-Type': 'application/json',
          },
        }),
      ],
      providers: [
        ...providers,
        {
          provide: OPENPIX_MODULE_ID,
          useValue: randomStringGenerator(),
        },
      ],
      exports: [OpenPixService],
    };
  }

  static registerAsync(options: OpenPixModuleAsyncOptions): DynamicModule {
    return {
      module: OpenPixModule,
      global: options.global,
      imports: [
        HttpModule.registerAsync({
          useFactory: async (openPixOptions: OpenPixModuleOptions) => {
            const { appId, version } = openPixOptions;
            return {
              baseURL: `https://api.openpix.com.br/api/${version ?? 'v1'}`,
              headers: {
                Authorization: `${appId}`,
                'Content-Type': 'application/json',
              },
            };
          },
        }),
      ],
      providers: [
        ...this.createAsyncProviders(options),
        ...providers,
        {
          provide: OPENPIX_MODULE_ID,
          useValue: randomStringGenerator(),
        },
      ],
      exports: [OpenPixService],
    };
  }

  private static createAsyncProviders(
    options: OpenPixModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: OPENPIX_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    return [
      {
        provide: OPENPIX_MODULE_OPTIONS,
        useFactory: async (optionsFactory: OpenPixOptionsFactory) =>
          await optionsFactory.createOpenPixOptions(),
        inject: [options.useExisting || options.useClass],
      },
      ...(options.useClass
        ? [
            {
              provide: options.useClass,
              useClass: options.useClass,
            },
          ]
        : []),
    ];
  }
}
