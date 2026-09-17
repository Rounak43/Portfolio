import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2, FiChevronUp, FiChevronDown } from 'react-icons/fi';

import { resolveImage } from '../../lib/assets';

/** Shared label + help wrapper so every field type lines up identically. */
function Field({ label, required, help, children, htmlFor }) {
  return (
    <div className="admin-field">
      {label && (
        <label className={`admin-label ${required ? 'admin-label-required' : ''}`} htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {help && <p className="admin-help">{help}</p>}
    </div>
  );
}

/** Comma- and Enter-driven tag editor backing a string array. */
function TagsInput({ value = [], onChange, placeholder }) {
  const [draft, setDraft] = useState('');

  const commit = (raw) => {
    const entries = raw
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .filter((entry) => !value.includes(entry));

    if (entries.length > 0) onChange([...value, ...entries]);
    setDraft('');
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commit(draft);
    } else if (event.key === 'Backspace' && draft === '' && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="admin-tags">
      {value.map((tag) => (
        <span key={tag} className="admin-tag">
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((entry) => entry !== tag))}
            aria-label={`Remove ${tag}`}
          >
            <FiX size={12} />
          </button>
        </span>
      ))}
      <input
        className="admin-tag-input"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => commit(draft)}
        placeholder={value.length === 0 ? placeholder || 'Type and press Enter' : ''}
      />
    </div>
  );
}

/** A plain string array rendered as one input per row. */
function StringListInput({ value = [], onChange, placeholder }) {
  const setAt = (index, next) => onChange(value.map((entry, i) => (i === index ? next : entry)));
  const removeAt = (index) => onChange(value.filter((_, i) => i !== index));

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="admin-repeater">
      {value.map((entry, index) => (
        <div className="admin-string-row" key={index}>
          <span className="admin-repeater-index">{index + 1}</span>
          <input
            className="admin-input"
            value={entry}
            onChange={(event) => setAt(index, event.target.value)}
            placeholder={placeholder}
          />
          <button
            type="button"
            className="admin-icon-btn"
            onClick={() => move(index, -1)}
            disabled={index === 0}
            aria-label="Move up"
          >
            <FiChevronUp size={15} />
          </button>
          <button
            type="button"
            className="admin-icon-btn"
            onClick={() => move(index, 1)}
            disabled={index === value.length - 1}
            aria-label="Move down"
          >
            <FiChevronDown size={15} />
          </button>
          <button
            type="button"
            className="admin-icon-btn danger"
            onClick={() => removeAt(index)}
            aria-label="Remove"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ))}

      <button type="button" className="admin-btn" onClick={() => onChange([...value, ''])}>
        <FiPlus size={14} /> Add step
      </button>
    </div>
  );
}

