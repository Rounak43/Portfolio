import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/**
 * Firebase is only used client-side for admin sign-in. All content reads and
 * writes go through the Express API, which verifies the resulting ID token
 * with the Admin SDK.
 *
 * These values are not secrets — a Firebase web config is designed to ship in
 * the browser bundle. What protects your data is the API's admin allowlist and
 * the rules in server/firestore.rules.
 */
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/** True only when every required field is present in the build's env. */
export const isFirebaseConfigured = Boolean(
  config.apiKey && config.authDomain && config.projectId
);

let authInstance = null;

if (isFirebaseConfigured) {
  const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
  authInstance = getAuth(app);
} else {
  // Not an error for a visitor — the public site works without it. Only the
  // admin login needs Firebase.
  console.info('[portfolio] Firebase env vars are not set; admin sign-in is disabled.');
}

/** The Auth instance, or null when Firebase is not configured for this build. */
export const firebaseAuth = authInstance;
