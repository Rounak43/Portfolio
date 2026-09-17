import { createRepository, createSingletonRepository } from './firestore.service.js';

/**
 * Every Firestore collection this API exposes, in one place, so route wiring
 * and the seed script agree on collection names.
 */
export const projectsRepo = createRepository('projects', { label: 'Project' });
export const competitionsRepo = createRepository('competitions', { label: 'Competition' });
export const skillsRepo = createRepository('skills', { label: 'Skill category' });
export const timelineRepo = createRepository('timeline', { label: 'Timeline entry' });
export const messagesRepo = createRepository('messages', { label: 'Message' });

export const aboutRepo = createSingletonRepository('site', 'about', {
  paragraphs: [],
  cards: [],
});
