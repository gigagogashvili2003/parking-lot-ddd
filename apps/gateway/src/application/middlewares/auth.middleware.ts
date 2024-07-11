import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NextFunction, Request } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    public constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

    public async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing!');
        }

        const token = authHeader.split(' ')[1];

        const user = await lastValueFrom(this.authClient.send('validate-token', token));

        if (!user) {
            throw new UnauthorizedException('Invalid token!');
        }

        req['user'] = user;
        next();
    }
}
