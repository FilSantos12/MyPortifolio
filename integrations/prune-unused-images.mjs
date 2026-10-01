// Remove de dist/_astro/ as imagens que nenhuma página usa.
// O Astro emite o original de toda imagem importada (inclusive pelo import.meta.glob de
// src/lib/images.ts), mesmo quando só as versões otimizadas aparecem no HTML ou quando o
// print nem é exibido (ex.: prints extras de projetos sem página própria).
import { readdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGE = /\.(png|jpe?g|webp|avif|gif)$/i;
const TEXT = /\.(html|css|js|mjs|json|xml|webmanifest|txt)$/i;

/** @returns {import('astro').AstroIntegration} */
export default function pruneUnusedImages() {
  return {
    name: 'prune-unused-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = (await readdir(root, { recursive: true })).map(String);
        const texts = await Promise.all(
          files.filter((f) => TEXT.test(f)).map((f) => readFile(join(root, f), 'utf8')),
        );
        const referenced = texts.join('\n');

        const assetsDir = join(root, '_astro');
        const unused = (await readdir(assetsDir)).filter(
          (f) => IMAGE.test(f) && !referenced.includes(f),
        );
        await Promise.all(unused.map((f) => rm(join(assetsDir, f))));
        logger.info(`${unused.length} imagem(ns) sem uso removida(s) de _astro/`);
      },
    },
  };
}
