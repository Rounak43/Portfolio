import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail, FiLinkedin, FiGithub, FiGlobe, FiMapPin, FiSend,
} from 'react-icons/fi';
import './Contact.css';

const contactLinks = [
  {
    icon: <FiMail />,
    label: 'Email',
    value: 'rounaksharma43@gmail.com',
    href: 'mailto:rounaksharma43@gmail.com',
    color: '#00E5FF',
  },
  {
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/rounaksharma43',
    href: 'https://www.linkedin.com/in/rounaksharma43',
    color: '#0A66C2',
  },
  {
    icon: <FiGithub />,
    label: 'GitHub',
    value: 'github.com/Rounak43',
    href: 'https://github.com/Rounak43',
    color: '#E2E8F0',
  },
  {
    icon: <FiGlobe />,
    label: 'Portfolio',
    value: 'rounaksharma.dev',
    href: '#',
    color: '#7B61FF',
  },
  {
    icon: <FiMapPin />,
    label: 'Location',
    value: 'India',
    href: null,
    color: '#FF6B6B',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only — simulate submit
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-orb-1" />
      <div className="contact-orb-2" />

      <motion.h2
        className="section-title"
        {...fadeUp()}
      >
        Let's Connect
      </motion.h2>

      <div className="contact-content">
        {/* Left: Links */}
        <motion.div className="contact-links-col" {...fadeUp(0.1)}>
          <p className="contact-intro">
            I'm always open to exciting opportunities, collaborations, and conversations. 
            Feel free to reach out!
          </p>
          <div className="contact-links">
            {contactLinks.map((link, i) => (
              <motion.div
                key={link.label}
                className="contact-link-item glass-card"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 8, borderColor: link.color }}
                style={{ '--link-color': link.color }}
              >
                <div className="contact-link-icon" style={{ color: link.color }}>
                  {link.icon}
                </div>
                <div className="contact-link-text">
                  <span className="contact-link-label">{link.label}</span>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href !== '#' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="contact-link-value"
                      style={{ color: link.color }}
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span className="contact-link-value" style={{ color: link.color }}>
                      {link.value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div className="contact-form-col" {...fadeUp(0.2)}>
          <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
            <h3 className="form-title">Send a Message</h3>

            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="form-submit btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {submitted ? '✅ Message Sent!' : <><FiSend /> Send Message</>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
