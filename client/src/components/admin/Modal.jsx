import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

/**
 * A focus-trapping-free but escape-aware modal rendered into document.body,
 * so it is never clipped by a section's transform or overflow.
 */
export function Modal({ title, onClose, children, footer, narrow = false }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    // Stop the page behind the modal from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="admin-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        // Only a click that both starts and ends on the backdrop closes it,
        // so dragging a text selection out of the dialog is safe.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className={`admin-modal ${narrow ? 'admin-modal-narrow' : ''}`}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="admin-modal-header">
          <h3 className="admin-modal-title">{title}</h3>
          <button className="admin-icon-btn" onClick={onClose} aria-label="Close">
            <FiX size={18} />
          </button>
        </div>

        <div className="admin-modal-body">{children}</div>

        {footer && <div className="admin-modal-footer">{footer}</div>}
      </motion.div>
    </motion.div>,
    document.body
  );
}

/** A yes/no dialog used before anything destructive. */
export function ConfirmDialog({ title, message, confirmLabel = 'Delete', onConfirm, onCancel, busy }) {
  return (
    <Modal
      title={title}
      onClose={busy ? () => {} : onCancel}
      narrow
      footer={
        <>
          <button className="admin-btn admin-btn-ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm} disabled={busy}>
            {busy ? 'Working…' : confirmLabel}
          </button>
        </>
      }
    >
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{message}</p>
    </Modal>
  );
}
