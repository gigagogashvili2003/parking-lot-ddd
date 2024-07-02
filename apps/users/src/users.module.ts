import { Logger, MiddlewareConsumer, Module, NestModule, Provider, RequestMethod } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { ProxyAllowMiddleware } from 'apps/gateway/src/application/middlewares';
import { UsersController } from './application/controllers';
import { RequestLoggerMiddleware } from '@app/common/middlewares';
import { CreateUserUsecase } from './application/usecases/create-user.usecase';
import { CREATE_USER_USECASE } from './constants';

const usecases: Provider[] = [{ provide: CREATE_USER_USECASE, useClass: CreateUserUsecase }];

@Module({
    imports: [ConfigModule.forRoot({ envFilePath: 'apps/users/.env' }), NatsModule],
    controllers: [UsersController],
    providers: [Logger, ...usecases],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequestLoggerMiddleware, ProxyAllowMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
