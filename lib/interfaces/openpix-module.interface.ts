import {
  FactoryProvider,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';

export interface OpenPixModuleOptions {
  appId?: string;
  version?: 'v1';
  global?: boolean;
}

export interface OpenPixOptionsFactory {
  createOpenPixOptions(): Promise<OpenPixModuleOptions> | OpenPixModuleOptions;
}

export interface OpenPixModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<OpenPixOptionsFactory>;
  useClass?: Type<OpenPixOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<OpenPixModuleOptions> | OpenPixModuleOptions;
  inject?: FactoryProvider['inject'];
  extraProviders?: Provider[];
  global?: boolean;
}
