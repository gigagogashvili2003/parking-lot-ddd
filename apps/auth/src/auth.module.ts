import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsModule } from '@app/nats';

@Module({
  imports: [NatsModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
