import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin,
  FiCalendar,
  FiAward,
  FiGithub,
  FiExternalLink,
  FiUsers,
  FiCpu,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiLinkedin,
  FiBookOpen,
  FiFileText,
  FiCheckCircle,
  FiArrowLeft,
  FiLayers,
  FiActivity,
  FiInfo,
  FiFilePlus,
  FiBriefcase,
  FiDatabase,
  FiTerminal,
  FiArrowRight,
  FiGlobe,
} from 'react-icons/fi';
import { competitionsData } from '../data/competitions';
import './Competitions.css';

// Framer Motion presets
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

// Animated Counter for Achievements
const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const numericVal = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const isNumber = !isNaN(numericVal);

  useEffect(() => {
    if (!isNumber) return;
    let start = 0;
    const end = numericVal;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.max(Math.floor(totalMiliseconds / end), 25);
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericVal, isNumber, duration]);

  if (!isNumber) return value;
  return value.replace(String(numericVal), String(count));
};

const CompetitionDetailView = ({
  activeComp,
  carouselIndex,
  carouselDirection,
  slideVariants,
  handlePrevSlide,
  handleNextSlide,
  handleDotClick,
  setIsHovered,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  setLightboxImage,
}) => {
  // Timeline Animation
  const timelineContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const timelineItem = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: 'spring' } }
  };

  // Fade Up Cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  // Hover badges
  const badgeVariants = {
    hover: { scale: 1.15, transition: { duration: 0.2 } }
  };

  const iconMap = {
    globe: <FiGlobe size={24} />,
    terminal: <FiTerminal size={24} />,
    cpu: <FiCpu size={24} />,
    database: <FiDatabase size={24} />,
    file: <FiFileText size={24} />,
    search: <FiActivity size={24} />,
    layers: <FiLayers size={24} />
  };

  return (
    <div className="odoo-custom-detail">
      {/* Hero Glassmorphic Project Card */}
      <div className="odoo-hero-card">
        <div className="odoo-hero-image-bg">
          <img src={activeComp.images[0]} alt={activeComp.projectName} />
          <div className="odoo-hero-tint" />
        </div>
        <div className="odoo-hero-content-overlay glass-card">
          <span className="odoo-hero-badge">Featured Project</span>
          <h2 className="odoo-project-name">{activeComp.projectName}</h2>
          <p className="odoo-project-tagline">“ {activeComp.projectTagline} ”</p>
        </div>
      </div>

      {/* Header Info */}
      <div className="comp-expanded-header">
        <div className="comp-expanded-title-row">
          <h3 className="comp-expanded-title">{activeComp.title}</h3>
          <span className={`comp-status-badge ${activeComp.status.toLowerCase().replace(/[^a-z]/g, '')} blinking-badge`}>
            {activeComp.statusText}
          </span>
        </div>
        <div className="comp-expanded-meta-grid">
          <div className="comp-expanded-meta-item">
            <FiCalendar /> <span><strong>{activeComp.upcomingEvent ? activeComp.upcomingEvent : 'Final Round'}:</strong> {activeComp.upcomingDate ? activeComp.upcomingDate : activeComp.finalRound}</span>
          </div>
          <div className="comp-expanded-meta-item">
            <FiMapPin /> <span>{activeComp.location}</span>
          </div>
          <div className="comp-expanded-meta-item">
            <FiBriefcase /> <span>{activeComp.organizer}</span>
          </div>
          <div className="comp-expanded-meta-item">
            <FiClock /> <span><strong>{activeComp.id === 'isro-hackathon-2026' ? 'Stage' : 'Virtual Dev'}:</strong> {activeComp.duration}</span>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="odoo-section timeline-container-section">
        <h4 className="odoo-section-title">
          <FiCalendar /> Hackathon Journey Timeline
        </h4>
        <motion.div
          className="odoo-timeline-flow"
          variants={timelineContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {activeComp.timeline.map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.div className={`odoo-timeline-node ${step.status}`} variants={timelineItem}>
                <div className="odoo-node-circle">
                  {step.status === 'completed' ? '✓' : '○'}
                </div>
                <div className="odoo-node-label">{step.label}</div>
              </motion.div>
              {idx < activeComp.timeline.length - 1 && (
                <motion.div className="odoo-timeline-connector" variants={timelineItem}>
                  <div className="odoo-connector-line" />
                  <FiArrowRight className="odoo-connector-arrow" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Double Column Grid */}
      <div className="comp-expanded-grid">
        
        {/* Main Content (Left) */}
        <div className="comp-expanded-main">
          
          {/* Problem Statement & Journey */}
          <div className="comp-detail-block odoo-overview-block">
            <h4 className="comp-detail-title-line">
              <FiInfo /> Problem Statement & Objective
            </h4>
            <div className="odoo-problem-card">
              <p className="comp-detail-desc-text">
                {activeComp.problemStatement}
              </p>
            </div>
            
            <div className="odoo-overview-card" style={{ marginTop: '20px' }}>
              <h5 className="odoo-subheading">Project Overview</h5>
              <p className="comp-detail-desc-text">
                {activeComp.description}
              </p>
              <p className="comp-detail-desc-text">
                {activeComp.solution}
              </p>
            </div>
          </div>

          {/* Why Our Approach is Different (If defined) */}
          {activeComp.whyDifferent && (
            <div className="comp-detail-block">
              <h4 className="comp-detail-title-line">
                <FiLayers /> Why Our Approach is Different
              </h4>
              <div className="odoo-features-grid">
                {activeComp.whyDifferent.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="odoo-feature-card glass-card"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <div className="odoo-feature-header">
                      <span className="odoo-feature-icon">💡</span>
                      <h5 className="odoo-feature-title">{item.title}</h5>
                    </div>
                    <p className="comp-detail-desc-text" style={{ fontSize: '0.85rem' }}>
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features (Modern animated cards) */}
          <div className="comp-detail-block">
            <h4 className="comp-detail-title-line">
              <FiLayers /> Key Features
            </h4>
            <div className="odoo-features-grid">
              {activeComp.keyFeatures.map((feat, idx) => (
                <motion.div
                  key={idx}
                  className="odoo-feature-card glass-card"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="odoo-feature-header">
                    <span className="odoo-feature-icon">{feat.icon}</span>
                    <h5 className="odoo-feature-title">{feat.title}</h5>
                  </div>
                  <ul className="odoo-feature-points">
                    {feat.points.map((pt, pIdx) => (
                      <li key={pIdx}>
                        <span className="odoo-bullet">•</span> {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Proposed Process Flow (If defined) */}
          {activeComp.processFlow && (
            <div className="comp-detail-block">
              <h4 className="comp-detail-title-line">
                <FiActivity /> Proposed Process Flow
              </h4>
              <div className="odoo-architecture-section glass-card" style={{ padding: '24px 20px' }}>
                <div className="odoo-timeline-flow" style={{ flexWrap: 'wrap', gap: '16px 8px', padding: '20px', justifyContent: 'center' }}>
                  {activeComp.processFlow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="odoo-timeline-node completed" style={{ flex: 'none', margin: '4px 0' }}>
                        <div className="odoo-node-circle" style={{ width: '28px', height: '28px', fontSize: '0.8rem', margin: '0 auto' }}>
                          {idx + 1}
                        </div>
                        <div className="odoo-node-label" style={{ fontSize: '0.8rem', maxWidth: '140px', marginTop: '6px', textAlign: 'center' }}>{step}</div>
                      </div>
                      {idx < activeComp.processFlow.length - 1 && (
                        <div className="odoo-timeline-connector" style={{ flexGrow: 0, padding: '0 4px', display: 'flex', alignItems: 'center' }}>
                          <FiArrowRight className="odoo-connector-arrow" style={{ position: 'static' }} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Project Architecture (Dedicated Architecture Section) */}
          {activeComp.architectureFlow && (
            <div className="comp-detail-block">
              <h4 className="comp-detail-title-line">
                <FiCpu /> Project Architecture Flow
              </h4>
              <div className="odoo-architecture-section glass-card">
                <div className="odoo-architecture-desc">
                  <p>
                    The proposed framework utilizes the following technical pipeline:
                  </p>
                </div>
                <div className="odoo-arch-flow-diagram">
                  {activeComp.architectureFlow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <motion.div 
                        className="odoo-arch-box"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.15 }}
                      >
                        <div className="odoo-arch-icon-wrapper">{iconMap[step.iconType] || <FiCpu size={24} />}</div>
                        <div className="odoo-arch-info">
                          <h6>{step.title}</h6>
                          <span>{step.subtitle}</span>
                          <small className="odoo-arch-tech">{step.tech}</small>
                        </div>
                      </motion.div>

                      {idx < activeComp.architectureFlow.length - 1 && (
                        <div className="odoo-arch-arrow-container">
                          <svg className="odoo-arch-svg-line" viewBox="0 0 100 40">
                            <motion.path
                              d="M 50 0 L 50 40"
                              stroke="var(--secondary)"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray="8 4"
                              initial={{ strokeDashoffset: 100 }}
                              animate={{ strokeDashoffset: 0 }}
                              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                            />
                            <polygon points="50,40 45,32 55,32" fill="var(--secondary)" />
                          </svg>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Implementation Plan (If defined) */}
          {activeComp.implementationPlan && (
            <div className="comp-detail-block">
              <h4 className="comp-detail-title-line">
                <FiLayers /> Project Implementation
              </h4>
              <div className="odoo-overview-card">
                <p className="comp-detail-desc-text" style={{ color: 'var(--primary)', fontWeight: '600', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  {activeComp.implementationPlan.text}
                </p>
                <div className="odoo-ach-grid" style={{ marginTop: '20px' }}>
                  {activeComp.implementationPlan.placeholders.map((pl, idx) => (
                    <div key={idx} className="odoo-ach-stat-card glass-card" style={{ padding: '14px 10px' }}>
                      <span className="odoo-ach-val" style={{ fontSize: '0.92rem' }}>{pl.value}</span>
                      <span className="odoo-ach-lbl" style={{ fontSize: '0.68rem', marginTop: '4px' }}>{pl.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar (Right) */}
        <div className="comp-expanded-sidebar">
          
          {/* My Contribution Card (Highlighted) */}
          <div className="comp-detail-block">
            <h4 className="comp-detail-title-line">
              <FiAward /> My Contribution
            </h4>
            <motion.div 
              className="odoo-contribution-card highlighted-gradient-card"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="odoo-contribution-glow" />
              <h5 className="odoo-contribution-title">My Contribution</h5>
              <p className="comp-detail-desc-text">
                {activeComp.myContribution}
              </p>
            </motion.div>
          </div>

          {/* Achievements (Animated stats cards with Count Up) */}
          <div className="comp-detail-block">
            <h4 className="comp-detail-title-line">
              <FiActivity /> Current Status
            </h4>
            <div className="odoo-ach-grid">
              {activeComp.achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  className="odoo-ach-stat-card glass-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="odoo-ach-badge-row">
                    <span className="odoo-ach-emoji">{ach.badge}</span>
                  </div>
                  <span className="odoo-ach-val">
                    <AnimatedCounter value={ach.value} />
                  </span>
                  <span className="odoo-ach-lbl">{ach.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Automatic Image Gallery Carousel */}
          {activeComp.images && activeComp.images.length > 0 && (
            <div className="comp-detail-block">
              <h4 className="comp-detail-title-line">
                <FiLayers /> Project Gallery Slider
              </h4>
              <div
                className="comp-detail-carousel"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="comp-carousel-inner"
                  onClick={() => setLightboxImage(activeComp.images[carouselIndex])}
                >
                  <AnimatePresence initial={false} custom={carouselDirection}>
                    <motion.img
                      key={carouselIndex}
                      src={activeComp.images[carouselIndex]}
                      alt={`${activeComp.title} Gallery ${carouselIndex + 1}`}
                      className="comp-carousel-slide"
                      custom={carouselDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    />
                  </AnimatePresence>
                </div>

                <button className="comp-carousel-btn prev" onClick={(e) => handlePrevSlide(e)}>
                  <FiChevronLeft size={20} />
                </button>
                <button className="comp-carousel-btn next" onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}>
                  <FiChevronRight size={20} />
                </button>

                <div className="comp-carousel-dots">
                  {activeComp.images.map((_, idx) => (
                    <button
                      key={idx}
                      className={`comp-carousel-dot ${idx === carouselIndex ? 'active' : ''}`}
                      onClick={(e) => handleDotClick(e, idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack badging */}
          <div className="comp-detail-block">
            <h4 className="comp-detail-title-line">
              <FiCpu /> Technologies Used
            </h4>
            <div className="comp-badge-cloud">
              {activeComp.technologies.map((tech, idx) => (
                <motion.span
                  key={tech}
                  className="comp-tech-badge"
                  variants={badgeVariants}
                  whileHover="hover"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Team Members (Beautiful Profile Cards with GitHub & LinkedIn) */}
          <div className="comp-detail-block">
            <h4 className="comp-detail-title-line">
              <FiUsers /> Team Members
            </h4>
            <div className="comp-team-list">
              {activeComp.teamMembers.map((member, idx) => (
                <div key={idx} className="comp-team-card odoo-team-card">
                  <div className="comp-team-header">
                    <div className="comp-team-avatar odoo-team-avatar-placeholder">
                      {member.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div className="comp-team-basic">
                      <span className="comp-team-name">{member.name}</span>
                      <span className="comp-team-role">{member.role}</span>
                    </div>
                    <div className="comp-team-links">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="comp-team-link"
                        aria-label="GitHub Link"
                      >
                        <FiGithub />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="comp-team-link"
                        aria-label="LinkedIn Link"
                      >
                        <FiLinkedin />
                      </a>
                    </div>
                  </div>
                  <p className="comp-team-contribution">
                    <strong>Responsibilities:</strong> {member.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          {activeComp.resources && (
            <div className="comp-detail-block">
              <h4 className="comp-detail-title-line">
                <FiFilePlus /> Project Resources
              </h4>
              <div className="comp-resources-list">
                {activeComp.resources.map((res, idx) => {
                  const isComingSoon = res.status === 'Coming Soon' || res.status === 'If shortlisted';
                  return (
                    <a
                      key={idx}
                      href={isComingSoon ? undefined : res.url}
                      target={isComingSoon ? undefined : "_blank"}
                      rel={isComingSoon ? undefined : "noopener noreferrer"}
                      className={`comp-resource-btn ${isComingSoon ? 'disabled' : 'github'}`}
                      style={isComingSoon ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                    >
                      {res.label.toLowerCase().includes('github') ? <FiGithub /> : 
                       res.label.toLowerCase().includes('presentation') ? <FiFileText /> :
                       res.label.toLowerCase().includes('certificate') ? <FiAward /> :
                       res.label.toLowerCase().includes('linkedin') ? <FiLinkedin /> : <FiExternalLink />}
                      {res.label} {res.status ? `(${res.status})` : ''}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

const Competitions = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const sectionRef = useRef(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const activeComp = competitionsData.find((c) => c.id === expandedId);

  // Scroll to section when expanding or collapsing
  const handleExpand = (id) => {
    setExpandedId(id);
    setCarouselIndex(0);
    setCarouselDirection(0);
    setTimeout(() => {
      const offset = 80; // height of sticky navbar
      const element = sectionRef.current;
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 150);
  };

  const handleCollapse = () => {
    setExpandedId(null);
    setTimeout(() => {
      const offset = 80;
      const element = sectionRef.current;
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 150);
  };

  // Keyboard close support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else if (expandedId) {
          handleCollapse();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedId, lightboxImage]);

  // Autoplay carousel
  useEffect(() => {
    if (!activeComp || isHovered) return;

    const timer = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [activeComp, carouselIndex, isHovered]);

  // Carousel functions
  const handlePrevSlide = (e) => {
    e.stopPropagation();
    if (!activeComp) return;
    setCarouselDirection(-1);
    setCarouselIndex((prev) => (prev === 0 ? activeComp.images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (!activeComp) return;
    setCarouselDirection(1);
    setCarouselIndex((prev) => (prev === activeComp.images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e, idx) => {
    e.stopPropagation();
    if (!activeComp) return;
    setCarouselDirection(idx > carouselIndex ? 1 : -1);
    setCarouselIndex(idx);
  };

  // Swipe handling
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) {
      handleNextSlide();
    } else if (distance < -50) {
      setCarouselDirection(-1);
      setCarouselIndex((prev) => (prev === 0 ? activeComp.images.length - 1 : prev - 1));
    }
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  // Framer Motion slide variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section id="competitions" className="competitions-section" ref={sectionRef}>
      <div className="competitions-orb-1" />
      <div className="competitions-orb-2" />

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        🏆 Competitions & Hackathons
      </motion.h2>

      <div style={{ position: 'relative', minHeight: '400px' }}>
        <AnimatePresence mode="wait">
          {!expandedId ? (
            /* Master View Grid */
            <motion.div
              key="grid"
              className="competitions-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {competitionsData.map((comp) => (
                <motion.div
                  key={comp.id}
                  layoutId={`comp-card-container-${comp.id}`}
                  className="competition-card glass-card"
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                >
                  <div className="comp-header">
                    <div className="comp-icon-title">
                      <div className="comp-icon">
                        <FiAward />
                      </div>
                      <h3 className="comp-title">{comp.title}</h3>
                    </div>
                    <span
                      className={`comp-status-badge ${comp.status.toLowerCase().replace(/[^a-z]/g, '')}`}
                    >
                      {comp.status}
                    </span>
                  </div>

                  <div className="comp-meta">
                    <div className="comp-meta-item">
                      <FiCalendar size={13} />
                      <span>{comp.date}</span>
                    </div>
                    <div className="comp-meta-item">
                      <FiMapPin size={13} />
                      <span>{comp.location}</span>
                    </div>
                  </div>

                  <p className="comp-desc">{comp.shortDescription || comp.description}</p>

                  <div className="comp-tags">
                    {comp.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="comp-tag">
                        {tech}
                      </span>
                    ))}
                    {comp.technologies.length > 4 && (
                      <span className="comp-tag">+{comp.technologies.length - 4} more</span>
                    )}
                  </div>

                  <button className="comp-view-btn" onClick={() => handleExpand(comp.id)}>
                    View Details <FiExternalLink size={14} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Detailed Expanded View */
            <motion.div
              key="detail"
              layoutId={`comp-card-container-${expandedId}`}
              className="comp-expanded-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <button className="comp-back-btn" onClick={handleCollapse}>
                <FiArrowLeft size={16} /> Back to Competitions
              </button>

              {activeComp.id === 'odoo-hackathon-2026' || activeComp.id === 'isro-hackathon-2026' ? (
                <CompetitionDetailView
                  activeComp={activeComp}
                  carouselIndex={carouselIndex}
                  carouselDirection={carouselDirection}
                  slideVariants={slideVariants}
                  handlePrevSlide={handlePrevSlide}
                  handleNextSlide={handleNextSlide}
                  handleDotClick={handleDotClick}
                  setIsHovered={setIsHovered}
                  handleTouchStart={handleTouchStart}
                  handleTouchMove={handleTouchMove}
                  handleTouchEnd={handleTouchEnd}
                  setLightboxImage={setLightboxImage}
                />
              ) : (
                <>
                  {/* Hero Banner */}
              <div className="comp-hero-banner">
                <img
                  src={activeComp.images[0]}
                  alt={activeComp.title}
                  className="comp-hero-img"
                />
                <div className="comp-hero-overlay" />
              </div>

              {/* Header */}
              <div className="comp-expanded-header">
                <div className="comp-expanded-title-row">
                  <h3 className="comp-expanded-title">{activeComp.title}</h3>
                  <span
                    className={`comp-status-badge ${activeComp.status.toLowerCase().replace(/[^a-z]/g, '')}`}
                  >
                    {activeComp.status}
                  </span>
                </div>
                <div className="comp-expanded-meta-grid">
                  <div className="comp-expanded-meta-item">
                    <FiCalendar /> <span>{activeComp.date}</span>
                  </div>
                  <div className="comp-expanded-meta-item">
                    <FiMapPin /> <span>{activeComp.location}</span>
                  </div>
                  <div className="comp-expanded-meta-item">
                    <FiBriefcase /> <span>{activeComp.organizer}</span>
                  </div>
                  <div className="comp-expanded-meta-item">
                    <FiClock /> <span>{activeComp.duration}</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery Carousel */}
              {activeComp.images && activeComp.images.length > 0 && (
                <div
                  className="comp-detail-carousel"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="comp-carousel-inner"
                    onClick={() => setLightboxImage(activeComp.images[carouselIndex])}
                  >
                    <AnimatePresence initial={false} custom={carouselDirection}>
                      <motion.img
                        key={carouselIndex}
                        src={activeComp.images[carouselIndex]}
                        alt={`${activeComp.title} Gallery ${carouselIndex + 1}`}
                        className="comp-carousel-slide"
                        custom={carouselDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      />
                    </AnimatePresence>
                  </div>

                  <button className="comp-carousel-btn prev" onClick={(e) => handlePrevSlide(e)}>
                    <FiChevronLeft size={20} />
                  </button>
                  <button className="comp-carousel-btn next" onClick={handleNextSlide}>
                    <FiChevronRight size={20} />
                  </button>

                  <div className="comp-carousel-dots">
                    {activeComp.images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`comp-carousel-dot ${idx === carouselIndex ? 'active' : ''}`}
                        onClick={(e) => handleDotClick(e, idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Master-Detail Columns */}
              <div className="comp-expanded-grid">
                {/* Main Content (Left) */}
                <div className="comp-expanded-main">
                  {/* About */}
                  <div className="comp-detail-block">
                    <h4 className="comp-detail-title-line">
                      <FiInfo /> About Competition
                    </h4>
                    <p className="comp-detail-desc-text">
                      <strong>The Hackathon:</strong> {activeComp.description}
                    </p>
                    <p className="comp-detail-desc-text">
                      <strong>Problem Statement:</strong> {activeComp.problemStatement}
                    </p>
                    <p className="comp-detail-desc-text">
                      <strong>Theme / Objective:</strong> Building a highly optimized solution to automate, digitize and parse complex workflows under strict time bounds.
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="comp-detail-block">
                    <h4 className="comp-detail-title-line">
                      <FiLayers /> Our Solution
                    </h4>
                    <p className="comp-detail-desc-text">{activeComp.solution}</p>
                  </div>

                  {/* Architecture */}
                  {activeComp.architectureImage && (
                    <div className="comp-detail-block">
                      <h4 className="comp-detail-title-line">
                        <FiCpu /> Architecture & System Design
                      </h4>
                      <div className="comp-architecture-wrapper">
                        <div
                          className="comp-architecture-img-container"
                          onClick={() => setLightboxImage(activeComp.architectureImage)}
                          style={{ cursor: 'zoom-in' }}
                        >
                          <img
                            src={activeComp.architectureImage}
                            alt="System Architecture Diagram"
                            className="comp-architecture-img"
                          />
                        </div>
                        <p className="comp-detail-desc-text">
                          Features modular architecture with client-side UI states decoupled from backend worker controllers. Standard RESTful channels support fast communications and data persistence.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* My Contribution */}
                  <div className="comp-detail-block">
                    <h4 className="comp-detail-title-line">
                      <FiAward /> My Contribution
                    </h4>
                    <div className="comp-contribution-card glass-card">
                      <p className="comp-detail-desc-text" style={{ color: 'var(--text)' }}>
                        {activeComp.myContribution}
                      </p>
                    </div>
                  </div>

                  {/* Challenges Faced */}
                  {activeComp.challenges && activeComp.challenges.length > 0 && (
                    <div className="comp-detail-block">
                      <h4 className="comp-detail-title-line">
                        <FiActivity /> Challenges Faced
                      </h4>
                      <div className="comp-challenges-list">
                        {activeComp.challenges.map((chal, idx) => (
                          <div key={idx} className="comp-challenge-card">
                            <span className="comp-challenge-title">{chal.title}</span>
                            <p className="comp-challenge-desc">{chal.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What I Learned */}
                  {activeComp.learnings && activeComp.learnings.length > 0 && (
                    <div className="comp-detail-block">
                      <h4 className="comp-detail-title-line">
                        <FiBookOpen /> What I Learned
                      </h4>
                      <div className="comp-learnings-list">
                        {activeComp.learnings.map((learn, idx) => (
                          <div key={idx} className="comp-learning-item">
                            <span className="comp-learning-icon">✓</span>
                            <span className="comp-learning-text">{learn}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar (Right) */}
                <div className="comp-expanded-sidebar">
                  {/* Statistics */}
                  {activeComp.statistics && (
                    <div className="comp-detail-block">
                      <h4 className="comp-detail-title-line">
                        <FiActivity /> Statistics
                      </h4>
                      <div className="comp-sidebar-stats">
                        {activeComp.statistics.map((stat, idx) => (
                          <div key={idx} className="comp-sidebar-stat-card">
                            <span className="comp-sidebar-stat-val">{stat.value}</span>
                            <span className="comp-sidebar-stat-lbl">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {activeComp.achievement && (
                    <div className="comp-detail-block">
                      <h4 className="comp-detail-title-line">
                        <FiAward /> Achievement
                      </h4>
                      <div className="comp-achievement-card">
                        <div className="comp-achievement-icon">🏆</div>
                        <div className="comp-achievement-info">
                          <span className="comp-achievement-badge">
                            {activeComp.achievement.badge}
                          </span>
                          <span className="comp-achievement-title">
                            {activeComp.achievement.title}
                          </span>
                          <span className="comp-achievement-details">
                            {activeComp.achievement.details}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Team Members */}
                  {activeComp.teamMembers && activeComp.teamMembers.length > 0 && (
                    <div className="comp-detail-block">
                      <h4 className="comp-detail-title-line">
                        <FiUsers /> Team Members
                      </h4>
                      <div className="comp-team-list">
                        {activeComp.teamMembers.map((member, idx) => (
                          <div key={idx} className="comp-team-card">
                            <div className="comp-team-header">
                              <img
                                src={member.image}
                                alt={member.name}
                                className="comp-team-avatar"
                              />
                              <div className="comp-team-basic">
                                <span className="comp-team-name">{member.name}</span>
                                <span className="comp-team-role">{member.role}</span>
                              </div>
                              <div className="comp-team-links">
                                <a
                                  href={member.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="comp-team-link"
                                  aria-label="GitHub Link"
                                >
                                  <FiGithub />
                                </a>
                                {member.linkedin && (
                                  <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="comp-team-link"
                                    aria-label="LinkedIn Link"
                                  >
                                    <FiLinkedin />
                                  </a>
                                )}
                              </div>
                            </div>
                            <p className="comp-team-contribution">
                              <strong>Contribution:</strong> {member.contribution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies Used */}
                  <div className="comp-detail-block">
                    <h4 className="comp-detail-title-line">
                      <FiCpu /> Technologies Used
                    </h4>
                    <div className="comp-badge-cloud">
                      {activeComp.technologies.map((tech, idx) => (
                        <motion.span
                          key={tech}
                          className="comp-tech-badge"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: idx * 0.04 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="comp-detail-block">
                    <h4 className="comp-detail-title-line">
                      <FiFilePlus /> Resources
                    </h4>
                    <div className="comp-resources-list">
                      {activeComp.github && (
                        <a
                          href={activeComp.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="comp-resource-btn github"
                        >
                          <FiGithub /> GitHub Repository
                        </a>
                      )}
                      {activeComp.presentation && (
                        <a
                          href={activeComp.presentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="comp-resource-btn github"
                        >
                          <FiFileText /> Presentation
                        </a>
                      )}
                      {activeComp.demo && (
                        <a
                          href={activeComp.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="comp-resource-btn action"
                        >
                          <FiExternalLink /> Demo Video / Site
                        </a>
                      )}
                      {activeComp.certificate && (
                        <a
                          href={activeComp.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="comp-resource-btn github"
                        >
                          <FiAward /> View Certificate
                        </a>
                      )}
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="comp-resource-btn github"
                      >
                        <FiLinkedin /> LinkedIn Post
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="comp-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <div className="comp-lightbox-container" onClick={(e) => e.stopPropagation()}>
              <button
                className="comp-lightbox-close"
                onClick={() => setLightboxImage(null)}
                aria-label="Close Lightbox"
              >
                <FiX size={22} />
              </button>
              <img src={lightboxImage} alt="Fullscreen View" className="comp-lightbox-img" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Competitions;
