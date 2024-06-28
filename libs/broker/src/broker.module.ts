import { Module } from '@nestjs/common';
import { brokerProviders } from './providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [...brokerProviders],
  exports: [...brokerProviders],
})
export class BrokerModule {}
