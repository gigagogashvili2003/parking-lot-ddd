import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { natsProviders } from './providers';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [...natsProviders],
  exports: [...natsProviders],
})
export class NatsModule {}
