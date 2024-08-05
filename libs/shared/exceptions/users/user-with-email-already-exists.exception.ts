import { NotFoundException } from '@nestjs/common';

export class UserWithEmailAlreadyExistsException extends NotFoundException {
    constructor(email: string) {
        super(`User with email: ${email} already exists`);
    }
}
