import { Router, Request, Response } from 'express';
import { SSEService } from '../../services/sse.service';

export function eventsRoutes(sse: SSEService) {
  const r = Router();

  // GET /machines/:machineId/events
  r.get('/machines/:machineId/events', (req: Request, res: Response) => {
    const { machineId } = req.params;
    sse.registerMachine(machineId, res);
  });

  // GET /events?topics=thread.created,machine.updated
  r.get('/events', (req: Request, res: Response) => {
    const topics =
      typeof req.query.topics === 'string'
        ? (req.query.topics as string)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined;

    const clientRequestId = req.header('Client-Request-Id') || undefined;
    sse.registerGlobal(res, topics, clientRequestId);
  });

  return r;
}
