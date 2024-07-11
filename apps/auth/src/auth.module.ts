import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './application/controllers';
import { ProxyAllowMiddleware } from 'apps/gateway/src/application/middlewares';
import { RequestLoggerMiddleware } from '@app/common/middlewares';
import {} from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { usecases } from './providers';

@Module({
    imports: [
        JwtModule.register({ global: true, secret: 'secret', signOptions: { expiresIn: '1d' } }),
        ConfigModule.forRoot({ envFilePath: 'apps/auth/.env' }),
        NatsModule.register([{ name: 'USERS_SERVICE', queue: 'users' }]),
    ],
    controllers: [AuthController],
    providers: [Logger, ...usecases],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequestLoggerMiddleware, ProxyAllowMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
