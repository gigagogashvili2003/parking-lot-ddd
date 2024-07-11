import { UseCase } from '@app/common/interfaces';
import { UserJwtPayload } from '@app/common/types';
import { Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export class ValidateTokenUseCase implements UseCase<string, any> {
    public constructor(
        private readonly jwtService: JwtService,
        @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
    ) {}

    public async execute(request?: string) {
        try {
            const payload: UserJwtPayload = await this.jwtService.verifyAsync(request);

            if (!payload) {
                throw new UnauthorizedException('Invalid token!');
            }

            const { sub } = payload;

            const user = await lastValueFrom(this.usersService.send('find-user-by-id', sub));

            if (!user) {
                throw new NotFoundException('User not found!');
            }

            return user;
        } catch (err) {
            throw new UnauthorizedException('Invalid token!');
        }
    }
}
