import { ArrayOfClients, ArrayOfControllers, ArrayOfProviders } from '@app/common/types';
import { VALIDATE_TOKEN_USECASE } from './constants';
import { ValidateTokenUseCase } from './application/usecases';
import { AuthController } from './application/controllers';

export const controllers: ArrayOfControllers = [AuthController];
export const usecases: ArrayOfProviders = [{ provide: VALIDATE_TOKEN_USECASE, useClass: ValidateTokenUseCase }];
export const clients: ArrayOfClients = [{ name: 'USERS_SERVICE', queue: 'users' }];
