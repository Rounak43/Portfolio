import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const cards = [
  {
    icon: '🎯',
    title: 'Full Stack Development',
    tags: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    color: 'var(--primary)',
  },
  {
    icon: '🤖',
    title: 'Artificial Intelligence',
    tags: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'Large Language Models'],
    color: 'var(--secondary)',
  },
  {
    icon: '🚀',
    title: 'Currently Learning',
    tags: ['MLOps', 'Agentic AI', 'RAG', 'Docker', 'Cloud Deployment'],
    color: '#00FFB2',
  },
];

const About = () => {
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
            <p className="about-text">
              I am <span className="highlight">Rounak Sharma</span>, a passionate{' '}
              <span className="highlight">Full Stack Developer</span> and{' '}
              <span className="highlight">AI/ML Engineer</span> currently pursuing Computer Science
              with specialization in <span className="highlight">Artificial Intelligence & Machine Learning</span>.
            </p>
            <p className="about-text">
              I enjoy building scalable web applications, AI-powered products, NLP systems, and deep
              learning projects. I love solving real-world problems through technology and continuously
              learning modern frameworks and tools.
            </p>
            <p className="about-text">
              I am actively looking for{' '}
              <span className="highlight">Software Development</span>,{' '}
              <span className="highlight">AI Engineer</span>,{' '}
              <span className="highlight">Machine Learning Engineer</span>, and{' '}
              <span className="highlight">Full Stack Developer</span> opportunities.
            </p>
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
    </section>
  );
};

export default About;
