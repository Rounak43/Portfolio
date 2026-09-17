import { z } from 'zod';
import { text, colorRef, tagList, order } from './common.js';

/** One card in the Skills grid: a named category holding individual skills. */
export const skillCategorySchema = z.object({
  name: text(80),
  icon: text(8),
  color: colorRef,
  skills: tagList(40),
  order,
});
