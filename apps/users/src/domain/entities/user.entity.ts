import { Entity } from '@app/common/abstraction';
import { IUserProps } from '../interfaces';
import { UUID } from '@app/common/types';
import { Email, FirstName, LastName } from '../value-objects';

export class UserEntity extends Entity<IUserProps> {
    public constructor(props: IUserProps, id?: UUID) {
        super(props, id);
    }

    public get firstName(): FirstName {
        return this.props.firstName;
    }

    public get lastName(): LastName {
        return this.props.lastName;
    }

    public get email(): Email {
        return this.props.email;
    }
}
