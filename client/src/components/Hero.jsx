import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiEye, FiChevronDown } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';
import { useContent } from '../context/ContentContext';
import { resumeDownloadUrl } from '../lib/resume';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const { about } = useContent();

  // BASE_URL keeps the bundled copy correct under the /portfolio/ deploy
  // path — a bare "/resume.pdf" 404s on GitHub Pages.
  const resumeHref = resumeDownloadUrl(
    about.data?.resumeUrl,
    `${import.meta.env.BASE_URL}resume.pdf`
  );

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      // Draw subtle connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Glow Orbs */}
      <div className="hero-orb orb-cyan" />
      <div className="hero-orb orb-purple" />

      <div className="hero-content">
        {/* Greeting */}
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hello, I'm
        </motion.p>

        {/* Profile Image */}
        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
        >
          <div className="hero-image-ring">
            <div className="hero-image-inner">
              <img
                src={profileImg}
                alt="Rounak Sharma - AI Engineer and Full Stack Developer"
                className="hero-image"
              />
            </div>
          </div>
          <div className="hero-image-glow" />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Rounak Sharma
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          className="hero-typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <TypeAnimation
            sequence={[
              'Full Stack Developer', 2000,
              'AI/ML Engineer', 2000,
              'Deep Learning Enthusiast', 2000,
              'LLM Developer', 2000,
              'NLP Developer', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="typing-text"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {/* No target="_blank": both the Drive download endpoint and the
              bundled PDF respond with an attachment, so the browser saves the
              file without navigating away or flashing an empty tab. */}
          <a
            href={resumeHref}
            download="Rounak_Sharma_Resume.pdf"
            rel="noopener"
            className="btn-primary"
            aria-label="Download Resume"
          >
            <FiDownload /> Resume
          </a>
          <a
            href="#projects"
            className="btn-secondary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            aria-label="View Projects"
          >
            <FiEye /> View Projects
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="scroll-indicator"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll to About section"
      >
        <span className="scroll-label">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FiChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
