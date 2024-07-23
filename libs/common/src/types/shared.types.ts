import { INatsOptions } from '@app/nats/interfaces';
import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export type ArrayOfProviders = Array<Provider>;
export type ArrayOfControllers = ModuleMetadata['controllers'];
export type ArrayOfClients = Array<INatsOptions>;
