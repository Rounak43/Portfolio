/**
 * Resolves image references coming from the API.
 *
 * Content migrated from the old hardcoded files stores its images as
 * `asset:<filename>`, pointing at a file bundled in src/assets. Anything added
 * through the admin panel is a plain URL. This maps the former onto Vite's
 * hashed build output and passes the latter straight through.
 */

// Eagerly collect every bundled asset as { '../assets/profile.jpg': '/portfolio/assets/profile-a1b2.jpg' }
const bundled = import.meta.glob('../assets/*.{png,jpg,jpeg,svg,webp,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// Re-key by bare filename so the stored reference stays readable.
const byFilename = Object.entries(bundled).reduce((map, [path, url]) => {
  const filename = path.split('/').pop();
  map[filename] = url;
  return map;
}, {});

const ASSET_PREFIX = 'asset:';

/**
 * @param {string} reference an `asset:` reference, a URL, or an already-resolved path
 * @param {string} [fallback] used when the reference is empty or unresolvable
 */
export function resolveImage(reference, fallback = '') {
  if (!reference) return fallback;

  if (reference.startsWith(ASSET_PREFIX)) {
    const filename = reference.slice(ASSET_PREFIX.length);
    return byFilename[filename] || fallback;
  }

  return reference;
}

/** Every bundled filename, for the admin form's "pick an existing image" list. */
export const bundledAssetNames = Object.keys(byFilename).sort();
