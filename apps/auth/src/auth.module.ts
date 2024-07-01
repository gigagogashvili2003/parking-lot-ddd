import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './application/controllers';
import { ProxyAllowMiddleware } from 'apps/gateway/src/application/middlewares';
import { RequestLoggerMiddleware } from '@app/common/middlewares';
import {} from '@app/common';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: 'apps/auth/.env' }), NatsModule],
  controllers: [AuthController],
  providers: [Logger],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware, ProxyAllowMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
