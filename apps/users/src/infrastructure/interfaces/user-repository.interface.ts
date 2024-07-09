import { UserModel } from '../models';

export interface IUserRepository {
    createOne(model: UserModel): Promise<UserModel>;
}