/** An editable list of sub-objects, each rendered from its own field list. */
function RepeaterInput({ value = [], onChange, fields, itemLabel, addLabel = 'Add item' }) {
  const [openIndex, setOpenIndex] = useState(null);

  const blank = () =>
    fields.reduce((item, field) => {
      item[field.name] = field.defaultValue ?? defaultFor(field.type);
      return item;
    }, {});

  const setAt = (index, next) => onChange(value.map((entry, i) => (i === index ? next : entry)));
  const removeAt = (index) => onChange(value.filter((_, i) => i !== index));

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setOpenIndex(target);
  };

  return (
    <div className="admin-repeater">
      {value.length === 0 && <div className="admin-repeater-empty">Nothing here yet.</div>}

      {value.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div className="admin-repeater-item" key={index}>
            <div className="admin-repeater-head">
              <span className="admin-repeater-index">{index + 1}</span>
              <button
                type="button"
                className="admin-repeater-summary"
                style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer' }}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {itemLabel?.(item) || `Item ${index + 1}`}
              </button>
              <button
                type="button"
                className="admin-icon-btn"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
              >
                <FiChevronUp size={15} />
              </button>
              <button
                type="button"
                className="admin-icon-btn"
                onClick={() => move(index, 1)}
                disabled={index === value.length - 1}
                aria-label="Move down"
              >
                <FiChevronDown size={15} />
              </button>
              <button
                type="button"
                className="admin-icon-btn danger"
                onClick={() => removeAt(index)}
                aria-label="Remove"
              >
                <FiTrash2 size={14} />
              </button>
              <button
                type="button"
                className="admin-icon-btn"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-label={isOpen ? 'Collapse' : 'Expand'}
              >
                {isOpen ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
              </button>
            </div>

            {isOpen && (
              <div className="admin-repeater-body">
                {fields.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={item[field.name]}
                    onChange={(next) => setAt(index, { ...item, [field.name]: next })}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        className="admin-btn"
        onClick={() => {
          onChange([...value, blank()]);
          setOpenIndex(value.length);
        }}
      >
        <FiPlus size={14} /> {addLabel}
      </button>
    </div>
  );
}

/** The empty value a field type starts from. */
export function defaultFor(type) {
  switch (type) {
    case 'tags':
    case 'stringList':
    case 'repeater':
      return [];
    case 'group':
      return {};
    default:
      return '';
  }
}

/**
 * Renders one field from its descriptor. Descriptors live in
 * contentSchemas.js; this is the only place that knows how each type looks.
 */
export function FormField({ field, value, onChange }) {
  const { name, label, type = 'text', required, help, placeholder, options, rows } = field;
  const id = `admin-field-${name}`;

  switch (type) {
    case 'textarea':
      return (
        <Field label={label} required={required} help={help} htmlFor={id}>
          <textarea
            id={id}
            className="admin-textarea"
            value={value ?? ''}
            rows={rows || 4}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
          />
        </Field>
      );

    case 'select':
      return (
        <Field label={label} required={required} help={help} htmlFor={id}>
          <select
            id={id}
            className="admin-select"
            value={value ?? ''}
            onChange={(event) => onChange(event.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      );

    case 'color':
      return (
        <Field label={label} required={required} help={help} htmlFor={id}>
          <div className="admin-color-row">
            <input
              type="color"
              className="admin-color-swatch"
              // The native picker cannot represent var(--primary), so show a
              // neutral swatch and let the text input carry the real value.
              value={/^#[0-9a-f]{6}$/i.test(value || '') ? value : '#00E5FF'}
              onChange={(event) => onChange(event.target.value)}
              aria-label={`${label} colour picker`}
            />
            <input
              id={id}
              className="admin-input"
              value={value ?? ''}
              onChange={(event) => onChange(event.target.value)}
              placeholder="#00E5FF"
            />
          </div>
        </Field>
      );

    case 'image':
      return (
        <Field label={label} required={required} help={help} htmlFor={id}>
          <div className="admin-image-row">
            {value ? (
              <img className="admin-image-preview" src={resolveImage(value)} alt="" />
            ) : (
              <div className="admin-image-preview admin-image-empty">No image</div>
            )}
            <input
              id={id}
              className="admin-input"
              value={value ?? ''}
              onChange={(event) => onChange(event.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </Field>
      );

    case 'imageList':
      return (
        <Field label={label} required={required} help={help}>
          <RepeaterInput
            value={(value ?? []).map((url) => ({ url }))}
            onChange={(items) => onChange(items.map((item) => item.url))}
            fields={[{ name: 'url', label: 'Image URL', type: 'image' }]}
            itemLabel={(item) => item.url || 'Empty image'}
            addLabel="Add image"
          />
        </Field>
      );

    case 'tags':
      return (
        <Field label={label} required={required} help={help}>
          <TagsInput value={value ?? []} onChange={onChange} placeholder={placeholder} />
        </Field>
      );

    case 'stringList':
      return (
        <Field label={label} required={required} help={help}>
          <StringListInput value={value ?? []} onChange={onChange} placeholder={placeholder} />
        </Field>
      );

    case 'repeater':
      return (
        <Field label={label} required={required} help={help}>
          <RepeaterInput
            value={value ?? []}
            onChange={onChange}
            fields={field.fields}
            itemLabel={field.itemLabel}
            addLabel={field.addLabel}
          />
        </Field>
      );

    case 'group':
      return (
        <Field label={label} required={required} help={help}>
          <div className="admin-group">
            {field.fields.map((child) => (
              <FormField
                key={child.name}
                field={child}
                value={(value ?? {})[child.name]}
                onChange={(next) => onChange({ ...(value ?? {}), [child.name]: next })}
              />
            ))}
          </div>
        </Field>
      );

    default:
      return (
        <Field label={label} required={required} help={help} htmlFor={id}>
          <input
            id={id}
            className="admin-input"
            value={value ?? ''}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
          />
        </Field>
      );
  }
}
