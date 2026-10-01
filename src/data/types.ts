import type { ImageMetadata } from 'astro';

export type ProjectCategory = 'saas' | 'ecommerce' | 'gestao' | 'institucional';
export type ProjectContext = 'cliente' | 'proprio';

/** Imagem de projeto com texto alternativo (o alt vem do site legado quando existia). */
export type ProjectImage = { src: ImageMetadata; alt: string };

/** src: caminho em public/, ex.: '/videos/tattoo-studio.mp4' (use com url()). */
export type ProjectVideo = { src: string; poster: ImageMetadata };

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
  /** Vídeo em public/videos/ com capa (primeiro frame) em src/assets/projects/<slug>/poster.jpg. */
  video?: ProjectVideo;
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
