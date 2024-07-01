import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  public constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  @Get()
  getHell() {
    return 'From Gateway';
  }

  @Get('test')
  test() {
    return 'TEST';
  }
}
