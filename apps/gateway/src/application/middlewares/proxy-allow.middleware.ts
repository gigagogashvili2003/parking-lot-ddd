import { Injectable, NestMiddleware, NotAcceptableException } from '@nestjs/common';
import { NextFunction, Request } from 'express';

@Injectable()
export class ProxyAllowMiddleware implements NestMiddleware {
    public constructor() {}

    public use(req: Request, res: Response, next: NextFunction) {
        const forwardedFromNginx = req['headers']['x-forwarded-by-nginx'] as string;

        const nginxSecret = process.env.NGINX_SECRET;

        if (!forwardedFromNginx || !nginxSecret) {
            throw new NotAcceptableException();
        }

        if (forwardedFromNginx !== nginxSecret) {
            throw new NotAcceptableException();
        }

        next();
    }
}
