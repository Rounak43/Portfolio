import { auth } from '../config/firebase.js';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Reads a `Bearer <firebase-id-token>` header and verifies it with the Admin
 * SDK. Attaches `req.user` when the token is valid.
 */
const verifyToken = async (req) => {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) return null;

  const idToken = header.slice('Bearer '.length).trim();
  if (!idToken) return null;

  try {
    const decoded = await auth.verifyIdToken(idToken);
    return {
      uid: decoded.uid,
      email: (decoded.email || '').toLowerCase(),
      emailVerified: decoded.email_verified === true,
      isAdmin: decoded.admin === true || env.adminEmails.includes((decoded.email || '').toLowerCase()),
    };
  } catch {
    // An expired or tampered token is treated the same as no token at all.
    return null;
  }
};

/** Populates req.user when a token is present, but never rejects. */
export const attachUser = asyncHandler(async (req, _res, next) => {
  req.user = await verifyToken(req);
  next();
});

/** Rejects anything that is not a signed-in allowlisted admin. */
export const requireAdmin = asyncHandler(async (req, _res, next) => {
  const user = req.user ?? (await verifyToken(req));
  req.user = user;

  if (!user) throw ApiError.unauthorized('Sign in to perform this action.');
  if (!user.isAdmin) throw ApiError.forbidden('This account is not an administrator.');

  next();
});
