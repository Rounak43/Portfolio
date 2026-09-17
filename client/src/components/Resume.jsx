import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import './Resume.css';

const Resume = ({ onBack }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: 15, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="resume-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background Orbs */}
      <div className="resume-orb orb-primary" />
      <div className="resume-orb orb-secondary" />

      {/* Control Header */}
      <div className="resume-controls no-print">
        <button className="btn-secondary back-btn" onClick={onBack} aria-label="Back to Dashboard">
          <FiArrowLeft /> Back to Dashboard
        </button>
        {/* BASE_URL keeps this correct under the /portfolio/ deploy path —
            a bare "/resume.pdf" 404s on GitHub Pages. */}
        <a
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          target="_blank"
          rel="noopener noreferrer" 
          className="btn-primary view-external-btn"
          aria-label="Open PDF in new tab"
        >
          <FiExternalLink /> Open in New Tab
        </a>
      </div>

      {/* PDF Viewer Container */}
      <div className="pdf-viewer-container glass-card">
        <iframe
          src={`${import.meta.env.BASE_URL}resume.pdf#toolbar=1`}
          title="Rounak Sharma Resume"
          className="pdf-iframe"
        />
      </div>
    </motion.div>
  );
};

export default Resume;
