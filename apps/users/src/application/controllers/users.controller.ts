import { ZodValidationPipe } from '@app/common/pipes';
import { Body, Controller, Get, Inject, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto, CreateUserSchema } from '../schemas';
import { CreateUserUsecase, GetUserUsecase } from '../usecases';
import { CREATE_USER_USECASE, GET_USER_USECASE } from '../../constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
    constructor(
        @Inject(CREATE_USER_USECASE) private readonly createUserUsecase: CreateUserUsecase,
        @Inject(GET_USER_USECASE) private readonly getUserUsecase: GetUserUsecase,
    ) {}

    @Get()
    public ping() {
        return 'pong';
    }

    @MessagePattern('find-user-by-id')
    public findbyId(@Payload() id: string) {
        return this.getUserUsecase.execute(id);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(CreateUserSchema))
    public async create(@Body() createUserDto: CreateUserDto) {
        return this.createUserUsecase.execute(createUserDto);
    }
}
