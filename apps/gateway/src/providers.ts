import { ArrayOfClients, ArrayOfControllers } from '@app/common/types';
import { AuthController } from './application/controllers/auth';
import { UsersController } from './application/controllers/users';

export const controllers: ArrayOfControllers = [AuthController, UsersController];
export const clients: ArrayOfClients = [{ name: 'AUTH_SERVICE', queue: 'auth' }];
