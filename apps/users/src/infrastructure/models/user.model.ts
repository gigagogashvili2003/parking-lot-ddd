import { BaseModel } from '@app/common/models';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserModel extends BaseModel {
    @Column({ name: 'first_name', nullable: false })
    firstName: string;

    @Column({ name: 'last_name', nullable: false })
    lastName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;
}
