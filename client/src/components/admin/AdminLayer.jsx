import React, { useEffect, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiLogOut, FiMail, FiEdit3 } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import { useIsAdminRoute } from '../../hooks/useHashRoute';
import { api } from '../../api/client';
import { AdminLogin } from './AdminLogin';
import { MessagesInbox } from './MessagesInbox';
import './admin.css';

/** The persistent bar shown across the top once an admin is signed in. */
function AdminBar({ onOpenMessages, unread }) {
  const { user, signOut } = useAuth();
  const { offline } = useContent();

  return (
    <div className="admin-bar">
      <span className="admin-bar-brand">
        <span className="admin-bar-dot" />
        <FiEdit3 size={14} /> Admin mode
      </span>

      <span className="admin-bar-email">{user?.email}</span>

      {offline && (
        <span className="admin-bar-warning">
          API unreachable — showing bundled content. Edits will fail until it responds.
        </span>
      )}

      <span className="admin-bar-spacer" />

      <button className="admin-btn" onClick={onOpenMessages}>
        <FiMail size={14} /> Messages
        {unread > 0 && <span className="admin-badge-count">{unread}</span>}
      </button>

      <button className="admin-btn admin-btn-ghost" onClick={signOut}>
        <FiLogOut size={14} /> Sign out
      </button>
    </div>
  );
}

/**
 * Mounts the admin chrome: the login dialog at #/admin, and the top bar plus
 * message inbox once signed in. Everything editable elsewhere in the app keys
 * off `useAuth().isAdmin`, so logged out there is no admin UI at all.
 */
export function AdminLayer() {
  const { isAdmin, checking } = useAuth();
  const isAdminRoute = useIsAdminRoute();

  const [showLogin, setShowLogin] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [unread, setUnread] = useState(0);

  // Open the login dialog when the hidden route is visited by a non-admin.
  useEffect(() => {
    if (isAdminRoute && !isAdmin && !checking) setShowLogin(true);
  }, [isAdminRoute, isAdmin, checking]);

  // Shifts the page down so the fixed bar does not cover the navbar.
  useEffect(() => {
    document.body.classList.toggle('admin-mode', isAdmin);
    return () => document.body.classList.remove('admin-mode');
  }, [isAdmin]);

  // Surface the unread count on the bar without opening the inbox.
  useEffect(() => {
    if (!isAdmin) return;

    api
      .listAdmin('/messages')
      .then((response) => setUnread(response.unread ?? 0))
      .catch(() => setUnread(0));
  }, [isAdmin]);

  const closeLogin = useCallback(() => {
    setShowLogin(false);
    // Drop #/admin from the URL so a refresh does not reopen the dialog.
    if (window.location.hash === '#/admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <>
      {isAdmin && <AdminBar onOpenMessages={() => setShowMessages(true)} unread={unread} />}

      <AnimatePresence>
        {showLogin && !isAdmin && <AdminLogin key="login" onClose={closeLogin} />}
      </AnimatePresence>

      <AnimatePresence>
        {showMessages && isAdmin && (
          <MessagesInbox
            key="messages"
            onClose={() => setShowMessages(false)}
            onUnreadChange={setUnread}
          />
        )}
      </AnimatePresence>
    </>
  );
}
