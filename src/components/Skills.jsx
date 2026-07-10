import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    name: 'Frontend',
    icon: '🎨',
    color: '#00E5FF',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    color: '#7B61FF',
    skills: ['Node.js', 'Express.js', 'REST API'],
  },
  {
    name: 'Database',
    icon: '🗄️',
    color: '#00FFB2',
    skills: ['MongoDB', 'Firebase'],
  },
  {
    name: 'Programming',
    icon: '💻',
    color: '#FF6B6B',
    skills: ['Python', 'Java', 'JavaScript'],
  },
  {
    name: 'AI / ML',
    icon: '🧠',
    color: '#00E5FF',
    skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-Learn'],
  },
  {
    name: 'NLP',
    icon: '📝',
    color: '#7B61FF',
    skills: ['Transformers', 'spaCy', 'NLTK', 'Hugging Face'],
  },
  {
    name: 'Tools',
    icon: '🛠️',
    color: '#FFB347',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Docker'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Skills = () => {
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

      <motion.div
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.name}
            className="skill-category glass-card"
            variants={cardVariants}
            whileHover={{
              y: -8,
              boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 25px ${category.color}33`,
              borderColor: category.color + '55',
            }}
            style={{ '--cat-color': category.color }}
          >
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
      </motion.div>
    </section>
  );
};

export default Skills;
