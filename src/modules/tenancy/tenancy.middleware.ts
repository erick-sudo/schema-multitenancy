import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const TENANT_HEADER = 'x-tenant-id';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const header = req.headers[TENANT_HEADER] as string;
    req.tenantId = header?.toString() || null;
    next();
  }
}
