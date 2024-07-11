import { ArrayOfProviders } from '@app/common/types';
import { UserModel } from './infrastructure/models';
import { USER_REPOSITORY, UserRepository } from './infrastructure/repositories';
import { CreateUserCommand, CreateUserCommandHandler } from './application/commands/create-user';
import { CREATE_USER_USECASE, GET_USER_USECASE } from './constants';
import { CreateUserUsecase, GetUserUsecase } from './application/usecases';
import { GetUerQuery, GetUserQueryHandler } from './application';

export const usecases: ArrayOfProviders = [
    { provide: CREATE_USER_USECASE, useClass: CreateUserUsecase },
    { provide: GET_USER_USECASE, useClass: GetUserUsecase },
];
export const commands: ArrayOfProviders = [CreateUserCommand];
export const commandHandlers: ArrayOfProviders = [CreateUserCommandHandler];
export const queries: ArrayOfProviders = [GetUerQuery];
export const queryHandlers: ArrayOfProviders = [GetUserQueryHandler];
export const models = [UserModel];
export const repositories: ArrayOfProviders = [{ provide: USER_REPOSITORY, useClass: UserRepository }];
