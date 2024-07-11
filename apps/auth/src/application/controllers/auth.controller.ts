import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
    constructor() {}

    @Get()
    ping() {
        return 'pong';
    }

    @Get('test')
    test() {
        return 'TEST';
    }
}
