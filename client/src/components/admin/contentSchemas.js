/**
 * Field descriptors driving the admin forms.
 *
 * These mirror the Zod schemas in server/src/schemas — if you add a field
 * there, add it here too or the form will never send it.
 *
 * Supported types: text, textarea, select, color, image, imageList, tags,
 * stringList, repeater, group. See FormFields.jsx for how each renders.
 */

const IMAGE_HELP =
  'Paste an image URL (https://…). References beginning with "asset:" point at images bundled in src/assets.';

// ---------------------------------------------------------------- Projects

export const projectFields = [
  { name: 'title', label: 'Title', required: true, placeholder: 'AI Knee MRI Analyzer' },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: true,
    rows: 4,
  },
  { name: 'image', label: 'Card image', type: 'image', help: IMAGE_HELP },
  {
    name: 'tech',
    label: 'Tech stack',
    type: 'tags',
    placeholder: 'React, Node.js — Enter to add',
  },
  { name: 'github', label: 'GitHub URL', placeholder: 'https://github.com/…' },
  {
    name: 'demo',
    label: 'Live demo URL',
    placeholder: 'https://…',
    help: 'Leave blank to hide the Live Demo button on this card.',
  },
  {
    name: 'color',
    label: 'Accent colour',
    type: 'color',
    defaultValue: '#00E5FF',
  },
  {
    name: 'status',
    label: 'Status ribbon',
    placeholder: 'Recently Started',
    help: 'Optional. Leave blank for no badge.',
  },
];

// ------------------------------------------------------------------ Skills

export const skillFields = [
  { name: 'name', label: 'Category name', required: true, placeholder: 'Frontend' },
  { name: 'icon', label: 'Icon', required: true, defaultValue: '🎨', help: 'A single emoji.' },
  { name: 'color', label: 'Accent colour', type: 'color', defaultValue: '#00E5FF' },
  {
    name: 'skills',
    label: 'Skills',
    type: 'tags',
    placeholder: 'React, CSS3 — Enter to add',
  },
];

// ---------------------------------------------------------------- Timeline

export const timelineFields = [
  { name: 'year', label: 'Year', required: true, placeholder: '2026' },
  { name: 'title', label: 'Title', required: true, placeholder: 'Learned MERN Stack' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 3 },
  { name: 'icon', label: 'Icon', required: true, defaultValue: '🚀', help: 'A single emoji.' },
  { name: 'color', label: 'Accent colour', type: 'color', defaultValue: '#00E5FF' },
];

// ------------------------------------------------------------------- About

export const aboutFields = [
  {
    name: 'resumeUrl',
    label: 'Resume link',
    placeholder: 'https://drive.google.com/file/d/…/view',
    help:
      'Google Drive share link for your CV, set to "Anyone with the link". ' +
      'The Hero button rewrites it to a direct download, so visitors get the ' +
      'file rather than a Drive preview. Leave blank to serve the bundled ' +
      'public/resume.pdf instead.',
  },
  {
    name: 'paragraphs',
    label: 'Bio paragraphs',
    type: 'stringList',
    placeholder: 'Write a paragraph…',
    help: 'Wrap text in **double asterisks** to give it the cyan highlight.',
  },
  {
    name: 'cards',
    label: 'Focus-area cards',
    type: 'repeater',
    addLabel: 'Add card',
    itemLabel: (item) => item.title || 'Untitled card',
    fields: [
      { name: 'icon', label: 'Icon', defaultValue: '🎯', help: 'A single emoji.' },
      { name: 'title', label: 'Title', placeholder: 'Full Stack Development' },
      { name: 'tags', label: 'Tags', type: 'tags' },
      { name: 'color', label: 'Accent colour', type: 'color', defaultValue: '#00E5FF' },
    ],
  },
];

// ------------------------------------------------------------ Competitions

const ARCHITECTURE_ICONS = [
  { value: 'globe', label: 'Globe — frontend / web' },
  { value: 'terminal', label: 'Terminal — APIs' },
  { value: 'cpu', label: 'CPU — server / processing' },
  { value: 'database', label: 'Database — storage' },
  { value: 'file', label: 'File — input / output' },
  { value: 'search', label: 'Search — retrieval' },
  { value: 'layers', label: 'Layers — fusion / stack' },
];

