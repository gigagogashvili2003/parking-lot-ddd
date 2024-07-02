import { Entity } from '@app/common/abstracts';
import { IUserProps } from '../interfaces';
import { UUID } from '@app/common/types';
import { Email, FirstName, LastName, Password } from '../value-objects';

export class User extends Entity<IUserProps> {
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

    public get password(): Password {
        return this.props.password;
    }
}
