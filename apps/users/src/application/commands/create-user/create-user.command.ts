import { CreateUserDto } from '../../schemas';

export class CreateUserCommand {
    public constructor(public readonly createUserDto: CreateUserDto) {}
}
