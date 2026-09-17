import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { env } from './config/env.js';
import routes from './routes/index.js';
import { attachUser } from './middleware/auth.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

export const app = express();

// Render, Railway and Fly all sit behind a proxy; without this the rate
// limiter would see the proxy's IP for every visitor.
app.set('trust proxy', 1);

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());

app.use(
  cors({
    origin(origin, callback) {
      // Requests with no Origin header are server-to-server (curl, health
      // checks) and are not subject to the browser's same-origin rules.
      if (!origin) return callback(null, true);
      if (env.corsOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`Origin ${origin} is not allowed by CORS.`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.isProd ? 'combined' : 'dev'));

app.use(attachUser);
app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);
