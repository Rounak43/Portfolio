/**
 * The content that used to live hardcoded in the frontend, ready to be pushed
 * into Firestore by `npm run seed`.
 *
 * Images are written as `asset:<filename>` references rather than URLs. The
 * frontend resolves that scheme against its bundled files in src/assets, so
 * the existing artwork keeps working; anything you add later through the admin
 * panel is a plain https URL instead.
 *
 * In the About paragraphs, **double asterisks** mark the cyan highlight spans.
 */

export const projects = [
  {
    title: 'AI Knee MRI Analyzer',
    description:
      'Recently started Deep Learning based system for detecting ACL tears, meniscus injuries and knee abnormalities from MRI scans with high accuracy using CNNs.',
    image: 'asset:project1.jpg',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
    github: 'https://github.com/Rounak43/AI-Knee-MRI-Analyzer',
    demo: '',
    color: '#00E5FF',
    status: 'Recently Started',
    order: 0,
  },
  {
    title: 'Smart Placement Performance Platform',
    description:
      'AI-powered placement preparation platform featuring roadmap generation, resume analysis, progress tracking and interview preparation tools.',
    image: 'asset:project2.jpg',
    tech: ['React', 'Node.js', 'Firebase'],
    github: 'https://github.com/Rounak43/Smart-Placement-Assistant',
    demo: 'https://agent-69b05b607189ba8b95ba5d--zesty-druid-0fa1ed.netlify.app/',
    color: '#7B61FF',
    status: '',
    order: 1,
  },
  {
    title: 'Automated Active Recall Generator',
    description:
      'Generates flashcards, quizzes and summaries automatically from PDFs using NLP and Transformers for smarter studying.',
    image: 'asset:project3.jpg',
    tech: ['React', 'FastAPI', 'Transformers', 'HuggingFace'],
    github: 'https://github.com/Rounak43/AI-Powered-Active-Recall-Material-Generator',
    demo: 'https://summarizer-api-frontend-two.vercel.app/',
    color: '#00FFB2',
    status: '',
    order: 2,
  },
];

export const skills = [
  { name: 'Frontend', icon: '🎨', color: '#00E5FF', skills: ['React', 'JavaScript', 'HTML5', 'CSS3'], order: 0 },
  { name: 'Backend', icon: '⚙️', color: '#7B61FF', skills: ['Node.js', 'Express.js', 'REST API'], order: 1 },
  { name: 'Database', icon: '🗄️', color: '#00FFB2', skills: ['MongoDB', 'Firebase'], order: 2 },
  { name: 'Programming', icon: '💻', color: '#FF6B6B', skills: ['Python', 'Java', 'JavaScript'], order: 3 },
  {
    name: 'AI / ML',
    icon: '🧠',
    color: '#00E5FF',
    skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-Learn'],
    order: 4,
  },
  {
    name: 'NLP',
    icon: '📝',
    color: '#7B61FF',
    skills: ['Transformers', 'spaCy', 'NLTK', 'Hugging Face'],
    order: 5,
  },
  {
    name: 'Tools',
    icon: '🛠️',
    color: '#FFB347',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Docker'],
    order: 6,
  },
];

export const timeline = [
  {
    year: '2023',
    title: 'Started Web Development',
    description: 'Began learning HTML, CSS, JavaScript and the foundations of web development.',
    color: '#00E5FF',
    icon: '🌐',
    order: 0,
  },
  {
    year: '2024',
    title: 'Learned MERN Stack',
    description: 'Learned MongoDB, Express.js, React, and Node.js to build full-stack applications.',
    color: '#7B61FF',
    icon: '⚡',
    order: 1,
  },
  {
    year: '2025',
    title: 'Started AI & Machine Learning',
    description: 'Dived into Machine Learning, TensorFlow, PyTorch and classical ML algorithms.',
    color: '#00FFB2',
    icon: '🧠',
    order: 2,
  },
  {
    year: '2025',
    title: 'Built NLP Projects',
    description: 'Developed NLP systems using Transformers, Hugging Face, spaCy and NLTK.',
    color: '#FF6B6B',
    icon: '📝',
    order: 3,
  },
  {
    year: '2026',
    title: 'Deep Learning & LLM Applications',
    description:
      'Currently learning DL , LLM transformer and LLM pipelines. Making Real World Project using ML , DL and trying to make all without AI so that i will make my coding skill better.',
    color: '#FFB347',
    icon: '🚀',
    order: 4,
  },
];

