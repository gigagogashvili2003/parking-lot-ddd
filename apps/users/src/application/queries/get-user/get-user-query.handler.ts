import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'apps/users/src/infrastructure/repositories';
import { IUserRepository } from 'apps/users/src/infrastructure';
import { GetUerQuery } from './get-user.query';

@QueryHandler(GetUerQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUerQuery> {
    public constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

    public async execute(query: GetUerQuery): Promise<any> {
        const { id } = query;
        const user = await this.userRepository.findOneByUUID(id);
        return user;
    }
}
