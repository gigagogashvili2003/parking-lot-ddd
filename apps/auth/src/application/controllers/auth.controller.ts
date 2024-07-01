import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor() {}

  @Get()
  getHell() {
    return 'Hello from auth';
  }

  @Get('test')
  test() {
    return 'TEST';
  }
}
