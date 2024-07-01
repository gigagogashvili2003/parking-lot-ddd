import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsModule } from '@app/nats';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'apps/users/.env' }),
    NatsModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
