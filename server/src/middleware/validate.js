import { ApiError } from '../utils/ApiError.js';

/**
 * Validates `req.body` against a Zod schema and replaces it with the parsed
 * result, so controllers only ever see known-good, stripped data.
 *
 * `mode: 'partial'` makes every top-level key optional, which is what PATCH
 * needs — the client sends only the fields it is changing.
 */
export const validateBody = (schema, mode = 'strict') => (req, _res, next) => {
  const effectiveSchema = mode === 'partial' ? schema.partial() : schema;
  const result = effectiveSchema.safeParse(req.body);

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join('.') || '(root)',
      message: issue.message,
    }));
    return next(ApiError.badRequest('Some fields are invalid.', details));
  }

  if (mode === 'partial' && Object.keys(result.data).length === 0) {
    return next(ApiError.badRequest('Provide at least one field to update.'));
  }

  req.body = result.data;
  next();
};
