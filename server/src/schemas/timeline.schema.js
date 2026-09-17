import { z } from 'zod';
import { text, colorRef, order } from './common.js';

export const timelineEntrySchema = z.object({
  year: text(20),
  title: text(160),
  description: text(1200),
  color: colorRef,
  icon: text(8),
  order,
});
