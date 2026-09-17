import { z } from 'zod';
import { text, optionalText, imageRef, urlRef, colorRef, tagList, order } from './common.js';

export const projectSchema = z.object({
  title: text(160),
  description: text(1200),
  image: imageRef,
  tech: tagList(20),
  github: urlRef,
  demo: urlRef,
  color: colorRef,
  /** Optional ribbon such as "Recently Started". Empty hides the badge. */
  status: optionalText(60),
  order,
});
