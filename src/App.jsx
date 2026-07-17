import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Resume from './components/Resume';

function App() {
  const [loading, setLoading] = useState(true);
  const [showResume, setShowResume] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const loadingProgress = useRef(0);
  const [barWidth, setBarWidth] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Loading screen
  useEffect(() => {
    document.body.classList.add('loading-active');
    const interval = setInterval(() => {
      loadingProgress.current += 2;
      setBarWidth(Math.min(loadingProgress.current, 100));
      if (loadingProgress.current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          document.body.classList.remove('loading-active');
        }, 400);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // Back to top
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-screen"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.div
              className="loading-logo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Rounak Sharma
            </motion.div>
            <div className="loading-bar-container">
              <motion.div
                className="loading-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${barWidth}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="loading-dots">
              <span /><span /><span />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App */}
      {!loading && (
        <div className="app">
          <AnimatePresence mode="wait">
            {showResume ? (
              <Resume
                key="resume"
                onBack={() => {
                  window.scrollTo({ top: 0 });
                  setShowResume(false);
                }}
              />
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Navbar />
                <Hero
                  onShowResume={() => {
                    window.scrollTo({ top: 0 });
                    setShowResume(true);
                  }}
                />
                <About />
                <Projects />
                <Skills />
                <Timeline />
                <Contact />
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to Top */}
          <AnimatePresence>
            {showTop && !showResume && (
              <motion.button
                className="back-to-top"
                onClick={scrollToTop}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                aria-label="Back to top"
              >
                <FiArrowUp />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default App;
