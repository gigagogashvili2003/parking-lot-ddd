import { Injectable } from '@nestjs/common';
import { UseCase } from '@app/common/interfaces';
import { QueryBus } from '@nestjs/cqrs';
import { GetUerQuery } from '../queries/get-user';

@Injectable()
export class GetUserUsecase implements UseCase<string, any> {
    public constructor(private readonly queryBus: QueryBus) {}

    public execute(request: string) {
        const getUserQuery = new GetUerQuery(request);
        return this.queryBus.execute(getUserQuery);
    }
}
