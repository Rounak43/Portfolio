import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiHeart, FiLock } from 'react-icons/fi';

import { useAuth } from '../context/AuthContext';
import './Footer.css';

const Footer = () => {
  const { isAdmin } = useAuth();

  // Reuses the existing #/admin route that AdminLayer already listens on,
  // so the button is just a shortcut rather than a second sign-in path.
  const openAdminLogin = () => {
    window.location.hash = '/admin';
  };

  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="footer-inner">
        {/* Brand */}
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="footer-logo">RS</span>
          <span className="footer-tagline">AI Engineer & Full Stack Developer</span>
        </motion.div>

        {/* Center */}
        <motion.p
          className="footer-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          © 2026 Rounak Sharma · Built with React <FiHeart className="heart-icon" />
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="footer-socials"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://github.com/Rounak43"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub profile"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/rounaksharma43"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn profile"
          >
            <FiLinkedin size={20} />
          </a>

          {/* Hidden once signed in — the admin bar carries sign-out from there. */}
          {!isAdmin && (
            <button
              type="button"
              className="footer-admin-btn"
              onClick={openAdminLogin}
              aria-label="Administrator sign in"
              title="Administrator sign in"
            >
              <FiLock size={13} /> Admin
            </button>
          )}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
