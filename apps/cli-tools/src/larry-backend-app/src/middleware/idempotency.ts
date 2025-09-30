import { Request, Response, NextFunction } from 'express';
import { IdempotencyStore } from '../services/idempotency.store';

// Applies only to POSTs where we explicitly opt-in inside route handlers
export function idempotencyGuard(store: IdempotencyStore) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.header('Idempotency-Key');
    if (!key) return next();

    const hit = store.get(key);
    if (hit) {
      // Replaying the original outcome
      res.status(hit.status).set(hit.headers || {});
      return res.json(hit.body);
    }

    // Allow route to run and record result there
    (req as any).idempotencyKey = key;
    next();
  };
}
