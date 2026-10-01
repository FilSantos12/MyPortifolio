import type { StackGroup } from './types';

export const stack: StackGroup[] = [
  {
    title: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'Vite',
      'TailwindCSS',
      'TanStack Query',
      'Bootstrap',
      'Recharts',
    ],
  },
  {
    title: 'Backend',
    items: ['Laravel', 'PHP', 'Sanctum', 'APIs REST', 'MySQL', 'SQLite'],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      'AWS (ECS, CloudFront, SES)',
      'Terraform',
      'Docker',
      'GitHub Actions',
      'Vercel',
      'Railway',
      'Sentry',
    ],
  },
  {
    title: 'Qualidade',
    items: ['Pest', 'PHPStan', 'Vitest', 'Testing Library', 'Playwright', 'ESLint', 'Prettier'],
  },
  {
    title: 'Integrações',
    items: ['Mercado Pago', 'Melhor Envio', 'Cloudinary', 'Anthropic API', 'ViaCEP'],
  },
  {
    title: 'Boas práticas',
    items: ['LGPD', 'SemVer', 'Autenticação com cookies HttpOnly'],
  },
  {
    title: 'IA no fluxo de trabalho',
    items: ['Claude Code', 'MCP', 'Subagentes', 'Skills de projeto'],
  },
];
