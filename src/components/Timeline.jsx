import React from 'react';
import { motion } from 'framer-motion';
import './Timeline.css';

const timelineItems = [
  {
    year: '2023',
    title: 'Started Web Development',
    description: 'Began learning HTML, CSS, JavaScript and the foundations of web development.',
    color: '#00E5FF',
    icon: '🌐',
  },
  {
    year: '2024',
    title: 'Learned MERN Stack',
    description: 'Learned MongoDB, Express.js, React, and Node.js to build full-stack applications.',
    color: '#7B61FF',
    icon: '⚡',
  },
  {
    year: '2025',
    title: 'Started AI & Machine Learning',
    description: 'Dived into Machine Learning, TensorFlow, PyTorch and classical ML algorithms.',
    color: '#00FFB2',
    icon: '🧠',
  },
  {
    year: '2025',
    title: 'Built NLP Projects',
    description: 'Developed NLP systems using Transformers, Hugging Face, spaCy and NLTK.',
    color: '#FF6B6B',
    icon: '📝',
  },
  {
    year: '2026',
    title: 'Deep Learning & LLM Applications',
    description: 'Currently learning DL , LLM transformer and LLM pipelines. Making Real World Project using ML , DL and trying to make all without AI so that i will make my coding skill better.',
    color: '#FFB347',
    icon: '🚀',
  },
];

const Timeline = () => {
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
            key={`${item.year}-${i}`}
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
              className="timeline-card glass-card"
              whileHover={{ scale: 1.03, boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${item.color}33` }}
              style={{ '--t-color': item.color }}
            >
              <div className="timeline-year" style={{ color: item.color }}>
                {item.year}
              </div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
