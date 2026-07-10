import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';
import project4 from '../assets/project4.jpg';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'AI Knee MRI Analyzer',
    description:
      'Recently started Deep Learning based system for detecting ACL tears, meniscus injuries and knee abnormalities from MRI scans with high accuracy using CNNs.',
    image: project1,
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
    github: 'https://github.com/Rounak43',
    demo: '#',
    color: '#00E5FF',
    status: 'Recently Started',
  },
  {
    id: 2,
    title: 'Smart Placement Performance Platform',
    description:
      'AI-powered placement preparation platform featuring roadmap generation, resume analysis, progress tracking and interview preparation tools.',
    image: project2,
    tech: ['React', 'Node.js',  'Firebase'],
    github: 'https://github.com/Rounak43',
    demo: '#',
    color: '#7B61FF',
  },
  {
    id: 3,
    title: 'Automated Active Recall Generator',
    description:
      'Generates flashcards, quizzes and summaries automatically from PDFs using NLP and Transformers for smarter studying.',
    image: project3,
    tech: ['React', 'FastAPI', 'Transformers', 'HuggingFace'],
    github: 'https://github.com/Rounak43',
    demo: '#',
    color: '#00FFB2',
  },
  {
    id: 4,
    title: 'AI Car Care Platform',
    description:
      'Platform connecting customers and mechanics with AI-powered issue diagnosis, real-time chat, and seamless service booking.',
    image: project4,
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Rounak43',
    demo: '#',
    color: '#FF6B6B',
  },
];

const Projects = () => {
  const [hoveredId, setHoveredId] = useState(null);

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
            className="project-card glass-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            onHoverStart={() => setHoveredId(project.id)}
            onHoverEnd={() => setHoveredId(null)}
            whileHover={{ y: -12 }}
            style={{ '--project-color': project.color }}
          >
            {/* Image */}
            <div className="project-image-wrapper">
              <img
                src={project.image}
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
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn project-btn-github"
                  aria-label={`GitHub repository for ${project.title}`}
                >
                  <FiGithub /> GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn project-btn-demo"
                  aria-label={`Live demo for ${project.title}`}
                >
                  <FiExternalLink /> Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
