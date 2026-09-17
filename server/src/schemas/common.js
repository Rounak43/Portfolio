import { z } from 'zod';

/** Required, trimmed, non-empty text. */
export const text = (max = 500) => z.string().trim().min(1).max(max);

/** Optional text that may be sent as an empty string. */
export const optionalText = (max = 500) => z.string().trim().max(max).optional().or(z.literal(''));

/**
 * A link, an in-app placeholder (`#`), or an `asset:` reference to an image
 * bundled in the frontend's src/assets folder. Storing the asset scheme lets
 * the seeded content keep its existing bundled images while anything added
 * later is a plain hosted URL.
 */
export const imageRef = z
  .string()
  .trim()
  .max(2000)
  .refine(
    (value) =>
      value === '' ||
      value === '#' ||
      value.startsWith('asset:') ||
      /^https?:\/\//i.test(value) ||
      value.startsWith('/'),
    { message: 'Must be an http(s) URL, a root-relative path, or an asset: reference.' }
  );

export const urlRef = z
  .string()
  .trim()
  .max(2000)
  .refine((value) => value === '' || value === '#' || /^https?:\/\//i.test(value), {
    message: 'Must be an http(s) URL.',
  });

/** A hex colour like #00E5FF, or a CSS variable reference. */
export const colorRef = z
  .string()
  .trim()
  .max(60)
  .refine((value) => /^#[0-9a-f]{3,8}$/i.test(value) || value.startsWith('var(') || value === '', {
    message: 'Must be a hex colour or a CSS var() reference.',
  });

export const tagList = (max = 40) => z.array(text(80)).max(max);

/** Position within a list. Optional on create; the repository assigns one. */
export const order = z.number().int().min(0).optional();
