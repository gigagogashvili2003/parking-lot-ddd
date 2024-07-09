import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'apps/users/src/infrastructure/repositories';
import { IUserRepository } from 'apps/users/src/infrastructure/interfaces';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    public constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

    public execute(command: CreateUserCommand): Promise<any> {
        const { createUserDto } = command;
        return Promise.resolve(createUserDto);
    }
}
