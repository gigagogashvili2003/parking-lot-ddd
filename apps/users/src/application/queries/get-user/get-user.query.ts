import { IQuery } from '@nestjs/cqrs';

export class GetUerQuery implements IQuery {
    public constructor(public readonly id: string) {}
}
