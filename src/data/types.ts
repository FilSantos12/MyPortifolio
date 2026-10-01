import type { ImageMetadata } from 'astro';

export type ProjectCategory = 'saas' | 'ecommerce' | 'gestao' | 'institucional';
export type ProjectContext = 'cliente' | 'proprio';

/** Imagem de projeto com texto alternativo (o alt vem do site legado quando existia). */
export type ProjectImage = { src: ImageMetadata; alt: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  context: ProjectContext;
  featured: boolean;
  order: number;
  problem: string;
  solution: string;
  /** 3 a 5 desafios técnicos */
  highlights: string[];
  stack: {
    front?: string[];
    back?: string[];
    infra?: string[];
    quality?: string[];
    integrations?: string[];
  };
  links?: { demo?: string; repo?: string };
  /** Vazio enquanto não houver prints: o card mostra um placeholder. */
  images: ProjectImage[];
  /** Caminho em public/, ex.: '/videos/tattoo-studio.mp4' (use com url()). */
  video?: string;
};

export type StackGroup = { title: string; items: string[] };

export type ContactLinks = {
  whatsapp: string;
  linkedin: string;
  github: string;
  cv: string;
};

export type Profile = {
  stats: { value: string; label: string }[];
  complementar: { title: string; text: string }[];
  links: ContactLinks;
};
