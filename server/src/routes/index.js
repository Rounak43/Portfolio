import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import { createResourceRouter } from './resource.routes.js';
import {
  projectsRepo,
  competitionsRepo,
  skillsRepo,
  timelineRepo,
} from '../services/repositories.js';

import { projectSchema } from '../schemas/project.schema.js';
import { competitionSchema } from '../schemas/competition.schema.js';
import { skillCategorySchema } from '../schemas/skill.schema.js';
import { timelineEntrySchema } from '../schemas/timeline.schema.js';
import { aboutSchema } from '../schemas/about.schema.js';
import { messageSchema, messageUpdateSchema } from '../schemas/message.schema.js';

import { getAbout, updateAbout } from '../controllers/about.controller.js';
import {
  createMessage,
  listMessages,
  updateMessage,
  deleteMessage,
} from '../controllers/messages.controller.js';

import { requireAdmin } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Lets the frontend confirm the signed-in account is actually an admin before
 * it reveals any editing UI.
 */
router.get('/auth/me', requireAdmin, (req, res) => {
  res.json({ success: true, data: req.user });
});

// --- Content collections -------------------------------------------------
router.use('/projects', createResourceRouter(projectsRepo, projectSchema));
router.use('/skills', createResourceRouter(skillsRepo, skillCategorySchema));
router.use('/timeline', createResourceRouter(timelineRepo, timelineEntrySchema));
router.use(
  '/competitions',
  createResourceRouter(competitionsRepo, competitionSchema, { useSlugId: true })
);

// --- About (single document) ---------------------------------------------
router.get('/about', getAbout);
router.put('/about', requireAdmin, validateBody(aboutSchema), updateAbout);

// --- Contact messages ----------------------------------------------------
// The public POST is throttled per IP; the admin reads are not.
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    error: { message: 'Too many messages sent. Please try again later.' },
  },
});

router.post('/messages', contactLimiter, validateBody(messageSchema), createMessage);
router.get('/messages', requireAdmin, listMessages);
router.patch('/messages/:id', requireAdmin, validateBody(messageUpdateSchema), updateMessage);
router.delete('/messages/:id', requireAdmin, deleteMessage);

export default router;
