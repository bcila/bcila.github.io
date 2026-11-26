/**
 * Central profile configuration.
 *
 * Update this file to make the portfolio yours. Every component reads from
 * here, so no UI component needs to be edited.
 */
export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin';
}

const githubUrl = 'https://github.com/bcila';
const linkedinUrl = 'https://linkedin.com/in/burakanilcila';

export const profile = {
  name: 'Burak Anıl Cila',
  shortName: 'Burak Cila',
  initials: 'BC',
  title: 'Backend Developer',
  location: 'Türkiye',
  timezone: 'UTC+3',
  email: 'b.cila51@gmail.com',

  /** Written in the first person, used in the footer and article author card. */
  bio: 'Backend developer with 3+ years of experience building scalable systems — from high-traffic mobile backends to realtime AI voice platforms. I care about clear APIs, reliable infrastructure, and software that stays easy to change.',

  hero: {
    eyebrow: 'Backend developer · 3+ years',
    /** The part of the headline in `accent` is highlighted in the accent colour. */
    headline: 'I build backends that hold up in production.',
    accent: 'hold up',
    intro:
      'Three years of shipping APIs, realtime services, and AI voice systems. Currently focused on low-latency voice agents with FastAPI, LiveKit, and Gemini Live API.',
  },

  availability: {
    available: true,
    label: 'Open to backend & AI engineering roles',
    detail: 'Remote · UTC+3',
  },

  avatar: '/images/profile.svg',
  avatarAlt: 'Monogram placeholder for Burak Anıl Cila — replace with a profile photo',

  /** Put your PDF in public/resume/ and point this value at it. */
  resumeUrl: '/resume/burak-anil-cila-2026.pdf',

  github: githubUrl,
  linkedin: linkedinUrl,

  socials: [
    { label: 'GitHub', href: githubUrl, icon: 'github' },
    { label: 'LinkedIn', href: linkedinUrl, icon: 'linkedin' },
  ] satisfies SocialLink[],

  site: {
    url: 'https://bcila.github.io',
    title: 'Burak Anıl Cila — Backend Developer',
    description:
      'Backend developer building scalable APIs, realtime systems, and AI voice applications with Python, FastAPI, PHP, and modern cloud infrastructure.',
    locale: 'en_US',
  },
} as const;
