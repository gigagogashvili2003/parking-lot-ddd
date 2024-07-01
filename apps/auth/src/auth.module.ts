import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'apps/auth/.env' }),
    NatsModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
