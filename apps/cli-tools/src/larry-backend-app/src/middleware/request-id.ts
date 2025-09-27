import { randomUUID } from 'node:crypto';
import { Request, Response, NextFunction } from 'express';

export function requestId() {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = randomUUID();
    (req as any).requestId = id;
    res.setHeader('X-Request-Id', id);
    next();
  };
}
