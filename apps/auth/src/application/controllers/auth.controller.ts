import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VALIDATE_TOKEN_USECASE } from '../../constants';
import { ValidateTokenUseCase } from '../usecases';

@Controller()
export class AuthController {
    constructor(@Inject(VALIDATE_TOKEN_USECASE) private readonly validateTokenUsecase: ValidateTokenUseCase) {}

    @MessagePattern('validate-token')
    public validateToken(@Payload() token: string) {
        return this.validateTokenUsecase.execute(token);
    }
}
