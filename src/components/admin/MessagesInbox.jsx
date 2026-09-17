import React, { useEffect, useState, useCallback } from 'react';
import { FiMail, FiTrash2, FiCheck, FiRotateCcw } from 'react-icons/fi';

import { api } from '../../api/client';
import { Modal, ConfirmDialog } from './Modal';

const formatDate = (iso) => {
  if (!iso) return '';
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

/** Admin-only view of contact-form submissions stored in Firestore. */
export function MessagesInbox({ onClose, onUnreadChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await api.listAdmin('/messages');
      setMessages(response.data);
      onUnreadChange?.(response.unread);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [onUnreadChange]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (message) => {
    // Update locally first so the list does not flicker while the request runs.
    setMessages((prev) =>
      prev.map((entry) => (entry.id === message.id ? { ...entry, read: !entry.read } : entry))
    );

    try {
      await api.patch(`/messages/${message.id}`, { read: !message.read });
      await load();
    } catch (err) {
      setError(err.message);
      await load();
    }
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await api.remove(`/messages/${pendingDelete.id}`);
      setPendingDelete(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Modal
        title={`Messages${messages.length ? ` (${messages.length})` : ''}`}
        onClose={onClose}
        footer={
          <button className="admin-btn admin-btn-ghost" onClick={onClose}>
            Close
          </button>
        }
      >
        {error && <div className="admin-modal-error">{error}</div>}

        {loading && <div className="admin-empty">Loading messages…</div>}

        {!loading && messages.length === 0 && !error && (
          <div className="admin-empty">
            <FiMail size={26} style={{ opacity: 0.5, marginBottom: 10 }} />
            <p>No messages yet.</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`admin-message ${message.read ? '' : 'unread'}`}>
            <div className="admin-message-head">
              <span className="admin-message-name">{message.name}</span>
              <a className="admin-message-email" href={`mailto:${message.email}`}>
                {message.email}
              </a>
              <span className="admin-message-date">{formatDate(message.createdAt)}</span>
            </div>

            <p className="admin-message-body">{message.message}</p>

            <div className="admin-message-actions">
              <button className="admin-btn" onClick={() => toggleRead(message)}>
                {message.read ? <FiRotateCcw size={13} /> : <FiCheck size={13} />}
                {message.read ? 'Mark unread' : 'Mark read'}
              </button>
              <button className="admin-btn admin-btn-danger" onClick={() => setPendingDelete(message)}>
                <FiTrash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </Modal>

      {pendingDelete && (
        <ConfirmDialog
          title="Delete message"
          message={`Permanently delete the message from ${pendingDelete.name}? This cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
          busy={busy}
        />
      )}
    </>
  );
}
