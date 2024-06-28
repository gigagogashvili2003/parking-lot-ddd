import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { BrokerService } from '@app/broker/services/broker.service';
import { BROKER_SERVICE } from '@app/broker/constants';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const brokerService = app.get<BrokerService>(BROKER_SERVICE);

  app.connectMicroservice<MicroserviceOptions>(
    brokerService.getBrokerOptions('auth'),
  );

  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
