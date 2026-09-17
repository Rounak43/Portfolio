import { z } from 'zod';
import { text, optionalText, imageRef, urlRef, tagList, order } from './common.js';

/** One node in the "Hackathon Journey Timeline" strip. */
const journeyStepSchema = z.object({
  label: text(120),
  status: z.enum(['completed', 'upcoming']),
});

/** A card in the "Key Features" grid. */
const keyFeatureSchema = z.object({
  icon: text(8),
  title: text(120),
  points: z.array(text(300)).max(20),
});

/** A card in the optional "Why Our Approach is Different" grid. */
const differentiatorSchema = z.object({
  title: text(120),
  desc: text(600),
});

/**
 * A box in the architecture diagram. `iconType` selects from the icon map in
 * Competitions.jsx — keep this list in sync with that component.
 */
const architectureStepSchema = z.object({
  title: text(120),
  subtitle: text(200),
  tech: text(160),
  iconType: z.enum(['globe', 'terminal', 'cpu', 'database', 'file', 'search', 'layers']),
});

const teamMemberSchema = z.object({
  name: text(120),
  role: text(120),
  image: imageRef,
  github: urlRef,
  linkedin: urlRef,
  contribution: text(1000),
});

/** A stat card in the "Current Status" sidebar grid. */
const achievementSchema = z.object({
  label: text(80),
  value: text(160),
  badge: text(8),
});

const resourceSchema = z.object({
  label: text(120),
  url: urlRef,
  /** "Available" renders an active link; anything else greys the row out. */
  status: optionalText(40),
});

const implementationPlanSchema = z.object({
  text: text(1000),
  placeholders: z
    .array(z.object({ label: text(80), value: text(120) }))
    .max(12),
});

export const competitionSchema = z.object({
  // --- Card + header ---
  title: text(200),
  status: text(60),
  statusText: optionalText(120),
  date: text(60),
  location: text(200),
  organizer: text(200),
  duration: text(80),

  // --- Narrative ---
  description: text(4000),
  shortDescription: optionalText(600),
  problemStatement: text(4000),
  solution: text(4000),
  myContribution: text(4000),
  journey: optionalText(1000),

  // --- Featured project banner ---
  projectName: optionalText(200),
  projectTagline: optionalText(300),

  // --- Round labelling ---
  virtualRound: optionalText(120),
  finalRound: optionalText(120),
  upcomingEvent: optionalText(120),
  upcomingDate: optionalText(120),

  // --- Collections ---
  technologies: tagList(40),
  images: z.array(imageRef).max(20),
  timeline: z.array(journeyStepSchema).max(20),
  keyFeatures: z.array(keyFeatureSchema).max(20),
  achievements: z.array(achievementSchema).max(20),
  teamMembers: z.array(teamMemberSchema).max(20),
  resources: z.array(resourceSchema).max(20),

  // --- Optional sections (omitted entirely when not applicable) ---
  whyDifferent: z.array(differentiatorSchema).max(12).optional(),
  processFlow: z.array(text(160)).max(20).optional(),
  architectureFlow: z.array(architectureStepSchema).max(12).optional(),
  implementationPlan: implementationPlanSchema.optional(),

  // --- Flat links kept for the generic (non-custom) detail layout ---
  github: urlRef.optional(),
  presentation: urlRef.optional(),
  demo: urlRef.optional(),
  certificate: urlRef.optional(),
  linkedin: urlRef.optional(),

  order,
});
