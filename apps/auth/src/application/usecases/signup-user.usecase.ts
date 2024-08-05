import { UseCase } from '@app/common/interfaces';
import { ConflictException, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { User } from 'apps/users/src/domain';
import { UserMapper } from 'apps/users/src/mappers';
import { UserWithEmailAlreadyExistsException } from 'libs/shared/exceptions';
import { SignupUserDto } from 'libs/shared/schemas';
import { firstValueFrom, map } from 'rxjs';

export class SignupUserUsecase implements UseCase<SignupUserDto, any> {
    public constructor(
        @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
        private readonly commandBus: CommandBus,
    ) {}

    public async execute(request: SignupUserDto) {
        const { email } = request;

        try {
            const userExistsWithEmail: User = await firstValueFrom(
                this.usersClient
                    .send('find-user', { email })
                    .pipe(map((user) => user && UserMapper.persistenceToEntity(user))),
            );

            if (userExistsWithEmail) {
                throw new UserWithEmailAlreadyExistsException(email);
            }

            console.log(userExistsWithEmail instanceof User);

            return userExistsWithEmail;
        } catch (err) {
            throw new RpcException(err);
        }
    }
}
