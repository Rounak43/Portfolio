import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

import { env } from './env.js';

/**
 * Build the credential object from whichever of the two supported env layouts
 * is populated. See .env.example for what each one expects.
 */
function resolveServiceAccount() {
  const { serviceAccountBase64, projectId, clientEmail, privateKey } = env.firebase;

  if (serviceAccountBase64) {
    try {
      const json = Buffer.from(serviceAccountBase64, 'base64').toString('utf8');
      return JSON.parse(json);
    } catch {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 is not valid base64-encoded JSON.');
    }
  }

  return { projectId, clientEmail, privateKey };
}

// getApps() guards against re-initialising under `node --watch`.
if (getApps().length === 0) {
  if (env.useEmulator) {
    // The emulator ignores credentials entirely and accepts any project id.
    initializeApp({ projectId: env.firebase.projectId || 'demo-portfolio' });
    console.log(`Using Firestore emulator at ${process.env.FIRESTORE_EMULATOR_HOST}`);
  } else {
    const serviceAccount = resolveServiceAccount();
    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.projectId || serviceAccount.project_id,
    });
  }
}

export const db = getFirestore();
export const auth = getAuth();
export { FieldValue };

// Lets us write `undefined` fields without Firestore rejecting the whole doc.
db.settings({ ignoreUndefinedProperties: true });
