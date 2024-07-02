import { CreateUserDto } from '../application/schemas';
import { User } from '../domain/entities';
import { Email, FirstName, LastName, Password } from '../domain/value-objects';
import { UserModel } from '../infrastructure/models';

export class UserMapper {
    public static toEntity(dto: CreateUserDto) {
        const firstName = new FirstName({ value: dto.firstName });
        const lastName = new LastName({ value: dto.firstName });
        const email = new Email({ value: dto.lastName });
        const password = new Password({ value: dto.password });

        return new User({ firstName, lastName, email, password });
    }

    public static toPersistence(entity: User) {
        const model = new UserModel();
        model.firstName = entity.firstName.value;
        model.lastName = entity.lastName.value;
        model.email = entity.email.value;
        model.password = entity.password.value;
        return model;
    }
}
