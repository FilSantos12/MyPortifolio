import { getImage } from 'astro:assets';
import type { CarouselImage } from '../components/Carousel';
import type { ProjectImage } from '../data/types';

/** Gera no build as versões WebP responsivas que o Carousel (React) recebe prontas. */
export async function toCarouselImages(images: ProjectImage[]): Promise<CarouselImage[]> {
  return Promise.all(
    images.map(async ({ src, alt }) => {
      const img = await getImage({ src, widths: [480, 800, 1200, 1600], format: 'webp' });
      return {
        src: img.src,
        srcSet: img.srcSet.attribute,
        alt,
        width: src.width,
        height: src.height,
      };
    }),
  );
}
