import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// Ícones resolvidos no build (só em componentes .astro): viram SVG inline, sem fonte nem CDN.

const deviconDir = join(
  dirname(createRequire(import.meta.url).resolve('devicon/package.json')),
  'icons',
);

/** Nome da tecnologia (como em stack.ts/projects.ts) → arquivo do Devicon. */
const deviconMap: Record<string, string> = {
  React: 'react/react-original',
  TypeScript: 'typescript/typescript-plain',
  Vite: 'vitejs/vitejs-plain',
  TailwindCSS: 'tailwindcss/tailwindcss-original',
  Bootstrap: 'bootstrap/bootstrap-plain',
  'Bootstrap 5': 'bootstrap/bootstrap-plain',
  Laravel: 'laravel/laravel-original',
  'Laravel 12': 'laravel/laravel-original',
  PHP: 'php/php-plain',
  MySQL: 'mysql/mysql-original',
  SQLite: 'sqlite/sqlite-plain',
  AWS: 'amazonwebservices/amazonwebservices-plain-wordmark',
  'AWS (ECS, CloudFront, SES)': 'amazonwebservices/amazonwebservices-plain-wordmark',
  Terraform: 'terraform/terraform-plain',
  Docker: 'docker/docker-plain',
  'GitHub Actions': 'githubactions/githubactions-plain',
  Vercel: 'vercel/vercel-original',
  Railway: 'railway/railway-original',
  Sentry: 'sentry/sentry-original',
  Vitest: 'vitest/vitest-plain',
  Playwright: 'playwright/playwright-plain',
  ESLint: 'eslint/eslint-plain',
};

const socialIcons = import.meta.glob<string>('../assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** Troca as cores fixas por currentColor, para o ícone herdar a cor do texto. */
function monochrome(svg: string): string {
  return svg
    .replace(/\s(fill|stroke)="(?!none)[^"]*"/g, '')
    .replace(/<svg\b/, '<svg fill="currentColor" aria-hidden="true" focusable="false"');
}

/** SVG do Devicon para a tecnologia, ou undefined se não houver ícone. */
export function deviconSvg(tech: string): string | undefined {
  const file = deviconMap[tech];
  if (!file) return undefined;
  return monochrome(readFileSync(join(deviconDir, `${file}.svg`), 'utf8'));
}

export type SocialIcon = 'whatsapp' | 'linkedin' | 'github';

export function socialSvg(name: SocialIcon): string {
  const svg = socialIcons[`../assets/icons/${name}.svg`];
  if (!svg) throw new Error(`Ícone não encontrado: src/assets/icons/${name}.svg`);
  return monochrome(svg);
}
