import { ICommand } from '@nestjs/cqrs';
import { CreateUserDto } from '../../schemas';

export class CreateUserCommand implements ICommand {
    public constructor(public readonly createUserDto: CreateUserDto) {}
}
