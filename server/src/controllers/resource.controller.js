import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

/** Turn a title into a URL-safe document id, e.g. "Odoo Hackathon" -> "odoo-hackathon". */
export const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

/**
 * Builds the five standard handlers for an ordered content collection. Every
 * content type behaves identically, so they share one implementation.
 *
 * `useSlugId` makes created documents use a slug of their title as the key,
 * which keeps competition ids readable and stable in URLs.
 */
export function createResourceController(repository, { useSlugId = false } = {}) {
  return {
    list: asyncHandler(async (_req, res) => {
      const items = await repository.list();
      res.json({ success: true, count: items.length, data: items });
    }),

    get: asyncHandler(async (req, res) => {
      const item = await repository.get(req.params.id);
      res.json({ success: true, data: item });
    }),

    create: asyncHandler(async (req, res) => {
      const id = useSlugId ? slugify(req.body.title) : null;

      if (useSlugId && !id) {
        throw ApiError.badRequest('The title must contain at least one letter or number.');
      }

      const item = await repository.create(req.body, id);
      res.status(201).json({ success: true, data: item });
    }),

    update: asyncHandler(async (req, res) => {
      const item = await repository.update(req.params.id, req.body);
      res.json({ success: true, data: item });
    }),

    remove: asyncHandler(async (req, res) => {
      await repository.remove(req.params.id);
      res.json({ success: true, data: { id: req.params.id } });
    }),

    reorder: asyncHandler(async (req, res) => {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0 || !ids.every((id) => typeof id === 'string')) {
        throw ApiError.badRequest('Send `ids` as a non-empty array of document ids.');
      }

      const items = await repository.reorder(ids);
      res.json({ success: true, data: items });
    }),
  };
}
