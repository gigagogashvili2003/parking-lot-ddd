import { IQuery } from '@nestjs/cqrs';
import { TGetUser } from '../../types';

export class GetUerQuery implements IQuery {
    public constructor(public readonly fields: TGetUser) {}
}
