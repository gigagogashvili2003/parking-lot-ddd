import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, params, ip } = req;
    const userAgent = req.get('user-agent') || '';

    this.logger.log(`[${method}] ${originalUrl}`, {
      body,
      query,
      params,
      ip,
      userAgent,
    });

    next();
  }
}
