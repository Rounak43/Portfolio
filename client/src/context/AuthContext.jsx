import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { firebaseAuth, isFirebaseConfigured } from '../lib/firebase';
import { api, ApiRequestError } from '../api/client';

const AuthContext = createContext(null);

/**
 * Tracks whether an administrator is signed in.
 *
 * Signing in with Firebase is not enough on its own — the API decides who is
 * an admin, so we confirm with `/auth/me` before exposing any editing UI. A
 * non-admin Firebase account therefore sees the site exactly as a visitor.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // Starts true only when there is a session to restore.
  const [checking, setChecking] = useState(isFirebaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!firebaseAuth) {
      setChecking(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }

      try {
        await api.listAdmin('/auth/me');
        setIsAdmin(true);
      } catch (err) {
        setIsAdmin(false);
        // A reachable server saying "not an admin" is worth surfacing; an
        // unreachable one is not the account's fault, so stay quiet.
        if (err instanceof ApiRequestError && err.status === 403) {
          setError('That account is signed in but is not an administrator.');
        }
      } finally {
        setChecking(false);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!firebaseAuth) {
      throw new Error('Firebase is not configured for this build. Check your .env file.');
    }

    setError(null);
    setChecking(true);

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      // onAuthStateChanged runs next and performs the admin check.
    } catch (err) {
      setChecking(false);
      // Firebase error codes are not user-facing prose.
      const friendly =
        {
          'auth/invalid-credential': 'Incorrect email or password.',
          'auth/invalid-email': 'That email address is not valid.',
          'auth/user-not-found': 'Incorrect email or password.',
          'auth/wrong-password': 'Incorrect email or password.',
          'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
          'auth/network-request-failed': 'Network problem. Check your connection.',
        }[err.code] || 'Could not sign in. Please try again.';

      setError(friendly);
      throw new Error(friendly);
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!firebaseAuth) return;
    await firebaseSignOut(firebaseAuth);
    setIsAdmin(false);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAdmin, checking, error, signIn, signOut, isFirebaseConfigured }),
    [user, isAdmin, checking, error, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside an AuthProvider.');
  return context;
}
