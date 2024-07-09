import { Logger, Module } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './application/controllers';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commands, handlers, models, repositories, usecases } from './providers';
import { DbModule } from '@app/db';

@Module({
    imports: [
        TypeOrmModule.forFeature(models),
        ConfigModule.forRoot({ envFilePath: 'apps/users/.env' }),
        DbModule,
        CqrsModule,
        NatsModule,
    ],
    controllers: [UsersController],
    providers: [Logger, ...repositories, ...usecases, ...commands, ...handlers],
})
export class UsersModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(RequestLoggerMiddleware, ProxyAllowMiddleware)
    //         .forRoutes({ path: '*', method: RequestMethod.ALL });
    // }
}
