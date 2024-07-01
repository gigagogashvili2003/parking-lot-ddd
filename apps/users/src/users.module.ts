import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { ProxyAllowMiddleware } from 'apps/gateway/src/application/middlewares';
import { UsersController } from './application/controllers';
import { RequestLoggerMiddleware } from '@app/common/middlewares';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: 'apps/users/.env' }), NatsModule],
  controllers: [UsersController],
  providers: [Logger],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware, ProxyAllowMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
