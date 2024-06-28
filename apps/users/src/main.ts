import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { BrokerService } from '@app/broker/services';
import { BROKER_SERVICE } from '@app/broker/constants';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const brokerService = app.get<BrokerService>(BROKER_SERVICE);

  app.connectMicroservice<MicroserviceOptions>(
    brokerService.getBrokerOptions('users'),
  );

  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
