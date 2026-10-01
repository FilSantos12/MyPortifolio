import type { Project } from '../data/types';

/** Tecnologias do projeto em ordem de relevância para o card (front, back, infra...). */
export function projectTech(project: Project, limit = 5): string[] {
  const { front = [], back = [], infra = [], integrations = [], quality = [] } = project.stack;
  return [...front, ...back, ...infra, ...integrations, ...quality].slice(0, limit);
}

export const contextLabel: Record<Project['context'], string> = {
  cliente: 'Cliente',
  proprio: 'Projeto próprio',
};
