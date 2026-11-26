export type SkillCategoryIcon =
  | 'code'
  | 'layout'
  | 'server'
  | 'database'
  | 'cloud'
  | 'wrench';

export interface SkillCategory {
  title: string;
  description: string;
  icon: SkillCategoryIcon;
  skills: string[];
}

/**
 * Only skills supported by the attached CV are listed. There are deliberately
 * no proficiency percentages or progress bars.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'The languages I reach for most, from services to scripts.',
    icon: 'code',
    skills: ['Python', 'PHP', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
  },
  {
    title: 'Frontend Development',
    description: 'Enough frontend to ship the interfaces around a backend.',
    icon: 'layout',
    skills: ['Next.js', 'React', 'Tailwind CSS', 'shadcn/ui', 'HTML & CSS', 'jQuery'],
  },
  {
    title: 'Backend Development',
    description: 'APIs, realtime layers, and asynchronous processing.',
    icon: 'server',
    skills: [
      'FastAPI',
      'Django',
      'Flask',
      'Node.js',
      'NestJS',
      'RESTful APIs',
      'WebSockets',
      'Celery',
      'LiveKit',
      'Gemini Live API',
      'LangChain',
    ],
  },
  {
    title: 'Databases',
    description: 'Relational, document, search, and vector stores.',
    icon: 'database',
    skills: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Elasticsearch',
      'Qdrant',
      'SQL & NoSQL',
    ],
  },
  {
    title: 'DevOps & Cloud',
    description: 'Getting services deployed, observed, and kept healthy.',
    icon: 'cloud',
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Coolify', 'Git'],
  },
  {
    title: 'Tools & Technologies',
    description: 'The working habits and tools around the code.',
    icon: 'wrench',
    skills: ['YouTrack', 'Agile / Scrum', 'Code Review', 'LLM Integration'],
  },
];
