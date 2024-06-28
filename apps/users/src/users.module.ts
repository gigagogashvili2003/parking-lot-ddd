import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BrokerModule } from '@app/broker';

@Module({
  imports: [BrokerModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
