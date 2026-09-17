import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

import { resolveImage } from '../lib/assets';
import { useSectionAdmin } from './admin/useSectionAdmin';
import { ItemControls, AddButton } from './admin/ItemControls';
import { EntityForm } from './admin/EntityForm';
import { ConfirmDialog } from './admin/Modal';
import { projectFields } from './admin/contentSchemas';
import './Projects.css';

const Projects = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const admin = useSectionAdmin('projects');
  const projects = admin.items;

  return (
    <section id="projects" className="projects-section">
      <div className="projects-orb-1" />
      <div className="projects-orb-2" />

      <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className={`project-card glass-card ${admin.isAdmin ? 'has-admin-controls' : ''}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            onHoverStart={() => setHoveredId(project.id)}
            onHoverEnd={() => setHoveredId(null)}
            whileHover={{ y: -12 }}
            style={{ '--project-color': project.color }}
          >
            {admin.isAdmin && (
              <ItemControls
                label={project.title}
                onEdit={() => admin.openEdit(project)}
                onDelete={() => admin.requestDelete(project)}
                onMoveUp={() => admin.move(i, -1)}
                onMoveDown={() => admin.move(i, 1)}
                canMoveUp={i > 0}
                canMoveDown={i < projects.length - 1}
              />
            )}

            {/* Image */}
            <div className="project-image-wrapper">
              <img
                src={resolveImage(project.image)}
                alt={project.title}
                className={`project-image ${hoveredId === project.id ? 'zoomed' : ''}`}
              />
              <div className="project-image-overlay" />
              {project.status && (
                <span className="project-status-badge" style={{ backgroundColor: project.color }}>
                  {project.status}
                </span>
              )}
              <div
                className="project-glow-border"
                style={{ boxShadow: hoveredId === project.id ? `0 0 30px ${project.color}55` : 'none' }}
              />
            </div>

            {/* Info */}
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              {/* Tech Stack */}
              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t} className="project-tech-tag">{t}</span>
                ))}
              </div>

              {/* Buttons */}
              <div className="project-buttons">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-github"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <FiGithub /> GitHub
                  </a>
                )}
                {/* Hidden when there is no demo yet, rather than linking nowhere. */}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-demo"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {admin.isAdmin && <AddButton onClick={admin.openCreate}>Add project</AddButton>}

      <AnimatePresence>
        {admin.form && (
          <EntityForm
            key="project-form"
            title={admin.form.mode === 'edit' ? 'Edit project' : 'Add project'}
            fields={projectFields}
            item={admin.form.item}
            onSubmit={admin.submitForm}
            onClose={admin.closeForm}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {admin.pendingDelete && (
          <ConfirmDialog
            key="project-delete"
            title="Delete project"
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

export default Projects;
