import { Logger, MiddlewareConsumer, Module, OnModuleInit, RequestMethod } from '@nestjs/common';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './application/controllers';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commands, handlers, models, repositories, usecases } from './providers';
import { DbModule } from '@app/db';
import { client as eventStore } from '@app/eventstore-db';
import { streamNameFilter } from '@eventstore/db-client';
import { RequestLoggerMiddleware } from '@app/common/middlewares';
import { ProxyAllowMiddleware } from 'apps/gateway/src/application/middlewares';

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
export class UsersModule implements OnModuleInit {
    public onModuleInit() {
        this.startBackgroundSubscription();
    }

    private startBackgroundSubscription() {
        (async (): Promise<void> => {
            await this.subscribeToAllStorageEvents();
        })();
    }

    private async subscribeToAllStorageEvents() {
        const subscription = eventStore.subscribeToAll({
            filter: streamNameFilter({ prefixes: ['users-stream'] }),
        });

        for await (const resolvedEvent of subscription) {
            console.log(`Received event ${resolvedEvent.event?.revision}@${resolvedEvent.event?.streamId}`);
            const data: any = resolvedEvent.event.data;
            console.log('data:', data);
        }
    }

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequestLoggerMiddleware, ProxyAllowMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
