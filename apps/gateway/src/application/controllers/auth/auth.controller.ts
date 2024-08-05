import { ZodValidationPipe } from '@app/common/pipes';
import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignupUserDto, SignupUserSchema } from 'libs/shared/schemas';

const PREFIX = 'auth';

@Controller(PREFIX)
export class AuthController {
    public constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

    @Post('/signup')
    @UsePipes(new ZodValidationPipe(SignupUserSchema))
    public signup(@Body() dto: SignupUserDto) {
        return this.authClient.send('signup', dto);
    }
}
