import { ArrayOfProviders } from '@app/common/types';
import { VALIDATE_TOKEN_USECASE } from './constants';
import { ValidateTokenUseCase } from './application/usecases';

export const usecases: ArrayOfProviders = [{ provide: VALIDATE_TOKEN_USECASE, useClass: ValidateTokenUseCase }];
