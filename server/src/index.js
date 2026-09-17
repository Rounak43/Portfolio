import { env, assertEnv } from './config/env.js';

// Validate before anything imports the Firebase config, so a missing key is
// reported as a readable message rather than a stack trace from the SDK.
try {
  assertEnv();
} catch (error) {
  console.error(`\n${error.message}\n`);
  console.error('Copy server/.env.example to server/.env and fill in the values.\n');
  process.exit(1);
}

const { app } = await import('./app.js');

const server = app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}/api/v1 (${env.nodeEnv})`);
  console.log(`Allowed origins: ${env.corsOrigins.join(', ') || '(none configured)'}`);
});

const shutdown = (signal) => {
  console.log(`\n${signal} received, closing server.`);
  server.close(() => process.exit(0));
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