export const about = {
  // Paste the Google Drive share link for the CV here, or set it from the
  // admin bar's About form. Blank falls back to the bundled public/resume.pdf.
  resumeUrl: '',
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

export const competitions = [
  {
    id: 'odoo-hackathon-2026',
    title: 'Odoo x Adamas University Hackathon 2026',
    status: 'Shortlisted',
    statusText: '🏆 Shortlisted for Final Round',
    date: 'Aug 2026',
    location: 'Adamas University, Barasat, West Bengal',
    organizer: 'Odoo India Pvt. Ltd. & Adamas University',
    duration: '8 Hours',
    description:
      'During the virtual hackathon our team designed and developed a complete Human Resource Management System (HRMS) within the limited development time.',
    problemStatement:
      'Organizations often manage HR operations using multiple disconnected systems or manual processes. The objective was to build a centralized Human Resource Management System that simplifies employee management while providing secure role-based access for employees and HR administrators.',
    solution:
      'The application digitizes and streamlines HR operations by providing role-based dashboards, secure authentication, attendance tracking, leave management, payroll visibility, employee profile management, and approval workflows. The project was developed as a fully functional Full Stack Web Application with a working frontend, backend, REST APIs, and PostgreSQL database.',
    technologies: [
      'React.js',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Git',
      'GitHub',
    ],
    images: [
      'asset:hrms_dashboard.jpg',
      'asset:hrms_attendance.jpg',
      'asset:hrms_departments.jpg',
      'asset:hrms_employees.jpg',
      'asset:hrms_payroll.jpg',
    ],
    github: 'https://github.com/Rounak43/Human_Resource_Management_System',
    presentation: '#',
    demo: 'https://drive.google.com/file/d/1bRZQ-UiFmpdaLRTf2PA0UNQaqz9kT9DY/view?usp=drive_link',
    certificate: '#',
    linkedin:
      'https://www.linkedin.com/posts/rounaksharma43_odoohackathon-hackathon-hrms-ugcPost-7479191976526139393-llnX/',
    projectName: 'Human Resource Management System (HRMS)',
    projectTagline: 'Every Workday, Perfectly Aligned.',
    journey: 'Successfully completed the Virtual Round and qualified for the Final Round.',
    virtualRound: 'Completed',
    finalRound: '8th–9th August 2026',
    upcomingEvent: '',
    upcomingDate: '',
    shortDescription: '',
    timeline: [
      { label: 'Registration', status: 'completed' },
      { label: 'Virtual Round Completed', status: 'completed' },
      { label: '🏆 Shortlisted', status: 'completed' },
      { label: 'Final Round (Upcoming)', status: 'upcoming' },
    ],
    keyFeatures: [
      {
        icon: '🔐',
        title: 'Secure Authentication',
        points: ['Sign Up', 'Sign In', 'Email Verification', 'Password Validation'],
      },
      {
        icon: '👥',
        title: 'Role-Based Access',
        points: ['Admin Dashboard', 'Employee Dashboard', 'HR Management'],
      },
      {
        icon: '👤',
        title: 'Employee Profile',
        points: [
          'Personal Details',
          'Job Information',
          'Salary Information',
          'Documents',
          'Profile Picture',
        ],
      },
      {
        icon: '📅',
        title: 'Attendance Management',
        points: [
          'Daily Attendance',
          'Weekly Attendance',
          'Check In',
          'Check Out',
          'Attendance Status',
        ],
      },
      {
        icon: '📝',
        title: 'Leave Management',
        points: ['Apply Leave', 'Paid Leave', 'Sick Leave', 'Unpaid Leave', 'Leave Approval Workflow'],
      },
      {
        icon: '💰',
        title: 'Payroll Management',
        points: ['Salary View', 'Payroll Visibility', 'Salary Structure'],
      },
      {
        icon: '📊',
        title: 'Dashboards',
        points: [
          'Employee Dashboard (Quick Access, Recent Activity, Leave Requests, Attendance)',
          'Admin Dashboard (Employee Management, Attendance Records, Leave Approvals, Payroll Overview)',
        ],
      },
    ],
    teamMembers: [
      {
        name: 'Rounak Sharma',
        role: 'Backend Developer & Database Developer',
        image: 'asset:profile.jpg',
        github: 'https://github.com/Rounak43',
        linkedin: 'https://linkedin.com/in/rounaksharma43',
        contribution:
          'Designed backend architecture, developed REST APIs, designed PostgreSQL database, and integrated database with backend.',
      },
      {
        name: 'Deepak Das',
        role: 'Full Stack Developer',
        image: 'asset:profile.jpg',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: 'Backend Development, Frontend Development',
      },
      {
        name: 'Pragya Singh',
        role: 'Frontend Developer',
        image: 'asset:profile.jpg',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: 'React UI Development, Responsive Design',
      },
    ],
    myContribution:
      'I primarily worked on the backend and database development. My responsibilities included designing REST APIs, creating the PostgreSQL database schema, integrating backend services with the frontend, implementing database operations, and ensuring smooth communication between all modules.',
    achievements: [
      { label: 'Status', value: 'Shortlisted for Final Round', badge: '🏆' },
      { label: 'Development', value: '8 Hours Development', badge: '⏱' },
      { label: 'Team Size', value: 'Team of 3', badge: '👥' },
      { label: 'Type', value: 'Full Stack Application', badge: '💻' },
      { label: 'Security', value: 'Secure Authentication', badge: '🔐' },
      { label: 'System', value: 'HR Management System', badge: '📊' },
    ],
    architectureFlow: [
      {
        title: 'React Frontend',
        subtitle: 'Client UI & State Management',
        tech: 'React.js, CSS3',
        iconType: 'globe',
      },
      {
        title: 'REST APIs',
        subtitle: 'Endpoints & JSON Payloads',
        tech: 'Express Routing',
        iconType: 'terminal',
      },
      {
        title: 'Node.js + Express',
        subtitle: 'Server Controllers & Auth Middleware',
        tech: 'Node.js',
        iconType: 'cpu',
      },
      {
        title: 'PostgreSQL Database',
        subtitle: 'Relational Schema & Constraints',
        tech: 'PostgreSQL',
        iconType: 'database',
      },
    ],
    resources: [
      {
        label: 'GitHub Repository',
        url: 'https://github.com/Rounak43/Human_Resource_Management_System',
        status: 'Available',
      },
      { label: 'Presentation Slides', url: '#', status: 'Coming Soon' },
      { label: 'View Certificate', url: '#', status: 'Coming Soon' },
      {
        label: 'Demo Video',
        url: 'https://drive.google.com/file/d/1bRZQ-UiFmpdaLRTf2PA0UNQaqz9kT9DY/view?usp=drive_link',
        status: 'Available',
      },
      {
        label: 'LinkedIn Post',
        url: 'https://www.linkedin.com/posts/rounaksharma43_odoohackathon-hackathon-hrms-ugcPost-7479191976526139393-llnX/',
        status: 'Available',
      },
    ],
    order: 0,
  },
  {
    id: 'isro-hackathon-2026',
    title: 'ISRO Bharatiya Antariksh Hackathon 2026',
    status: 'Idea Submitted',
    statusText: 'Proposal Submitted',
    date: 'Aug 2026',
    location: 'ISRO Nodal Center / Online',
    organizer: 'Indian Space Research Organisation (ISRO)',
    duration: 'Proposal Stage',
    description:
      'Our proposed solution introduces GeoRAG++, a Retrieval-Augmented and Physics-Guided framework for infrared image colorization. Instead of relying only on conventional deep learning models, the proposed approach retrieves similar historical satellite scenes from a curated archive and combines them with thermal imagery to generate realistic RGB outputs while maintaining physical consistency. The proposal also generates confidence maps to help analysts identify uncertain regions for manual validation. This project proposal has been submitted to the ISRO Bharatiya Antariksh Hackathon. The implementation phase will begin after the team is shortlisted.',
    shortDescription:
      'GeoRAG++ is a Retrieval-Augmented, Physics-Guided framework for satellite infrared image colorization and enhancement.',
    problemStatement:
      'Problem Statement 10: Infrared Image Colorization and Enhancement for Improved Object Interpretation. The objective is to improve the interpretation of satellite thermal imagery by reconstructing realistic RGB images while preserving thermal consistency and providing confidence estimation for analysts.',
    solution:
      'GeoRAG++ introduces a retrieval-augmented, physics-guided thermal-to-RGB reconstruction model. Using reference historical scenes, the system guides diffusion models to generate realistic RGB details without violating physical heat laws, yielding both enhanced thermal data and confidence maps.',
    technologies: [
      'Python',
      'PyTorch',
      'SwinIR',
      'Vision Transformer',
      'FAISS',
      'Diffusion Models',
      'Rasterio',
      'GDAL',
      'OpenCV',
    ],
    images: ['asset:isro_hackathon_2026.png'],
    projectName: 'GeoRAG++',
    projectTagline: 'Retrieval-Augmented, Physics-Guided Thermal-to-RGB Reconstruction Framework',
    journey: 'Successfully submitted the proposal and currently awaiting the shortlisting results.',
    upcomingEvent: 'Final Selection / Shortlisting',
    upcomingDate: '6 August 2026',
    virtualRound: '',
    finalRound: '',
    timeline: [
      { label: 'Registration', status: 'completed' },
      { label: 'Idea Submission', status: 'completed' },
      { label: 'Proposal Under Review', status: 'completed' },
      { label: 'Shortlisting (Upcoming)', status: 'upcoming' },
      { label: 'Project Development', status: 'upcoming' },
      { label: 'Final Presentation', status: 'upcoming' },
    ],
    whyDifferent: [
      {
        title: 'Reference-Grounded Reconstruction',
        desc: 'Uses similar historical satellite scenes instead of relying only on learned mappings.',
      },
      { title: 'Physics Consistency', desc: 'Ensures reconstructed RGB output remains thermally consistent.' },
      { title: 'Confidence Map', desc: 'Highlights uncertain regions requiring manual inspection.' },
      {
        title: 'Retrieval-Augmented Generation',
        desc: 'Uses retrieval before reconstruction instead of direct image generation.',
      },
    ],
    keyFeatures: [
      {
        icon: '🔍',
        title: 'Thermal Super Resolution',
        points: ['Enhance thermal resolution', 'Preserve sensor characteristics'],
      },
      {
        icon: '🎨',
        title: 'Reference-guided RGB Colorization',
        points: ['Reconstruct realistic colors', 'Use historical reference matching'],
      },
      {
        icon: '🚀',
        title: 'GeoRAG Retrieval Engine',
        points: ['Fast retrieval of historical tiles', 'FAISS index vector matching'],
      },
      {
        icon: '🧩',
        title: 'Scene-aware Segmentation',
        points: ['Identify terrain features', 'Preserve geographical structures'],
      },
      {
        icon: '🗺️',
        title: 'Pixel-level Confidence Map',
        points: ['Assess reliability of colorization', 'Flag high-uncertainty zones'],
      },
      {
        icon: '⚖️',
        title: 'Physics Consistency Verification',
        points: ['Enforce thermal heat laws', 'Verify temperature gradients'],
      },
      {
        icon: '☁️',
        title: 'Cloud Gap Filling',
        points: ['Temporal interpolation', 'Historical tile reference fill'],
      },
      {
        icon: '📈',
        title: 'Automatic Quality Metrics',
        points: ['PSNR, SSIM evaluation', 'Thermal error validation'],
      },
      {
        icon: '📡',
        title: 'Built using Open Satellite Data',
        points: ['Sentinel-3, Landsat data compatibility', 'Open-source tooling'],
      },
    ],
    processFlow: [
      'Satellite Thermal Image',
      'Thermal Super Resolution',
      'Scene Segmentation',
      'Retrieve Similar Historical Satellite Images',
      'Cross-Attention Fusion',
      'RGB Reconstruction',
      'Confidence Estimation',
      'Final Outputs (RGB, Enhanced Thermal, Confidence Map)',
    ],
    architectureFlow: [
      {
        title: 'Input',
        subtitle: 'Satellite Thermal Image',
        tech: 'Thermal Imagery Input',
        iconType: 'file',
      },
      {
        title: 'GeoRAG++ Core',
        subtitle: 'Super Resolution & Scene Understanding',
        tech: 'SwinIR & Vision Transformer',
        iconType: 'cpu',
      },
      {
        title: 'Retrieval Engine',
        subtitle: 'Historical Search & Physics Validation',
        tech: 'FAISS & Thermal Heat Laws',
        iconType: 'search',
      },
      {
        title: 'Cross Attention Fusion',
        subtitle: 'Diffusion Reconstruction Model',
        tech: 'PyTorch Diffusion Model',
        iconType: 'layers',
      },
      {
        title: 'Outputs',
        subtitle: 'Enhanced Thermal, RGB & Confidence Map',
        tech: 'Rasterio / GDAL Output Files',
        iconType: 'database',
      },
    ],
    teamMembers: [
      {
        name: 'Rounak Sharma',
        role: 'Team Leader',
        image: 'asset:profile.jpg',
        github: 'https://github.com/Rounak43',
        linkedin: 'https://linkedin.com/in/rounaksharma43',
        contribution: '(To be updated after shortlisting)',
      },
      {
        name: 'Deepak Das',
        role: 'Member',
        image: 'asset:profile.jpg',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: '(To be updated after shortlisting)',
      },
      {
        name: 'Sanmati Payappa',
        role: 'Member',
        image: 'asset:profile.jpg',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: '(To be updated after shortlisting)',
      },
      {
        name: 'Srinivas RC',
        role: 'Member',
        image: 'asset:profile.jpg',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: '(To be updated after shortlisting)',
      },
    ],
    myContribution:
      'Currently contributed to researching the problem statement, designing the solution architecture, preparing the proposal, and team coordination. (Leave implementation details empty until project development begins.)',
    achievements: [
      { label: 'Status', value: 'Proposal Submitted', badge: '📝' },
      { label: 'Stage', value: 'Awaiting Shortlisting', badge: '⏳' },
      { label: 'Phase', value: 'Project Yet to Start', badge: '⚙️' },
      { label: 'Event', value: 'Final Round on 6 Aug 2026', badge: '📅' },
    ],
    implementationPlan: {
      text: 'Implementation will begin after the official shortlist announcement.',
      placeholders: [
        { label: 'Backend', value: 'Coming Soon' },
        { label: 'Frontend', value: 'Coming Soon' },
        { label: 'Model Training', value: 'Coming Soon' },
        { label: 'Dataset', value: 'Coming Soon' },
        { label: 'Deployment', value: 'Coming Soon' },
        { label: 'Evaluation', value: 'Coming Soon' },
      ],
    },
    resources: [
      { label: 'Project Proposal', url: '#', status: 'Available' },
      { label: 'GitHub Repository', url: '#', status: 'Coming Soon' },
      { label: 'Presentation Slides', url: '#', status: 'Coming Soon' },
      { label: 'Certificate', url: '#', status: 'If shortlisted' },
      { label: 'Demo Video', url: '#', status: 'Coming Soon' },
    ],
    order: 1,
  },
];
