import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Competitions', href: '#competitions' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(item => ({
        label: item.label,
        el: document.querySelector(item.href),
      }));
      const offset = window.innerHeight * 0.4;
      let current = 'Home';
      sections.forEach(({ label, el }) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) current = label;
        }
      });
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href, label) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(label);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${active === item.label ? 'nav-item-active' : ''}`}
            onClick={() => handleNav(item.href, item.label)}
            aria-current={active === item.label ? 'page' : undefined}
          >
            {item.label}
          </button>
        ))}

        {/* Mobile Menu Toggle */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`mobile-nav-item ${active === item.label ? 'mobile-nav-item-active' : ''}`}
                onClick={() => handleNav(item.href, item.label)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
