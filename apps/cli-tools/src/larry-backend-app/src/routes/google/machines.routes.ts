import { Router, Request, Response, NextFunction } from 'express';
import type {
  MachineResponse,
  MachineUpdatedEvent,
  MachineStatus,
} from '../../types';
import { IdempotencyStore } from '../../services/idempotency.store';
import { SSEService } from '../../services/sse.service';
import { googleCodingAgent } from '../../../../googleCodingAgentStandalone';
import { container } from '@codestrap/developer-foundations-di';
import { MachineDao, TYPES } from '@codestrap/developer-foundations-types';

export function machinesRoutes(idem: IdempotencyStore, sse: SSEService) {
  const r = Router();

  const machineDao = container.get<MachineDao>(TYPES.MachineDao);

  // GET /machines/:machineId
  r.get(
    '/machines/:machineId',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { machineId } = req.params;

        const machine = await machineDao.read(machineId);
        const context = JSON.parse(machine.state!).context;
        const currentStateContext = context[context.stateId];
        const humanReview = !!currentStateContext?.confirmationPrompt;

        const status: MachineStatus = humanReview
          ? 'awaiting_human'
          : 'running';
        const body: MachineResponse = {
          id: machineId,
          status,
          currentState: context.stateId,
          context,
        };

        res.json(body);
      } catch (err) {
        next(err);
      }
    }
  );

  // POST /machines/:machineId/next
  r.post(
    '/machines/:machineId/next',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const requestId = (req as any).requestId;
        const idemKey = (req as any).idempotencyKey as string | undefined;
        const { machineId } = req.params;
        const { contextUpdate } = req.body || {};

        if (typeof contextUpdate !== 'object' || contextUpdate === null) {
          const err = new Error('contextUpdate must be an object');
          (err as any).status = 400;
          (err as any).code = 'BAD_REQUEST';
          throw err;
        }

        const accepted = { status: 'accepted', requestId };
        if (idemKey) {
          // store the accepted envelope for replay
          idem.set(idemKey, 202, accepted);
        }

        // Immediate 202 - transition runs async. Client uses SSE or polls GET /machines/:id.
        res.status(202).json(accepted);

        // Kick off async machine transition - don't await, let it run in background
        // Any errors here should be logged but not sent to client since response is already sent
        setImmediate(async () => {
          try {
            // run google coding assistant call here
            const { executionId } = await googleCodingAgent(
              machineId,
              JSON.stringify(contextUpdate)
            );

            const machine = await machineDao.read(executionId);

            const context = JSON.parse(machine.state!).context;
            const currentStateContext = context[context.stateId];
            const humanReview = !!currentStateContext?.confirmationPrompt;

            const updated: MachineResponse = {
              id: machineId,
              currentState: context.stateId,
              status: humanReview ? 'awaiting_human' : 'running',
              currentStateContext,
              context,
            };

            const evt: MachineUpdatedEvent = {
              type: 'machine.updated',
              machine: updated,
              clientRequestId: req.header('Client-Request-Id') || undefined,
            };
            sse.broadcastMachineUpdated(evt);
          } catch (asyncErr) {
            // Log the error but don't try to send response since it's already sent
            console.error(
              '[machines.routes] Async machine transition failed:',
              asyncErr
            );
          }
        });
      } catch (err) {
        next(err);
      }
    }
  );

  return r;
}
