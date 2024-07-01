import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor() {}

  @Get()
  getHell(@Req() req) {
    console.log(req);
    return 'Hello from auth';
  }

  @Get('test')
  test() {
    return 'TEST';
  }
}
