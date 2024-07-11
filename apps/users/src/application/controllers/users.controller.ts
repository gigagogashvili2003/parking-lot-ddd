import { ZodValidationPipe } from '@app/common/pipes';
import { Body, Controller, Get, Inject, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto, CreateUserSchema } from '../schemas';
import { CreateUserUsecase } from '../usecases';
import { CREATE_USER_USECASE } from '../../constants';

@Controller()
export class UsersController {
    constructor(@Inject(CREATE_USER_USECASE) private readonly createUserUsecase: CreateUserUsecase) {}

    @Get()
    public ping() {
        return 'pong';
    }

    @Post()
    @UsePipes(new ZodValidationPipe(CreateUserSchema))
    public async create(@Body() createUserDto: CreateUserDto) {
        return this.createUserUsecase.execute(createUserDto);
    }
}
