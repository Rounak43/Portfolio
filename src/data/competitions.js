import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';
import project4 from '../assets/project4.jpg';
import profile from '../assets/profile.jpg';
import hrmsDashboard from '../assets/hrms_dashboard.jpg';
import hrmsAttendance from '../assets/hrms_attendance.jpg';
import hrmsDepartments from '../assets/hrms_departments.jpg';
import hrmsEmployees from '../assets/hrms_employees.jpg';
import hrmsPayroll from '../assets/hrms_payroll.jpg';
import isroHackathon2026 from '../assets/isro_hackathon_2026.png';


export const competitionsData = [
  {
    id: 'odoo-hackathon-2026',
    title: 'Odoo x Adamas University Hackathon 2026',
    status: 'Shortlisted',
    statusText: '🏆 Shortlisted for Final Round',
    date: 'Aug 2026',
    location: 'Adamas University, Barasat, West Bengal',
    organizer: 'Odoo India Pvt. Ltd. & Adamas University',
    duration: '8 Hours',
    description: 'During the virtual hackathon our team designed and developed a complete Human Resource Management System (HRMS) within the limited development time.',
    problemStatement: 'Organizations often manage HR operations using multiple disconnected systems or manual processes. The objective was to build a centralized Human Resource Management System that simplifies employee management while providing secure role-based access for employees and HR administrators.',
    solution: 'The application digitizes and streamlines HR operations by providing role-based dashboards, secure authentication, attendance tracking, leave management, payroll visibility, employee profile management, and approval workflows. The project was developed as a fully functional Full Stack Web Application with a working frontend, backend, REST APIs, and PostgreSQL database.',
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Express.js', 'PostgreSQL', 'Git', 'GitHub'],
    images: [hrmsDashboard, hrmsAttendance, hrmsDepartments, hrmsEmployees, hrmsPayroll],
    github: 'https://github.com/Rounak43/Human_Resource_Management_System',
    presentation: '#',
    demo: 'https://drive.google.com/file/d/1bRZQ-UiFmpdaLRTf2PA0UNQaqz9kT9DY/view?usp=drive_link',
    certificate: '#',
    linkedin: 'https://www.linkedin.com/posts/rounaksharma43_odoohackathon-hackathon-hrms-ugcPost-7479191976526139393-llnX/?highlightedUpdateUrn=urn%3Ali%3Aactivity%3A7479191977595584513&highlightedUpdateType=SOCIAL_SHARE&origin=SOCIAL_SHARE&utm_source=share&utm_medium=member_desktop&rcm=ACoAAGnbmY0BtoA-bgR9q8ISybIaFtA1eCfWN1M',
    projectName: 'Human Resource Management System (HRMS)',
    projectTagline: 'Every Workday, Perfectly Aligned.',
    journey: 'Successfully completed the Virtual Round and qualified for the Final Round.',
    virtualRound: 'Completed',
    finalRound: '8th–9th August 2026',
    timeline: [
      { label: 'Registration', status: 'completed' },
      { label: 'Virtual Round Completed', status: 'completed' },
      { label: '🏆 Shortlisted', status: 'completed' },
      { label: 'Final Round (Upcoming)', status: 'upcoming' }
    ],
    keyFeatures: [
      {
        icon: '🔐',
        title: 'Secure Authentication',
        points: ['Sign Up', 'Sign In', 'Email Verification', 'Password Validation']
      },
      {
        icon: '👥',
        title: 'Role-Based Access',
        points: ['Admin Dashboard', 'Employee Dashboard', 'HR Management']
      },
      {
        icon: '👤',
        title: 'Employee Profile',
        points: ['Personal Details', 'Job Information', 'Salary Information', 'Documents', 'Profile Picture']
      },
      {
        icon: '📅',
        title: 'Attendance Management',
        points: ['Daily Attendance', 'Weekly Attendance', 'Check In', 'Check Out', 'Attendance Status']
      },
      {
        icon: '📝',
        title: 'Leave Management',
        points: ['Apply Leave', 'Paid Leave', 'Sick Leave', 'Unpaid Leave', 'Leave Approval Workflow']
      },
      {
        icon: '💰',
        title: 'Payroll Management',
        points: ['Salary View', 'Payroll Visibility', 'Salary Structure']
      },
      {
        icon: '📊',
        title: 'Dashboards',
        points: [
          'Employee Dashboard (Quick Access, Recent Activity, Leave Requests, Attendance)',
          'Admin Dashboard (Employee Management, Attendance Records, Leave Approvals, Payroll Overview)'
        ]
      }
    ],
    teamMembers: [
      {
        name: 'Rounak Sharma',
        role: 'Backend Developer & Database Developer',
        image: profile,
        github: 'https://github.com/Rounak43',
        linkedin: 'https://linkedin.com/in/rounaksharma43',
        contribution: 'Designed backend architecture, developed REST APIs, designed PostgreSQL database, and integrated database with backend.'
      },
      {
        name: 'Deepak Das',
        role: 'Full Stack Developer',
        image: profile,
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: 'Backend Development, Frontend Development'
      },
      {
        name: 'Pragya Singh',
        role: 'Frontend Developer',
        image: profile,
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: 'React UI Development, Responsive Design'
      }
    ],
    myContribution: 'I primarily worked on the backend and database development. My responsibilities included designing REST APIs, creating the PostgreSQL database schema, integrating backend services with the frontend, implementing database operations, and ensuring smooth communication between all modules.',
    achievements: [
      { label: 'Status', value: 'Shortlisted for Final Round', badge: '🏆' },
      { label: 'Development', value: '8 Hours Development', badge: '⏱' },
      { label: 'Team Size', value: 'Team of 3', badge: '👥' },
      { label: 'Type', value: 'Full Stack Application', badge: '💻' },
      { label: 'Security', value: 'Secure Authentication', badge: '🔐' },
      { label: 'System', value: 'HR Management System', badge: '📊' }
    ],
    architectureFlow: [
      { title: 'React Frontend', subtitle: 'Client UI & State Management', tech: 'React.js, CSS3', iconType: 'globe' },
      { title: 'REST APIs', subtitle: 'Endpoints & JSON Payloads', tech: 'Express Routing', iconType: 'terminal' },
      { title: 'Node.js + Express', subtitle: 'Server Controllers & Auth Middleware', tech: 'Node.js', iconType: 'cpu' },
      { title: 'PostgreSQL Database', subtitle: 'Relational Schema & Constraints', tech: 'PostgreSQL', iconType: 'database' }
    ],
    resources: [
      { label: 'GitHub Repository', url: 'https://github.com/Rounak43/Human_Resource_Management_System', status: 'Available' },
      { label: 'Presentation Slides', url: '#', status: 'Coming Soon' },
      { label: 'View Certificate', url: '#', status: 'Coming Soon' },
      { label: 'Demo Video', url: 'https://drive.google.com/file/d/1bRZQ-UiFmpdaLRTf2PA0UNQaqz9kT9DY/view?usp=drive_link', status: 'Available' },
      { label: 'LinkedIn Post', url: 'https://www.linkedin.com/posts/rounaksharma43_odoohackathon-hackathon-hrms-ugcPost-7479191976526139393-llnX/?highlightedUpdateUrn=urn%3Ali%3Aactivity%3A7479191977595584513&highlightedUpdateType=SOCIAL_SHARE&origin=SOCIAL_SHARE&utm_source=share&utm_medium=member_desktop&rcm=ACoAAGnbmY0BtoA-bgR9q8ISybIaFtA1eCfWN1M', status: 'Available' }
    ]
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
    description: 'Our proposed solution introduces GeoRAG++, a Retrieval-Augmented and Physics-Guided framework for infrared image colorization. Instead of relying only on conventional deep learning models, the proposed approach retrieves similar historical satellite scenes from a curated archive and combines them with thermal imagery to generate realistic RGB outputs while maintaining physical consistency. The proposal also generates confidence maps to help analysts identify uncertain regions for manual validation. This project proposal has been submitted to the ISRO Bharatiya Antariksh Hackathon. The implementation phase will begin after the team is shortlisted.',
    shortDescription: 'GeoRAG++ is a Retrieval-Augmented, Physics-Guided framework for satellite infrared image colorization and enhancement.',
    problemStatement: 'Problem Statement 10: Infrared Image Colorization and Enhancement for Improved Object Interpretation. The objective is to improve the interpretation of satellite thermal imagery by reconstructing realistic RGB images while preserving thermal consistency and providing confidence estimation for analysts.',
    solution: 'GeoRAG++ introduces a retrieval-augmented, physics-guided thermal-to-RGB reconstruction model. Using reference historical scenes, the system guides diffusion models to generate realistic RGB details without violating physical heat laws, yielding both enhanced thermal data and confidence maps.',
    technologies: ['Python', 'PyTorch', 'SwinIR', 'Vision Transformer', 'FAISS', 'Diffusion Models', 'Rasterio', 'GDAL', 'OpenCV'],
    images: [isroHackathon2026],
    projectName: 'GeoRAG++',
    projectTagline: 'Retrieval-Augmented, Physics-Guided Thermal-to-RGB Reconstruction Framework',
    journey: 'Successfully submitted the proposal and currently awaiting the shortlisting results.',
    upcomingEvent: 'Final Selection / Shortlisting',
    upcomingDate: '6 August 2026',
    timeline: [
      { label: 'Registration', status: 'completed' },
      { label: 'Idea Submission', status: 'completed' },
      { label: 'Proposal Under Review', status: 'completed' },
      { label: 'Shortlisting (Upcoming)', status: 'upcoming' },
      { label: 'Project Development', status: 'upcoming' },
      { label: 'Final Presentation', status: 'upcoming' }
    ],
    whyDifferent: [
      { title: 'Reference-Grounded Reconstruction', desc: 'Uses similar historical satellite scenes instead of relying only on learned mappings.' },
      { title: 'Physics Consistency', desc: 'Ensures reconstructed RGB output remains thermally consistent.' },
      { title: 'Confidence Map', desc: 'Highlights uncertain regions requiring manual inspection.' },
      { title: 'Retrieval-Augmented Generation', desc: 'Uses retrieval before reconstruction instead of direct image generation.' }
    ],
    keyFeatures: [
      { icon: '🔍', title: 'Thermal Super Resolution', points: ['Enhance thermal resolution', 'Preserve sensor characteristics'] },
      { icon: '🎨', title: 'Reference-guided RGB Colorization', points: ['Reconstruct realistic colors', 'Use historical reference matching'] },
      { icon: '🚀', title: 'GeoRAG Retrieval Engine', points: ['Fast retrieval of historical tiles', 'FAISS index vector matching'] },
      { icon: '🧩', title: 'Scene-aware Segmentation', points: ['Identify terrain features', 'Preserve geographical structures'] },
      { icon: '🗺️', title: 'Pixel-level Confidence Map', points: ['Assess reliability of colorization', 'Flag high-uncertainty zones'] },
      { icon: '⚖️', title: 'Physics Consistency Verification', points: ['Enforce thermal heat laws', 'Verify temperature gradients'] },
      { icon: '☁️', title: 'Cloud Gap Filling', points: ['Temporal interpolation', 'Historical tile reference fill'] },
      { icon: '📈', title: 'Automatic Quality Metrics', points: ['PSNR, SSIM evaluation', 'Thermal error validation'] },
      { icon: '📡', title: 'Built using Open Satellite Data', points: ['Sentinel-3, Landsat data compatibility', 'Open-source tooling'] }
    ],
    processFlow: [
      'Satellite Thermal Image',
      'Thermal Super Resolution',
      'Scene Segmentation',
      'Retrieve Similar Historical Satellite Images',
      'Cross-Attention Fusion',
      'RGB Reconstruction',
      'Confidence Estimation',
      'Final Outputs (RGB, Enhanced Thermal, Confidence Map)'
    ],
    architectureFlow: [
      { title: 'Input', subtitle: 'Satellite Thermal Image', tech: 'Thermal Imagery Input', iconType: 'file' },
      { title: 'GeoRAG++ Core', subtitle: 'Super Resolution & Scene Understanding', tech: 'SwinIR & Vision Transformer', iconType: 'cpu' },
      { title: 'Retrieval Engine', subtitle: 'Historical Search & Physics Validation', tech: 'FAISS & Thermal Heat Laws', iconType: 'search' },
      { title: 'Cross Attention Fusion', subtitle: 'Diffusion Reconstruction Model', tech: 'PyTorch Diffusion Model', iconType: 'layers' },
      { title: 'Outputs', subtitle: 'Enhanced Thermal, RGB & Confidence Map', tech: 'Rasterio / GDAL Output Files', iconType: 'database' }
    ],
    teamMembers: [
      {
        name: 'Rounak Sharma',
        role: 'Team Leader',
        image: profile,
        github: 'https://github.com/Rounak43',
        linkedin: 'https://linkedin.com/in/rounaksharma43',
        contribution: '(To be updated after shortlisting)'
      },
      {
        name: 'Deepak Das',
        role: 'Member',
        image: profile,
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: '(To be updated after shortlisting)'
      },
      {
        name: 'Sanmati Payappa',
        role: 'Member',
        image: profile,
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: '(To be updated after shortlisting)'
      },
      {
        name: 'Srinivas RC',
        role: 'Member',
        image: profile,
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        contribution: '(To be updated after shortlisting)'
      }
    ],
    myContribution: 'Currently contributed to researching the problem statement, designing the solution architecture, preparing the proposal, and team coordination. (Leave implementation details empty until project development begins.)',
    achievements: [
      { label: 'Status', value: 'Proposal Submitted', badge: '📝' },
      { label: 'Stage', value: 'Awaiting Shortlisting', badge: '⏳' },
      { label: 'Phase', value: 'Project Yet to Start', badge: '⚙️' },
      { label: 'Event', value: 'Final Round on 6 Aug 2026', badge: '📅' }
    ],
    implementationPlan: {
      text: 'Implementation will begin after the official shortlist announcement.',
      placeholders: [
        { label: 'Backend', value: 'Coming Soon' },
        { label: 'Frontend', value: 'Coming Soon' },
        { label: 'Model Training', value: 'Coming Soon' },
        { label: 'Dataset', value: 'Coming Soon' },
        { label: 'Deployment', value: 'Coming Soon' },
        { label: 'Evaluation', value: 'Coming Soon' }
      ]
    },
    resources: [
      { label: 'Project Proposal', url: '#', status: 'Available' },
      { label: 'GitHub Repository', url: '#', status: 'Coming Soon' },
      { label: 'Presentation Slides', url: '#', status: 'Coming Soon' },
      { label: 'Certificate', url: '#', status: 'If shortlisted' },
      { label: 'Demo Video', url: '#', status: 'Coming Soon' }
    ]
  }
];
