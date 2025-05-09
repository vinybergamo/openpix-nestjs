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
  sandbox?: boolean;
}

export interface OpenPixModuleOptionsFactory {
  createOpenPixOptions(): Promise<OpenPixModuleOptions> | OpenPixModuleOptions;
}

export interface OpenPixModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<OpenPixModuleOptionsFactory>;
  useClass?: Type<OpenPixModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<OpenPixModuleOptions> | OpenPixModuleOptions;
  inject?: FactoryProvider['inject'];
  extraProviders?: Provider[];
  global?: boolean;
}
