import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { requestId } from './middleware/request-id';
import { errorHandler } from './middleware/error-handler';
import { googleSubapp } from './routes/google';

export function buildApp() {
  const app = express();

  // - Global middleware
  app.use(helmet());
  app.use(compression());
  app.use(express.json()); // per your instruction, no explicit size limit here
  app.use(requestId());

  // - Mount the google agent subapp
  app.use('/larry/agents/google/v1', googleSubapp());

  // - 404
  app.use((_req, res) => {
    res.status(404).json({
      error: { code: 'NOT_FOUND', message: 'Route not found' },
      requestId: res.getHeader('X-Request-Id') || 'unknown',
    });
  });

  // - Errors
  app.use(errorHandler());

  return app;
}
