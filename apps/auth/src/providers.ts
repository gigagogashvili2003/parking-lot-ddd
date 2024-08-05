import { ArrayOfClients, ArrayOfControllers, ArrayOfProviders } from '@app/common/types';
import { SIGNUP_USER_USECASE, VALIDATE_TOKEN_USECASE } from './constants';
import { SignupUserUsecase, ValidateTokenUseCase } from './application/usecases';
import { AuthController } from './application/controllers';

export const controllers: ArrayOfControllers = [AuthController];
export const usecases: ArrayOfProviders = [
    { provide: VALIDATE_TOKEN_USECASE, useClass: ValidateTokenUseCase },
    { provide: SIGNUP_USER_USECASE, useClass: SignupUserUsecase },
];
export const clients: ArrayOfClients = [{ name: 'USERS_SERVICE', queue: 'users' }];
