import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../schemas';
import { UseCase } from '@app/common/interfaces';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user';

@Injectable()
export class CreateUserUsecase implements UseCase<CreateUserDto, any> {
    public constructor(private readonly commandBus: CommandBus) {}

    public execute(request: CreateUserDto) {
        const createUserCommand = new CreateUserCommand(request);
        return this.commandBus.execute(createUserCommand);
    }
}
