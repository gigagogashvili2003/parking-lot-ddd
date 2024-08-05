import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'apps/users/src/infrastructure/repositories';
import { IUserRepository } from 'apps/users/src/infrastructure';
import { GetUerQuery } from './get-user.query';
import { User } from 'apps/users/src/domain';
import { UserMapper } from 'apps/users/src/mappers';

@QueryHandler(GetUerQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUerQuery> {
    public constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

    public async execute(query: GetUerQuery) {
        const { fields } = query;

        if (!fields?.email && !fields?.id) {
            throw new BadRequestException('You must provide at least one field');
        }

        if (fields?.id) {
            return this.userRepository.findOneByUUID(fields.id);
        } else {
            return this.userRepository.findOneByEmail(fields.email);
        }
    }
}
