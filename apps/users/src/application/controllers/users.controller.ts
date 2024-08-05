import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { CreateUserUsecase, GetUserUsecase } from '../usecases';
import { CREATE_USER_USECASE, GET_USER_USECASE } from '../../constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TGetUser } from '../types';
import { ZodValidationPipe } from '@app/common/pipes';
import { CreateUserDto, CreateUserSchema } from '../schemas';

@Controller()
export class UsersController {
    constructor(
        @Inject(CREATE_USER_USECASE) private readonly createUserUsecase: CreateUserUsecase,
        @Inject(GET_USER_USECASE) private readonly getUserUsecase: GetUserUsecase,
    ) {}

    @MessagePattern('find-user')
    public findbyId(@Payload() payload: TGetUser) {
        return this.getUserUsecase.execute(payload);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(CreateUserSchema))
    public async create(@Body() createUserDto: CreateUserDto) {
        return this.createUserUsecase.execute(createUserDto);
    }
}
