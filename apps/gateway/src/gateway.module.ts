import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware, ProxyAllowMiddleware } from './application/middlewares';
import { RequestLoggerMiddleware } from '@app/common/middlewares';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: 'apps/gateway/.env' }),
        JwtModule.register({ global: true, secret: 'secret', signOptions: { expiresIn: '1d' } }),
        NatsModule.register([
            { name: 'AUTH_SERVICE', queue: 'auth' },
            { name: 'USERS_SERVICE', queue: 'users' },
        ]),
    ],
    controllers: [],
    providers: [Logger],
})
export class GatewayModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequestLoggerMiddleware, ProxyAllowMiddleware, AuthMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
