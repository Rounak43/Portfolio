import { Router } from 'express';

import { createResourceController } from '../controllers/resource.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

/**
 * A REST router for one ordered content collection:
 *
 *   GET    /            public   list, sorted by `order`
 *   GET    /:id         public   one item
 *   POST   /reorder     admin    rewrite ordering
 *   POST   /            admin    create
 *   PATCH  /:id         admin    partial update
 *   DELETE /:id         admin    delete
 */
export function createResourceRouter(repository, schema, options = {}) {
  const router = Router();
  const controller = createResourceController(repository, options);

  router.get('/', controller.list);

  // Registered before `/:id` so "reorder" is not swallowed as an id.
  router.post('/reorder', requireAdmin, controller.reorder);

  router.get('/:id', controller.get);
  router.post('/', requireAdmin, validateBody(schema), controller.create);
  router.patch('/:id', requireAdmin, validateBody(schema, 'partial'), controller.update);
  router.delete('/:id', requireAdmin, controller.remove);

  return router;
}
