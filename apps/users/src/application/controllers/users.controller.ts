import { Controller, Get } from '@nestjs/common';

@Controller()
export class UsersController {
  constructor() {}

  @Get()
  getHell() {
    return 'Hello from user';
  }
}
