import { DynamicModule, Module, Provider } from '@nestjs/common';
import { OpenPixService } from './services/openpix.service';
import { providers } from './providers';
import {
  OpenPixModuleAsyncOptions,
  OpenPixModuleOptions,
  OpenPixModuleOptionsFactory,
} from './interfaces';
import {
  AXIOS_INSTANCE_TOKEN,
  OPENPIX_BASE_URL,
  OPENPIX_MODULE_ID,
  OPENPIX_MODULE_OPTIONS,
} from './openpix.constants';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import Axios from 'axios';

@Module({})
export class OpenPixModule {
  static register(options: OpenPixModuleOptions): DynamicModule {
    const { appId, version, global } = options;
    return {
      module: OpenPixModule,
      global: global,
      providers: [
        ...providers,
        {
          provide: OPENPIX_MODULE_ID,
          useValue: randomStringGenerator(),
        },
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: this.createAxiosInstance(OPENPIX_BASE_URL, appId, version),
        },
      ],
      exports: [OpenPixService],
    };
  }

  static registerAsync(
    moduleOptions: OpenPixModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: OpenPixModule,
      global: moduleOptions.global,
      imports: moduleOptions.imports,
      providers: [
        ...this.createAsyncProviders(moduleOptions),
        ...providers,
        {
          provide: OPENPIX_MODULE_ID,
          useValue: randomStringGenerator(),
        },
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useFactory: (options: OpenPixModuleOptions) =>
            this.createAxiosInstance(
              OPENPIX_BASE_URL,
              options.appId,
              options.version,
            ),
          inject: [OPENPIX_MODULE_OPTIONS],
        },
      ],
      exports: [OpenPixService],
    };
  }

  private static createAxiosInstance(
    url: string,
    appId: string,
    version = 'v1',
  ) {
    return Axios.create({
      baseURL: `${url}${version}`,
      headers: {
        Authorization: `${appId}`,
        'Content-Type': 'application/json',
      },
    });
  }

  private static createAsyncProviders(
    options: OpenPixModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: OpenPixModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: OPENPIX_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: OPENPIX_MODULE_OPTIONS,
      useFactory: async (optionsFactory: OpenPixModuleOptionsFactory) =>
        optionsFactory.createOpenPixOptions(),
      inject: options.inject || [],
    };
  }
}
