import React, { useState, useMemo } from 'react';

import { Modal } from './Modal';
import { FormField, defaultFor } from './FormFields';

/** Seed the form from the item being edited, filling gaps with field defaults. */
function buildInitialValues(fields, item) {
  const values = {};

  for (const field of fields) {
    const existing = item?.[field.name];
    values[field.name] =
      existing !== undefined && existing !== null
        ? existing
        : field.defaultValue ?? defaultFor(field.type);
  }

  return values;
}

/**
 * Strip values the API would reject: groups whose `omitWhen` says they are
 * empty, and Firestore bookkeeping fields that are not part of the schema.
 */
function prepareValues(fields, values) {
  const payload = { ...values };

  for (const field of fields) {
    if (field.omitWhen?.(payload[field.name])) {
      delete payload[field.name];
    }
  }

  delete payload.id;
  delete payload.order;
  delete payload.createdAt;
  delete payload.updatedAt;

  return payload;
}

/**
 * A modal form built from a field-descriptor list. Used for every content
 * type, so add/edit behave identically everywhere.
 *
 * @param {object[]} fields   descriptors from contentSchemas.js
 * @param {object}   [item]   the record being edited; omit to create
 * @param {Function} onSubmit receives the prepared payload; may throw to show an error
 */
export function EntityForm({ title, fields, item, onSubmit, onClose, submitLabel }) {
  const [values, setValues] = useState(() => buildInitialValues(fields, item));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const requiredMissing = useMemo(
    () => fields.filter((field) => field.required && !String(values[field.name] ?? '').trim()),
    [fields, values]
  );

  const setField = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (requiredMissing.length > 0) {
      setError(`Please fill in: ${requiredMissing.map((field) => field.label).join(', ')}.`);
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await onSubmit(prepareValues(fields, values));
      onClose();
    } catch (err) {
      // Zod validation failures come back as a per-field list; surface them
      // rather than the generic "Some fields are invalid."
      const details = err.details?.map((detail) => `${detail.field}: ${detail.message}`).join('; ');
      setError(details ? `${err.message} ${details}` : err.message || 'Could not save.');
      setSaving(false);
    }
  };

  return (
    <Modal
      title={title}
      onClose={saving ? () => {} : onClose}
      footer={
        <>
          <button type="button" className="admin-btn admin-btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" form="admin-entity-form" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : submitLabel || 'Save'}
          </button>
        </>
      }
    >
      {error && <div className="admin-modal-error">{error}</div>}

      <form id="admin-entity-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(next) => setField(field.name, next)}
          />
        ))}
      </form>
    </Modal>
  );
}
