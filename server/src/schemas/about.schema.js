import { z } from 'zod';
import { text, colorRef, tagList } from './common.js';

const aboutCardSchema = z.object({
  icon: text(8),
  title: text(120),
  tags: tagList(20),
  color: colorRef,
});

/**
 * The About section is one record, not a list. `paragraphs` replaces the
 * hardcoded JSX bio; `**bold**` spans render as the cyan highlight the
 * original markup used.
 */
export const aboutSchema = z.object({
  paragraphs: z.array(text(2000)).min(1).max(10),
  cards: z.array(aboutCardSchema).max(8),
});
