import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { ProxyAllowMiddleware } from './application/middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'apps/gateway/.env' }),
    NatsModule.register([
      { name: 'AUTH_SERVICE', queue: 'auth' },
      { name: 'USERS_SERVICE', queue: 'users' },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProxyAllowMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
