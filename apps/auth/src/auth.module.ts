import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { BrokerModule } from '@app/broker';

@Module({
  imports: [BrokerModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