export const competitionFields = [
  // --- Identity -----------------------------------------------------------
  { name: 'title', label: 'Competition title', required: true },
  {
    name: 'status',
    label: 'Status',
    required: true,
    placeholder: 'Shortlisted',
    help: 'Short label for the grid card badge.',
  },
  {
    name: 'statusText',
    label: 'Status (long form)',
    placeholder: '🏆 Shortlisted for Final Round',
    help: 'Shown on the detail page. Falls back to the short status.',
  },
  { name: 'date', label: 'Date', required: true, placeholder: 'Aug 2026' },
  { name: 'location', label: 'Location', required: true },
  { name: 'organizer', label: 'Organiser', required: true },
  { name: 'duration', label: 'Duration / stage', required: true, placeholder: '8 Hours' },

  // --- Featured banner ----------------------------------------------------
  { name: 'projectName', label: 'Project name', placeholder: 'GeoRAG++' },
  { name: 'projectTagline', label: 'Project tagline' },

  // --- Narrative ----------------------------------------------------------
  {
    name: 'shortDescription',
    label: 'Short description',
    type: 'textarea',
    rows: 2,
    help: 'Used on the grid card. Falls back to the full description.',
  },
  { name: 'description', label: 'Full description', type: 'textarea', required: true, rows: 5 },
  { name: 'problemStatement', label: 'Problem statement', type: 'textarea', required: true, rows: 5 },
  { name: 'solution', label: 'Solution', type: 'textarea', required: true, rows: 5 },
  { name: 'myContribution', label: 'My contribution', type: 'textarea', required: true, rows: 4 },
  { name: 'journey', label: 'Journey summary', type: 'textarea', rows: 2 },

  // --- Round labelling ----------------------------------------------------
  { name: 'virtualRound', label: 'Virtual round', placeholder: 'Completed' },
  { name: 'finalRound', label: 'Final round date', placeholder: '8th–9th August 2026' },
  {
    name: 'upcomingEvent',
    label: 'Upcoming event label',
    help: 'When set, this replaces "Final Round" in the detail header.',
  },
  { name: 'upcomingDate', label: 'Upcoming event date' },

  // --- Collections --------------------------------------------------------
  { name: 'technologies', label: 'Technologies', type: 'tags' },
  { name: 'images', label: 'Gallery images', type: 'imageList', help: IMAGE_HELP },

  {
    name: 'timeline',
    label: 'Journey timeline',
    type: 'repeater',
    addLabel: 'Add step',
    itemLabel: (item) => item.label || 'Untitled step',
    fields: [
      { name: 'label', label: 'Step label', placeholder: 'Virtual Round Completed' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        defaultValue: 'completed',
        options: [
          { value: 'completed', label: 'Completed (✓)' },
          { value: 'upcoming', label: 'Upcoming (○)' },
        ],
      },
    ],
  },

  {
    name: 'keyFeatures',
    label: 'Key features',
    type: 'repeater',
    addLabel: 'Add feature',
    itemLabel: (item) => `${item.icon || ''} ${item.title || 'Untitled feature'}`.trim(),
    fields: [
      { name: 'icon', label: 'Icon', defaultValue: '🔐', help: 'A single emoji.' },
      { name: 'title', label: 'Feature title' },
      { name: 'points', label: 'Bullet points', type: 'stringList', placeholder: 'A capability…' },
    ],
  },

  {
    name: 'achievements',
    label: 'Status / achievement cards',
    type: 'repeater',
    addLabel: 'Add card',
    itemLabel: (item) => `${item.badge || ''} ${item.label || 'Untitled'}`.trim(),
    fields: [
      { name: 'badge', label: 'Badge emoji', defaultValue: '🏆' },
      { name: 'label', label: 'Label', placeholder: 'Team Size' },
      { name: 'value', label: 'Value', placeholder: 'Team of 3' },
    ],
  },

  {
    name: 'teamMembers',
    label: 'Team members',
    type: 'repeater',
    addLabel: 'Add member',
    itemLabel: (item) => item.name || 'Unnamed member',
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'role', label: 'Role' },
      { name: 'image', label: 'Photo', type: 'image', help: IMAGE_HELP },
      { name: 'github', label: 'GitHub URL' },
      { name: 'linkedin', label: 'LinkedIn URL' },
      { name: 'contribution', label: 'Responsibilities', type: 'textarea', rows: 3 },
    ],
  },

  {
    name: 'resources',
    label: 'Project resources',
    type: 'repeater',
    addLabel: 'Add resource',
    itemLabel: (item) => item.label || 'Untitled resource',
    fields: [
      { name: 'label', label: 'Label', placeholder: 'GitHub Repository' },
      { name: 'url', label: 'URL', placeholder: 'https://…' },
      {
        name: 'status',
        label: 'Status',
        defaultValue: 'Available',
        help: 'Exactly "Available" renders an active link. Anything else greys the row out.',
      },
    ],
  },

  // --- Optional sections --------------------------------------------------
  {
    name: 'whyDifferent',
    label: 'Why our approach is different',
    type: 'repeater',
    addLabel: 'Add point',
    itemLabel: (item) => item.title || 'Untitled point',
    help: 'Optional. Leave empty to hide this section.',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'desc', label: 'Description', type: 'textarea', rows: 2 },
    ],
  },

  {
    name: 'processFlow',
    label: 'Proposed process flow',
    type: 'stringList',
    placeholder: 'Satellite Thermal Image',
    help: 'Optional numbered pipeline. Leave empty to hide this section.',
  },

  {
    name: 'architectureFlow',
    label: 'Architecture flow',
    type: 'repeater',
    addLabel: 'Add block',
    itemLabel: (item) => item.title || 'Untitled block',
    help: 'Optional. Leave empty to hide the architecture diagram.',
    fields: [
      { name: 'title', label: 'Block title', placeholder: 'React Frontend' },
      { name: 'subtitle', label: 'Subtitle' },
      { name: 'tech', label: 'Tech label' },
      {
        name: 'iconType',
        label: 'Icon',
        type: 'select',
        defaultValue: 'cpu',
        options: ARCHITECTURE_ICONS,
      },
    ],
  },

  {
    name: 'implementationPlan',
    label: 'Implementation plan',
    type: 'group',
    help: 'Optional. Leave the summary blank to hide this section.',
    // Without a summary there is nothing to render, so drop the whole object
    // rather than sending one the server would reject.
    omitWhen: (value) => !value?.text?.trim(),
    fields: [
      { name: 'text', label: 'Summary', type: 'textarea', rows: 2 },
      {
        name: 'placeholders',
        label: 'Status tiles',
        type: 'repeater',
        addLabel: 'Add tile',
        itemLabel: (item) => item.label || 'Untitled tile',
        fields: [
          { name: 'label', label: 'Label', placeholder: 'Backend' },
          { name: 'value', label: 'Value', defaultValue: 'Coming Soon' },
        ],
      },
    ],
  },

  // --- Flat links ---------------------------------------------------------
  { name: 'github', label: 'GitHub URL' },
  { name: 'demo', label: 'Demo URL' },
  { name: 'presentation', label: 'Presentation URL' },
  { name: 'certificate', label: 'Certificate URL' },
  { name: 'linkedin', label: 'LinkedIn post URL' },
];
