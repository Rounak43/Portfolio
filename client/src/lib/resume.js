/**
 * Google Drive share links open a preview page rather than handing the file
 * over, so the raw URL an admin pastes is not something the browser will
 * download. These helpers pull the file ID out of whichever share format was
 * pasted and rebuild it as Drive's direct-download endpoint, which responds
 * with Content-Disposition: attachment.
 */

/** Share formats Drive hands out, plus the older open?id= and uc?id= ones. */
const DRIVE_ID_PATTERNS = [
  /\/file\/d\/([\w-]+)/, // .../file/d/<id>/view
  /\/d\/([\w-]+)/, //       docs.google.com/document/d/<id>/edit
  /[?&]id=([\w-]+)/, //     .../open?id=<id>, .../uc?id=<id>
];

/** The Drive file ID inside a share URL, or null when it is not a Drive link. */
export function driveFileId(url) {
  if (!url || !/^https?:\/\/(drive|docs)\.google\.com\//i.test(url.trim())) return null;

  for (const pattern of DRIVE_ID_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * A URL that saves the file to the visitor's device instead of previewing it.
 * Non-Drive URLs are returned untouched — a link to a plain PDF already
 * downloads once the anchor carries a `download` attribute.
 *
 * @param {string} url the configured resume link
 * @param {string} fallback used when no link is configured
 */
export function resumeDownloadUrl(url, fallback = '') {
  const trimmed = url?.trim();
  if (!trimmed || trimmed === '#') return fallback;

  const id = driveFileId(trimmed);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : trimmed;
}
