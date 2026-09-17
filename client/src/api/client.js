import { firebaseAuth } from '../lib/firebase';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

/** Carries the HTTP status alongside the message so callers can branch on it. */
export class ApiRequestError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.details = details;
  }
}

/**
 * A fresh Firebase ID token, or null when nobody is signed in. Tokens expire
 * after an hour; getIdToken() refreshes automatically when needed.
 */
async function getIdToken() {
  const user = firebaseAuth?.currentUser;
  if (!user) return null;

  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}

/**
 * @param {string} path      path below the API base, e.g. '/projects'
 * @param {object} [options] method, body, and whether to attach the admin token
 */
export async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { Accept: 'application/json' };

  if (body !== undefined) headers['Content-Type'] = 'application/json';

  if (auth) {
    const token = await getIdToken();
    if (!token) throw new ApiRequestError('You are signed out. Sign in again to continue.', 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // Thrown when the server is unreachable — a sleeping free-tier host, a
    // wrong VITE_API_URL, or the visitor being offline.
    throw new ApiRequestError('Could not reach the server.', 0);
  }

  // 204 and friends have no body to parse.
  const payload = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiRequestError(
      payload?.error?.message || `Request failed with status ${response.status}.`,
      response.status,
      payload?.error?.details
    );
  }

  return payload;
}

export const api = {
  get: (path) => apiRequest(path),
  listAdmin: (path) => apiRequest(path, { auth: true }),
  post: (path, body) => apiRequest(path, { method: 'POST', body, auth: true }),
  postPublic: (path, body) => apiRequest(path, { method: 'POST', body }),
  patch: (path, body) => apiRequest(path, { method: 'PATCH', body, auth: true }),
  put: (path, body) => apiRequest(path, { method: 'PUT', body, auth: true }),
  remove: (path) => apiRequest(path, { method: 'DELETE', auth: true }),
};

export { API_URL };
