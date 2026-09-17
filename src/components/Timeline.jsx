import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useSectionAdmin } from './admin/useSectionAdmin';
import { ItemControls, AddButton } from './admin/ItemControls';
import { EntityForm } from './admin/EntityForm';
import { ConfirmDialog } from './admin/Modal';
import { timelineFields } from './admin/contentSchemas';
import './Timeline.css';

const Timeline = () => {
  const admin = useSectionAdmin('timeline');
  const timelineItems = admin.items;

  return (
    <section id="timeline" className="timeline-section">
      <div className="timeline-orb-1" />
      <div className="timeline-orb-2" />

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        My Journey
      </motion.h2>

      <div className="timeline-container">
        {/* Central Line */}
        <motion.div
          className="timeline-line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />

        {timelineItems.map((item, i) => (
          <motion.div
            key={item.id}
            className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
          >
            {/* Dot */}
            <div className="timeline-dot" style={{ background: item.color, boxShadow: `0 0 16px ${item.color}88` }}>
              <span>{item.icon}</span>
            </div>

            {/* Card */}
            <motion.div
              className={`timeline-card glass-card ${admin.isAdmin ? 'has-admin-controls' : ''}`}
              whileHover={{ scale: 1.03, boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${item.color}33` }}
              style={{ '--t-color': item.color }}
            >
              {admin.isAdmin && (
                <ItemControls
                  label={item.title}
                  onEdit={() => admin.openEdit(item)}
                  onDelete={() => admin.requestDelete(item)}
                  onMoveUp={() => admin.move(i, -1)}
                  onMoveDown={() => admin.move(i, 1)}
                  canMoveUp={i > 0}
                  canMoveDown={i < timelineItems.length - 1}
                />
              )}

              <div className="timeline-year" style={{ color: item.color }}>
                {item.year}
              </div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {admin.isAdmin && <AddButton onClick={admin.openCreate}>Add timeline entry</AddButton>}

      <AnimatePresence>
        {admin.form && (
          <EntityForm
            key="timeline-form"
            title={admin.form.mode === 'edit' ? 'Edit timeline entry' : 'Add timeline entry'}
            fields={timelineFields}
            item={admin.form.item}
            onSubmit={admin.submitForm}
            onClose={admin.closeForm}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {admin.pendingDelete && (
          <ConfirmDialog
            key="timeline-delete"
            title="Delete timeline entry"
            message={`Permanently delete "${admin.pendingDelete.title}"? This cannot be undone.`}
            onConfirm={admin.confirmDelete}
            onCancel={admin.cancelDelete}
            busy={admin.deleting}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Timeline;
