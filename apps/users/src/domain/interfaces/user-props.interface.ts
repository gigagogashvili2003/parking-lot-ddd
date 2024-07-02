import { Email, FirstName, LastName, Password } from '../value-objects';

export interface IUserProps {
    firstName: FirstName;
    lastName: LastName;
    email: Email;
    password: Password;
}
