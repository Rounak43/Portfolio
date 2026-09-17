/**
 * Grants the `admin: true` custom claim to a Firebase Auth user, which is what
 * firestore.rules checks.
 *
 *   npm run grant-admin -- rounaksharma43@gmail.com
 *
 * The API's ADMIN_EMAILS allowlist already authorises you, so this is only
 * needed if you also want the Firestore rules to accept the account directly.
 */
import { assertEnv } from '../src/config/env.js';

assertEnv();

const { auth } = await import('../src/config/firebase.js');

const email = process.argv[2];

if (!email) {
  console.error('Usage: npm run grant-admin -- <email>');
  process.exit(1);
}

try {
  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, { admin: true });
  console.log(`Granted admin claim to ${email} (uid: ${user.uid}).`);
  console.log('Sign out and back in so the new token carries the claim.');
} catch (error) {
  console.error(`Could not grant admin to ${email}: ${error.message}`);
  console.error('Create the account first in Firebase console -> Authentication -> Users.');
  process.exit(1);
}
