import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import { Modal } from './Modal';

/**
 * The sign-in dialog reached at #/admin.
 *
 * Signing in only *reveals* the editing UI — the API independently verifies
 * every write, so a non-admin who reaches this dialog gains nothing.
 */
export function AdminLogin({ onClose }) {
  const { signIn, isFirebaseConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      await signIn(email.trim(), password);
      onClose();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal
      title="Administrator sign in"
      onClose={busy ? () => {} : onClose}
      narrow
      footer={
        <>
          <button type="button" className="admin-btn admin-btn-ghost" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button
            type="submit"
            form="admin-login-form"
            className="admin-btn admin-btn-primary"
            disabled={busy || !isFirebaseConfigured}
          >
            <FiLogIn size={14} /> {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </>
      }
    >
      {!isFirebaseConfigured ? (
        <p className="admin-login-intro">
          Firebase is not configured for this build. Add the <code>VITE_FIREBASE_*</code> values to
          your <code>.env</code> file and restart the dev server.
        </p>
      ) : (
        <>
          <p className="admin-login-intro">
            Sign in to edit the site's content in place. Visitors never see this.
          </p>

          {error && <div className="admin-modal-error">{error}</div>}

          <form id="admin-login-form" onSubmit={handleSubmit}>
            <div className="admin-field">
              <label className="admin-label" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                className="admin-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
                autoFocus
              />
            </div>

            <div className="admin-field">
              <label className="admin-label" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                className="admin-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </form>
        </>
      )}
    </Modal>
  );
}
