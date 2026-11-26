export type ProjectCategory =
  | 'AI & Data'
  | 'Realtime Systems'
  | 'Backend'
  | 'Web Platform';

export interface Project {
  slug: string;
  title: string;
  /** One line used on cards. */
  tagline: string;
  /** Short paragraphs used on the detail page. */
  description: string[];
  highlights: string[];
  technologies: string[];
  category: ProjectCategory;
  featured: boolean;
  /** Marks starter content that is not a real personal project. */
  sample: boolean;
  cover: string;
  coverAlt: string;
  /** ISO date (YYYY-MM-DD). Optional when the date is not public. */
  date?: string;
  status: 'Live' | 'In development' | 'Sample';
  role?: string;
  github?: string;
  demo?: string;
}

/**
 * The first project is real and comes from the attached CV.
 * The other entries are clearly marked sample content. Replace their copy,
 * links, and artwork with your own projects before publishing.
 */
export const projects: Project[] = [
  {
    slug: 'machinemakesmoney',
    title: 'MachineMakesMoney',
    tagline: 'AI-assisted financial analysis and decision support',
    description: [
      'MachineMakesMoney is an AI-powered SaaS platform for financial data analysis, automated decision support, and an integrated chatbot assistant. It combines a Django backend, a React frontend, and PostgreSQL with a vector database for retrieval over financial context.',
      'The project is built around Python, Django, React, PostgreSQL, Qdrant, and LangChain. The assistant uses LLM-backed workflows to turn analyst questions into grounded answers and to support repeatable research steps.',
    ],
    highlights: [
      'Designed the application around Django and PostgreSQL for structured financial data.',
      'Integrated Qdrant and LangChain for retrieval-augmented assistant workflows.',
      'Built a React interface for analysis, decision support, and conversational exploration.',
    ],
    technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'Qdrant', 'LangChain', 'LLM'],
    category: 'AI & Data',
    featured: true,
    sample: false,
    cover: '/images/projects/machinemakesmoney.svg',
    coverAlt: 'Abstract financial analysis dashboard illustration',
    status: 'Live',
    role: 'Developer',
    demo: 'https://machinemakesmoney.com',
  },
  {
    slug: 'pulseboard',
    title: 'Pulseboard',
    tagline: 'Live operations view for realtime voice sessions',
    description: [
      'A sample project included with this portfolio template. Pulseboard is imagined as an internal console for watching live voice sessions: connection health, turn latency, and escalation state in one quiet view.',
      'The interface demonstration uses a small realtime event stream, a session table, and per-call detail panels. Replace this text with a real project you have built and shipped.',
    ],
    highlights: [
      'Event-driven session model with reconnect-safe state.',
      'Latency breakdown per conversation turn.',
      'Keyboard-friendly moderation actions.',
    ],
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'WebSockets', 'Redis'],
    category: 'Realtime Systems',
    featured: true,
    sample: true,
    cover: '/images/projects/pulseboard.svg',
    coverAlt: 'Abstract realtime voice session dashboard illustration',
    status: 'Sample',
    role: 'Sample project',
  },
  {
    slug: 'queuescope',
    title: 'QueueScope',
    tagline: 'Observability for Celery and Redis workloads',
    description: [
      'A sample project included with this portfolio template. QueueScope is imagined as a compact dashboard for asynchronous workloads: queue depth, retry pressure, and the slowest task paths.',
      'The concept pairs a FastAPI collector with a Redis-backed worker fleet and a small frontend. Replace this entry with a project of your own.',
    ],
    highlights: [
      'Queue depth and retry-rate history.',
      'Slow-task tracing across workers.',
      'Alert rules for backlog growth.',
    ],
    technologies: ['Python', 'Celery', 'Redis', 'FastAPI', 'Docker'],
    category: 'Backend',
    featured: true,
    sample: true,
    cover: '/images/projects/queuescope.svg',
    coverAlt: 'Abstract task queue monitoring illustration',
    status: 'Sample',
    role: 'Sample project',
  },
  {
    slug: 'harbor-api',
    title: 'Harbor API',
    tagline: 'A typed FastAPI service template for small teams',
    description: [
      'A sample project included with this portfolio template. Harbor API is imagined as an opinionated starting point for backend services: typed settings, structured logging, migrations, and a tested health surface.',
      'The template is intentionally small. It is a place to document the conventions you actually use, not a framework to maintain. Replace it with your own starter kit or open-source project.',
    ],
    highlights: [
      'Pydantic settings and typed configuration.',
      'Alembic migrations with a local Docker workflow.',
      'Request IDs and structured JSON logs.',
    ],
    technologies: ['FastAPI', 'Python', 'PostgreSQL', 'Alembic', 'Docker', 'GitHub Actions'],
    category: 'Backend',
    featured: false,
    sample: true,
    cover: '/images/projects/harbor-api.svg',
    coverAlt: 'Abstract API service template illustration',
    status: 'Sample',
    role: 'Sample project',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectCategories: ProjectCategory[] = [
  'AI & Data',
  'Realtime Systems',
  'Backend',
  'Web Platform',
];
