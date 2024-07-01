import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NatsService } from '@app/nats/services';
import { NATS_SERVICE } from '@app/nats/constants';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const brokerService = app.get<NatsService>(NATS_SERVICE);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger();
  const port = parseInt(configService.getOrThrow('SERVER_PORT'));

  app.connectMicroservice<MicroserviceOptions>(brokerService.getBrokerOptions('AUTH_SERVICE', 'auth'));

  const config = new DocumentBuilder()
    .setTitle('Auth service')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(port);
  logger.log(`Auth service started on port:${port}`);
}
bootstrap();
