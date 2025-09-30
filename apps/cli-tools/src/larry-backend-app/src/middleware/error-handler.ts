import { Request, Response, NextFunction } from 'express';
import type { ErrorEnvelope } from '../types';

export function errorHandler() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err?.statusCode || err?.status || 500;
    const code = err?.code || (status === 404 ? 'NOT_FOUND' : 'INTERNAL');
    const message = err?.message || 'Unexpected error';
    const details = err?.details;

    const requestId = (req as any).requestId || 'unknown';
    const body: ErrorEnvelope = {
      error: { code, message, ...(details ? { details } : {}) },
      requestId,
    };

    res.status(status).json(body);
  };
}
