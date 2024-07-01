import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NatsService } from '@app/nats/services';
import { NATS_SERVICE } from '@app/nats/constants';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const brokerService = app.get<NatsService>(NATS_SERVICE);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger();
  const port = parseInt(configService.getOrThrow('SERVER_PORT'));

  const config = new DocumentBuilder()
    .setTitle('Users service')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice<MicroserviceOptions>(brokerService.getBrokerOptions('USERS_SERVICE', 'users'));

  await app.startAllMicroservices();
  await app.listen(port);
  logger.log(`Users service started on port:${port}`);
}
bootstrap();
