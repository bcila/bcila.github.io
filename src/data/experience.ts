export interface ExperienceEntry {
  company: string;
  role: string;
  employmentType: string;
  location: string;
  start: string;
  end: string | null;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  current?: boolean;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  location: string;
  start: string;
  end: string;
  summary?: string;
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  location: string;
  year: string;
  summary: string;
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Devolvia',
    role: 'Backend Developer',
    employmentType: 'Remote',
    location: 'Kayseri, Türkiye',
    start: 'Sep 2025',
    end: null,
    current: true,
    summary:
      'Building a production AI-powered voice call center platform for natural, realtime human–AI conversations.',
    responsibilities: [
      'Develop the voice call center platform with FastAPI, LiveKit, Gemini Live API, and NetGSM.',
      'Design REST APIs and WebSocket layers for low-latency AI–human voice interactions.',
      'Build asynchronous backend workflows with Celery and Redis for realtime voice processing and task management.',
      'Build a responsive moderation monitoring dashboard with Next.js, Tailwind CSS, and shadcn/ui.',
      'Run deployments and monitoring across AWS, Azure, and Coolify.',
    ],
    achievements: [
      'Shipped the voice platform from backend services through the operator-facing monitoring interface.',
      'Established an async processing layer that keeps realtime voice work off the request path.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'LiveKit',
      'Gemini Live API',
      'Celery',
      'Redis',
      'Next.js',
      'AWS',
      'Azure',
      'Coolify',
    ],
  },
  {
    company: 'VLMedia',
    role: 'Backend Developer',
    employmentType: 'Remote',
    location: 'Ankara, Türkiye',
    start: 'Jul 2022',
    end: 'May 2024',
    summary:
      'Maintained backend systems and APIs for a mobile application serving 200M+ users.',
    responsibilities: [
      'Developed and maintained backend systems with PHP, MySQL, MongoDB, Redis, and Elasticsearch.',
      'Designed and implemented RESTful APIs for the iOS and Android teams.',
      'Built and improved a moderation web application with PHP, JavaScript, jQuery, HTML, and CSS, adding features and fixing critical bugs.',
      'Contributed to a Python + Flask test platform for user balances, points, and payment systems.',
      'Worked in an agile team with code reviews and YouTrack issue tracking.',
    ],
    achievements: [
      'Supported a mobile product at 200M+ user scale while keeping client integrations stable.',
      'Improved operational efficiency of the moderation tooling used by internal teams.',
    ],
    technologies: [
      'PHP',
      'MySQL',
      'MongoDB',
      'Redis',
      'Elasticsearch',
      'Python',
      'Flask',
      'JavaScript',
      'jQuery',
      'YouTrack',
    ],
  },
  {
    company: 'Smartiks',
    role: 'Smart Student Program — App Development Training',
    employmentType: 'Training program',
    location: 'Istanbul, Türkiye',
    start: 'Apr 2022',
    end: 'May 2022',
    summary:
      'Selected for the Genç Yetenek 2022 program and completed an intensive technology training track.',
    responsibilities: [
      'Completed training across cyber security, blockchain, metaverse, app development, and digital marketing.',
      'Worked alongside other selected students in a structured, full-time program.',
    ],
    achievements: [],
    technologies: ['Cyber Security', 'Blockchain', 'App Development'],
  },
];

export const education: EducationEntry[] = [
  {
    institution: 'İskenderun Technical University',
    degree: 'BSc.',
    field: 'Computer Engineering',
    location: 'Hatay, Türkiye',
    start: 'Sep 2018',
    end: 'Jul 2022',
    summary:
      'Computer engineering degree covering software systems, data structures, databases, and networking.',
  },
];

export const certifications: CertificationEntry[] = [
  {
    title: 'Python & Django for Web Development Bootcamp',
    issuer: 'Kodluyoruz',
    location: 'Niğde, Türkiye',
    year: '2019',
    summary:
      'Intensive 60-hour bootcamp covering Python, Django, the MVT pattern, RESTful APIs, the ORM, and deployment.',
  },
];
