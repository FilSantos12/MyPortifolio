import type { Project, ProjectCategory } from '../data/types';
import { sortedProjects } from '../data/projects';

/** Tecnologias do projeto em ordem de relevância para o card (front, back, infra...). */
export function projectTech(project: Project, limit = 5): string[] {
  const { front = [], back = [], infra = [], integrations = [], quality = [] } = project.stack;
  return [...front, ...back, ...infra, ...integrations, ...quality].slice(0, limit);
}

export const contextLabel: Record<Project['context'], string> = {
  cliente: 'Cliente',
  proprio: 'Projeto próprio',
};

export const categoryLabel: Record<ProjectCategory, string> = {
  saas: 'SaaS',
  ecommerce: 'E-commerce',
  gestao: 'Gestão',
  institucional: 'Institucional',
};

/** Grupos da stack na página do projeto, na ordem de exibição. */
export const stackGroupLabel: Record<keyof Project['stack'], string> = {
  front: 'Frontend',
  back: 'Backend',
  infra: 'Infraestrutura',
  quality: 'Qualidade',
  integrations: 'Integrações',
};

/** Um projeto ganha página própria (estudo de caso) quando tem desafios técnicos. */
export function hasPage(project: Project): boolean {
  return project.highlights.length > 0;
}

/** Projetos com página própria, na ordem do campo `order` (usado no anterior/próximo). */
export const projectPages = sortedProjects.filter(hasPage);
