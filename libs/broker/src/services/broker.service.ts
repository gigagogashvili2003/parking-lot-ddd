import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class BrokerService {
  public constructor(private readonly configService: ConfigService) {}

  public getBrokerOptions(queue?: string): MicroserviceOptions {
    const host = this.configService.getOrThrow('NATS_HOST');
    const port = this.configService.getOrThrow('NATS_PORT');

    return {
      transport: Transport.NATS,
      options: {
        servers: [`nats://${host}:${port}`],
        queue,
      },
    };
  }
}
