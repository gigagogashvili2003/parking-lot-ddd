import { Injectable } from '@nestjs/common';
import { UseCase } from '@app/common/interfaces';
import { QueryBus } from '@nestjs/cqrs';
import { GetUerQuery } from '../queries';
import { TGetUser } from '../types';

@Injectable()
export class GetUserUsecase implements UseCase<TGetUser, any> {
    public constructor(private readonly queryBus: QueryBus) {}

    public execute(request: TGetUser) {
        const getUserQuery = new GetUerQuery(request);
        return this.queryBus.execute(getUserQuery);
    }
}
