import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit3 } from 'react-icons/fi';

import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { EntityForm } from './admin/EntityForm';
import { aboutFields } from './admin/contentSchemas';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

/**
 * Renders `**text**` as the cyan highlight span the original markup used, so
 * the emphasis survives the move out of hardcoded JSX and into editable text.
 */
function renderHighlighted(paragraph) {
  return paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <span className="highlight" key={index}>
        {part.slice(2, -2)}
      </span>
    ) : (
      part
    )
  );
}

const About = () => {
  const { isAdmin } = useAuth();
  const { about, saveAbout } = useContent();
  const [editing, setEditing] = useState(false);

  const { paragraphs, cards } = about.data;

  return (
    <section id="about" className="about-section">
      {/* Background orbs */}
      <div className="about-orb-1" />
      <div className="about-orb-2" />

      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <div className="about-content">
        {/* Bio */}
        <motion.div
          className="about-bio glass-card"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="about-bio-inner">
            {paragraphs.map((paragraph, index) => (
              <p className="about-text" key={index}>
                {renderHighlighted(paragraph)}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="about-cards">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="about-card glass-card"
              variants={fadeUp}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${card.color}22` }}
              style={{ '--card-color': card.color }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <div className="card-tags">
                {card.tags.map(tag => (
                  <span key={tag} className="card-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="admin-add-row">
          <button className="admin-add-btn" onClick={() => setEditing(true)}>
            <FiEdit3 size={16} /> Edit About section
          </button>
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <EntityForm
            key="about-form"
            title="Edit About section"
            fields={aboutFields}
            item={about.data}
            onSubmit={saveAbout}
            onClose={() => setEditing(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
