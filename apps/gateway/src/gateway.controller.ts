import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  public constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}
}
