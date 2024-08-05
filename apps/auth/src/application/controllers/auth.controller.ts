import { Controller, Inject, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SIGNUP_USER_USECASE, VALIDATE_TOKEN_USECASE } from '../../constants';
import { SignupUserUsecase, ValidateTokenUseCase } from '../usecases';
import { SignupUserDto } from 'libs/shared/schemas';
import { RpcExceptionFilter } from '@app/common/filters';

@UseFilters(new RpcExceptionFilter())
@Controller()
export class AuthController {
    constructor(
        @Inject(VALIDATE_TOKEN_USECASE) private readonly validateTokenUsecase: ValidateTokenUseCase,
        @Inject(SIGNUP_USER_USECASE) private readonly signupUserUsecase: SignupUserUsecase,
    ) {}

    @MessagePattern('signup')
    public async signup(@Payload() dto: SignupUserDto) {
        return this.signupUserUsecase.execute(dto);
    }

    @MessagePattern('validate-token')
    public validateToken(@Payload() token: string) {
        return this.validateTokenUsecase.execute(token);
    }
}
