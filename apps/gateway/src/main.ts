import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger();
  const port = parseInt(configService.getOrThrow('SERVER_PORT'));

  await app.listen(port);
  logger.log(`Gateway started on port:${port}`);
}
bootstrap();
