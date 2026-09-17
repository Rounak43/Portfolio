import { useState, useCallback } from 'react';

import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';

/**
 * The add/edit/delete/reorder state every editable section needs.
 *
 * Sections differ only in which collection they read and which field list they
 * render, so the bookkeeping lives here rather than five times over.
 *
 * @param {'projects'|'skills'|'timeline'|'competitions'} resource
 */
export function useSectionAdmin(resource) {
  const { isAdmin } = useAuth();
  const content = useContent();

  const { items, loading, usingFallback } = content[resource];

  // { mode: 'create' } or { mode: 'edit', item }
  const [form, setForm] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openCreate = useCallback(() => setForm({ mode: 'create', item: null }), []);
  const openEdit = useCallback((item) => setForm({ mode: 'edit', item }), []);
  const closeForm = useCallback(() => setForm(null), []);

  /** Throws on failure so EntityForm can show the message and stay open. */
  const submitForm = useCallback(
    async (values) => {
      if (form?.mode === 'edit') {
        await content.updateItem(resource, form.item.id, values);
      } else {
        await content.createItem(resource, values);
      }
    },
    [content, form, resource]
  );

  const confirmDelete = useCallback(async () => {
    if (!pendingDelete) return;

    setDeleting(true);
    try {
      await content.deleteItem(resource, pendingDelete.id);
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  }, [content, pendingDelete, resource]);

  /** Swap an item with its neighbour and persist the new ordering. */
  const move = useCallback(
    (index, delta) => {
      const target = index + delta;
      if (target < 0 || target >= items.length) return;

      const ids = items.map((item) => item.id);
      [ids[index], ids[target]] = [ids[target], ids[index]];

      content.reorderItems(resource, ids);
    },
    [content, items, resource]
  );

  return {
    isAdmin,
    items,
    loading,
    usingFallback,
    form,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    pendingDelete,
    requestDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
    deleting,
    move,
  };
}
