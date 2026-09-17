/**
 * The content that ships inside the bundle.
 *
 * It is used only when the API cannot be reached — a sleeping free-tier host,
 * an offline visitor, or local development without the server running — so the
 * portfolio always renders something rather than an empty page. Once the API
 * responds, its data replaces all of this.
 *
 * This is a snapshot, not the source of truth. After editing content through
 * the admin panel, these values will be out of date; that is fine, but you can
 * refresh them by hand if you want the offline view to match.
 */
import { competitionsData } from './competitions';

export const fallbackProjects = [
  {
    id: 'fallback-1',
    title: 'AI Knee MRI Analyzer',
    description:
      'Recently started Deep Learning based system for detecting ACL tears, meniscus injuries and knee abnormalities from MRI scans with high accuracy using CNNs.',
    image: 'asset:project1.jpg',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
    github: 'https://github.com/Rounak43/AI-Knee-MRI-Analyzer',
    demo: '',
    color: '#00E5FF',
    status: 'Recently Started',
  },
  {
    id: 'fallback-2',
    title: 'Smart Placement Performance Platform',
    description:
      'AI-powered placement preparation platform featuring roadmap generation, resume analysis, progress tracking and interview preparation tools.',
    image: 'asset:project2.jpg',
    tech: ['React', 'Node.js', 'Firebase'],
    github: 'https://github.com/Rounak43/Smart-Placement-Assistant',
    demo: 'https://agent-69b05b607189ba8b95ba5d--zesty-druid-0fa1ed.netlify.app/',
    color: '#7B61FF',
    status: '',
  },
  {
    id: 'fallback-3',
    title: 'Automated Active Recall Generator',
    description:
      'Generates flashcards, quizzes and summaries automatically from PDFs using NLP and Transformers for smarter studying.',
    image: 'asset:project3.jpg',
    tech: ['React', 'FastAPI', 'Transformers', 'HuggingFace'],
    github: 'https://github.com/Rounak43/AI-Powered-Active-Recall-Material-Generator',
    demo: 'https://summarizer-api-frontend-two.vercel.app/',
    color: '#00FFB2',
    status: '',
  },
];

export const fallbackSkills = [
  { id: 'fb-frontend', name: 'Frontend', icon: '🎨', color: '#00E5FF', skills: ['React', 'JavaScript', 'HTML5', 'CSS3'] },
  { id: 'fb-backend', name: 'Backend', icon: '⚙️', color: '#7B61FF', skills: ['Node.js', 'Express.js', 'REST API'] },
  { id: 'fb-database', name: 'Database', icon: '🗄️', color: '#00FFB2', skills: ['MongoDB', 'Firebase'] },
  { id: 'fb-programming', name: 'Programming', icon: '💻', color: '#FF6B6B', skills: ['Python', 'Java', 'JavaScript'] },
  {
    id: 'fb-aiml',
    name: 'AI / ML',
    icon: '🧠',
    color: '#00E5FF',
    skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-Learn'],
  },
  {
    id: 'fb-nlp',
    name: 'NLP',
    icon: '📝',
    color: '#7B61FF',
    skills: ['Transformers', 'spaCy', 'NLTK', 'Hugging Face'],
  },
  {
    id: 'fb-tools',
    name: 'Tools',
    icon: '🛠️',
    color: '#FFB347',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Docker'],
  },
];

export const fallbackTimeline = [
  {
    id: 'fb-t1',
    year: '2023',
    title: 'Started Web Development',
    description: 'Began learning HTML, CSS, JavaScript and the foundations of web development.',
    color: '#00E5FF',
    icon: '🌐',
  },
  {
    id: 'fb-t2',
    year: '2024',
    title: 'Learned MERN Stack',
    description: 'Learned MongoDB, Express.js, React, and Node.js to build full-stack applications.',
    color: '#7B61FF',
    icon: '⚡',
  },
  {
    id: 'fb-t3',
    year: '2025',
    title: 'Started AI & Machine Learning',
    description: 'Dived into Machine Learning, TensorFlow, PyTorch and classical ML algorithms.',
    color: '#00FFB2',
    icon: '🧠',
  },
  {
    id: 'fb-t4',
    year: '2025',
    title: 'Built NLP Projects',
    description: 'Developed NLP systems using Transformers, Hugging Face, spaCy and NLTK.',
    color: '#FF6B6B',
    icon: '📝',
  },
  {
    id: 'fb-t5',
    year: '2026',
    title: 'Deep Learning & LLM Applications',
    description:
      'Currently learning DL , LLM transformer and LLM pipelines. Making Real World Project using ML , DL and trying to make all without AI so that i will make my coding skill better.',
    color: '#FFB347',
    icon: '🚀',
  },
];

/** `**bold**` spans render as the cyan highlight the original markup used. */
export const fallbackAbout = {
  paragraphs: [
    'I am **Rounak Sharma**, a passionate **Full Stack Developer** and **AI/ML Engineer** currently pursuing Computer Science with specialization in **Artificial Intelligence & Machine Learning**.',
    'I enjoy building scalable web applications, AI-powered products, NLP systems, and deep learning projects. I love solving real-world problems through technology and continuously learning modern frameworks and tools.',
    'I am actively looking for **Software Development**, **AI Engineer**, **Machine Learning Engineer**, and **Full Stack Developer** opportunities.',
  ],
  cards: [
    {
      icon: '🎯',
      title: 'Full Stack Development',
      tags: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
      color: 'var(--primary)',
    },
    {
      icon: '🤖',
      title: 'Artificial Intelligence',
      tags: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'Large Language Models'],
      color: 'var(--secondary)',
    },
    {
      icon: '🚀',
      title: 'Currently Learning',
      tags: ['MLOps', 'Agentic AI', 'RAG', 'Docker', 'Cloud Deployment'],
      color: '#00FFB2',
    },
  ],
};

export const fallbackCompetitions = competitionsData;
