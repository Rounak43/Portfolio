import dotenv from 'dotenv';

dotenv.config();

/** Read a comma-separated env var into a trimmed, non-empty array. */
const list = (value) =>
  (value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',

  /**
   * Set by `firebase emulators:exec`, or by hand for local development. When
   * present the Admin SDK talks to the local emulator and needs no service
   * account, which is what makes the API testable without production keys.
   */
  useEmulator: Boolean(process.env.FIRESTORE_EMULATOR_HOST),

  corsOrigins: list(process.env.CORS_ORIGINS),
  adminEmails: list(process.env.ADMIN_EMAILS).map((email) => email.toLowerCase()),

  firebase: {
    serviceAccountBase64: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    // Hosting dashboards store newlines as the two characters \ and n.
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  },
};

/**
 * Fail fast at boot rather than on the first request, so a misconfigured
 * deploy is obvious in the startup logs.
 */
export function assertEnv() {
  const problems = [];

  const { serviceAccountBase64, projectId, clientEmail, privateKey } = env.firebase;
  const hasInlineCredentials = projectId && clientEmail && privateKey;

  // The emulator authenticates nothing, so a service account is not required.
  if (!env.useEmulator && !serviceAccountBase64 && !hasInlineCredentials) {
    problems.push(
      'Firebase credentials missing. Set FIREBASE_SERVICE_ACCOUNT_BASE64, or all of ' +
        'FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.'
    );
  }

  if (env.adminEmails.length === 0) {
    problems.push('ADMIN_EMAILS is empty — nobody would be able to edit content.');
  }

  if (env.isProd && env.corsOrigins.length === 0) {
    problems.push('CORS_ORIGINS is empty in production — the browser would block every request.');
  }

  if (problems.length > 0) {
    throw new Error(`Invalid environment configuration:\n  - ${problems.join('\n  - ')}`);
  }
}
