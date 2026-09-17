import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const notFound = (req, _res, next) => {
  next(ApiError.notFound(`No route matches ${req.method} ${req.originalUrl}`));
};

// Express identifies error middleware by its four-argument signature, so
// `next` must stay in the list even though it is unused.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, next) => {
  const status = err instanceof ApiError ? err.status : 500;

  if (status >= 500) {
    console.error('[error]', err);
  }

  res.status(status).json({
    success: false,
    error: {
      message: status >= 500 && env.isProd ? 'Something went wrong on the server.' : err.message,
      ...(err.details ? { details: err.details } : {}),
      ...(env.isProd ? {} : { stack: err.stack }),
    },
  });
};
