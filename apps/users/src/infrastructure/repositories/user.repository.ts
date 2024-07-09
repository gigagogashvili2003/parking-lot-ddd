import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models';
import { IUserRepository } from '../interfaces';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

@Injectable()
export class UserRepository implements IUserRepository {
    public constructor(@InjectRepository(UserModel) private readonly repository: Repository<UserModel>) {}

    public createOne(model: UserModel) {
        return this.repository.save(model);
    }
}
