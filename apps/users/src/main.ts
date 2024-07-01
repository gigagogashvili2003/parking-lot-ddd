import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NatsService } from '@app/nats/services';
import { NATS_SERVICE } from '@app/nats/constants';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const brokerService = app.get<NatsService>(NATS_SERVICE);

  app.connectMicroservice<MicroserviceOptions>(
    brokerService.getBrokerOptions('users'),
  );

  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
