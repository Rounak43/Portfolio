import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useSectionAdmin } from './admin/useSectionAdmin';
import { ItemControls, AddButton } from './admin/ItemControls';
import { EntityForm } from './admin/EntityForm';
import { ConfirmDialog } from './admin/Modal';
import { skillFields } from './admin/contentSchemas';
import './Skills.css';

// Each card animates itself rather than inheriting variants from the grid.
//
// The grid used to orchestrate the entrance with staggerChildren and
// viewport={{ once: true }}. That fires exactly once, so a card added through
// the admin panel afterwards mounted into the parent's `hidden` state and
// never received `visible` — it sat in the DOM at opacity 0, looking like the
// save had failed. Self-animating cards get their own whileInView trigger, and
// the index delay below reproduces the original stagger.
const CARD_STAGGER = 0.1;
const MAX_STAGGER_STEPS = 6;

const Skills = () => {
  const admin = useSectionAdmin('skills');
  const skillCategories = admin.items;

  return (
    <section id="skills" className="skills-section">
      <div className="skills-orb-1" />
      <div className="skills-orb-2" />

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Skills
      </motion.h2>

      <div className="skills-grid">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.id}
            className={`skill-category glass-card ${admin.isAdmin ? 'has-admin-controls' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              // Capped so a long list does not leave later cards waiting.
              delay: Math.min(i, MAX_STAGGER_STEPS) * CARD_STAGGER,
            }}
            whileHover={{
              y: -8,
              boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 25px ${category.color}33`,
              borderColor: category.color + '55',
            }}
            style={{ '--cat-color': category.color }}
          >
            {admin.isAdmin && (
              <ItemControls
                label={category.name}
                onEdit={() => admin.openEdit(category)}
                onDelete={() => admin.requestDelete(category)}
                onMoveUp={() => admin.move(i, -1)}
                onMoveDown={() => admin.move(i, 1)}
                canMoveUp={i > 0}
                canMoveDown={i < skillCategories.length - 1}
              />
            )}

            <div className="skill-cat-header">
              <span className="skill-cat-icon">{category.icon}</span>
              <h3 className="skill-cat-name">{category.name}</h3>
            </div>
            <div className="skill-tags">
              {category.skills.map((skill, idx) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  whileHover={{ scale: 1.08 }}
                  style={{ '--tag-color': category.color }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {admin.isAdmin && <AddButton onClick={admin.openCreate}>Add skill category</AddButton>}

      <AnimatePresence>
        {admin.form && (
          <EntityForm
            key="skill-form"
            title={admin.form.mode === 'edit' ? 'Edit skill category' : 'Add skill category'}
            fields={skillFields}
            item={admin.form.item}
            onSubmit={admin.submitForm}
            onClose={admin.closeForm}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {admin.pendingDelete && (
          <ConfirmDialog
            key="skill-delete"
            title="Delete skill category"
            message={`Permanently delete "${admin.pendingDelete.name}" and all its skills? This cannot be undone.`}
            onConfirm={admin.confirmDelete}
            onCancel={admin.cancelDelete}
            busy={admin.deleting}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
