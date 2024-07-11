import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { NextFunction, Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    public constructor(
        @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
        private readonly jwtService: JwtService,
    ) {}

    public use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing!');
        }

        const token = authHeader.split(' ')[1];
        const user = this.jwtService.verify(token);

        if (!user) {
            throw new UnauthorizedException('Invalid token!');
        }

        console.log(user);

        req['user'] = user;
        console.log('MOVIDA');
        console.log(req['user']);
        next();
    }
}
