import { z } from 'zod';

/** What the public contact form is allowed to submit. */
export const messageSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(5000),
  /**
   * Honeypot: a field hidden from real users. Bots fill every input they find,
   * so a non-empty value here means the submission is discarded.
   */
  website: z.string().max(200).optional(),
});

export const messageUpdateSchema = z.object({
  read: z.boolean(),
});
