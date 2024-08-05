import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware, ProxyAllowMiddleware } from './application/middlewares';
import { RequestLoggerMiddleware } from '@app/common/middlewares';
import { clients, controllers } from './providers';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: 'apps/gateway/.env' }), NatsModule.register(clients)],
    controllers: [...controllers],
    providers: [Logger],
})
export class GatewayModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
        consumer
            .apply(AuthMiddleware)
            .exclude({ path: 'auth/signup', method: RequestMethod.POST })
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
