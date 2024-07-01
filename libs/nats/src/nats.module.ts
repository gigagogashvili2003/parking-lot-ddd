import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { INatsOptions } from './interfaces';
import { natsProviders } from './providers';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [...natsProviders],
  exports: [...natsProviders],
})
export class NatsModule {
  public static register(options: INatsOptions[]): DynamicModule {
    const clients: ClientsModuleAsyncOptions = options.map((option) => ({
      name: option.name,
      useFactory: (configService: ConfigService) => {
        const host = configService.getOrThrow('NATS_HOST');
        const port = configService.getOrThrow('NATS_PORT');

        return {
          transport: Transport.NATS,
          options: {
            servers: [`nats://${host}:${port}`],
            queue: option.queue,
            name: option.name,
          },
        };
      },
      inject: [ConfigService],
    }));

    return {
      module: NatsModule,
      imports: [ClientsModule.registerAsync(clients)],
      exports: [ClientsModule],
    };
  }
}
