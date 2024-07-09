import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'apps/users/src/infrastructure/repositories';
import { IUserRepository } from 'apps/users/src/infrastructure';
import { User } from 'apps/users/src/domain';
import { UserMapper } from 'apps/users/src/mappers';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    public constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

    public async execute(command: CreateUserCommand): Promise<any> {
        const { createUserDto } = command;

        const user = new User(await UserMapper.toEntity(createUserDto));
        const newUser = await this.userRepository.createOne(UserMapper.toPersistence(user));

        return { user, newUser };
    }
}
