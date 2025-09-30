import { Router } from 'express';
import { threadsRoutes } from './threads.routes';
import { machinesRoutes } from './machines.routes';
import { eventsRoutes } from './events.routes';
import { IdempotencyStore } from '../../services/idempotency.store';
import { SSEService } from '../../services/sse.service';
import { idempotencyGuard } from '../../middleware/idempotency';

export function googleSubapp() {
  const r = Router();
  const sse = new SSEService();
  const idem = new IdempotencyStore();

  // Attach idempotency guard to all POSTs under this subapp
  r.use(idempotencyGuard(idem));

  r.use(threadsRoutes(idem, sse));
  r.use(machinesRoutes(idem, sse));
  r.use(eventsRoutes(sse));

  // expose shutdown hooks for server
  (r as any).__sse__ = sse;
  (r as any).__idem__ = idem;

  return r;
}
