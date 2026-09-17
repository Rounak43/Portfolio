import React from 'react';
import { FiEdit2, FiTrash2, FiChevronUp, FiChevronDown, FiPlus } from 'react-icons/fi';

/**
 * The edit/delete/reorder cluster pinned to the corner of a content card.
 *
 * The parent card needs `position: relative` — add the `has-admin-controls`
 * class alongside its existing className.
 */
export function ItemControls({ onEdit, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown, label }) {
  // Cards often sit inside a click-to-expand parent, so every button stops
  // propagation rather than triggering the card's own handler.
  const wrap = (handler) => (event) => {
    event.stopPropagation();
    event.preventDefault();
    handler();
  };

  return (
    <div className="admin-item-controls" onClick={(event) => event.stopPropagation()}>
      <button
        className="admin-icon-btn"
        onClick={wrap(onMoveUp)}
        disabled={!canMoveUp}
        aria-label={`Move ${label} earlier`}
        title="Move earlier"
      >
        <FiChevronUp size={15} />
      </button>
      <button
        className="admin-icon-btn"
        onClick={wrap(onMoveDown)}
        disabled={!canMoveDown}
        aria-label={`Move ${label} later`}
        title="Move later"
      >
        <FiChevronDown size={15} />
      </button>
      <button
        className="admin-icon-btn"
        onClick={wrap(onEdit)}
        aria-label={`Edit ${label}`}
        title="Edit"
      >
        <FiEdit2 size={14} />
      </button>
      <button
        className="admin-icon-btn danger"
        onClick={wrap(onDelete)}
        aria-label={`Delete ${label}`}
        title="Delete"
      >
        <FiTrash2 size={14} />
      </button>
    </div>
  );
}

/** The dashed "add" button that sits below a section's grid. */
export function AddButton({ onClick, children }) {
  return (
    <div className="admin-add-row">
      <button className="admin-add-btn" onClick={onClick}>
        <FiPlus size={17} /> {children}
      </button>
    </div>
  );
}
