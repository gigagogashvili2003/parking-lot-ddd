import { ArrayOfProviders } from '@app/common/types';
import { UserModel } from './infrastructure/models';
import { USER_REPOSITORY, UserRepository } from './infrastructure/repositories';
import { CreateUserCommand, CreateUserCommandHandler } from './application/commands/create-user';
import { CREATE_USER_USECASE } from './constants';
import { CreateUserUsecase } from './application/usecases';

export const usecases: ArrayOfProviders = [{ provide: CREATE_USER_USECASE, useClass: CreateUserUsecase }];
export const commands: ArrayOfProviders = [CreateUserCommand];
export const handlers: ArrayOfProviders = [CreateUserCommandHandler];
export const models = [UserModel];
export const repositories: ArrayOfProviders = [{ provide: USER_REPOSITORY, useClass: UserRepository }];
