import type { ImageMetadata } from 'astro';
import type { ProjectImage } from '../data/types';

const projectFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/projects/*/*.{png,jpg,jpeg,webp}',
  { eager: true },
);

/**
 * Imagens de src/assets/projects/<slug>/, na ordem dos alts informados (01.png, 02.png...).
 * Falha o build se faltar algum arquivo, para um alt nunca ficar sem imagem.
 */
export function projectImages(slug: string, alts: string[]): ProjectImage[] {
  return alts.map((alt, i) => {
    const file = `${String(i + 1).padStart(2, '0')}.png`;
    const mod = projectFiles[`../assets/projects/${slug}/${file}`];
    if (!mod) throw new Error(`Imagem não encontrada: src/assets/projects/${slug}/${file}`);
    return { src: mod.default, alt };
  });
}
