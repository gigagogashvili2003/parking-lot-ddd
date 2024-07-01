import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { NatsModule } from '@app/nats';

@Module({
  imports: [
    NatsModule.register([
      { name: 'AUTH_SERVICE', queue: 'auth' },
      { name: 'USERS_SERVICE', queue: 'users' },
    ]),
  ],
  controllers: [GatewayController],
  providers: [],
})
export class GatewayModule {}
