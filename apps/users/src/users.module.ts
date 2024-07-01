import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsModule } from '@app/nats';

@Module({
  imports: [NatsModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
