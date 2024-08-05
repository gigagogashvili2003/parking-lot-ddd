import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { ProxyAllowMiddleware } from 'apps/gateway/src/application/middlewares';
import { RequestLoggerMiddleware } from '@app/common/middlewares';
import {} from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { clients, controllers, usecases } from './providers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        CqrsModule,
        JwtModule.register({ global: true, secret: 'secret', signOptions: { expiresIn: '1d' } }),
        ConfigModule.forRoot({ envFilePath: 'apps/auth/.env' }),
        NatsModule.register(clients),
    ],
    controllers: [...controllers],
    providers: [Logger, ...usecases],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequestLoggerMiddleware, ProxyAllowMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
