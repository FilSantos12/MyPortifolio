// Gera public/og-default.png (1200x630): imagem de compartilhamento das páginas sem imagem própria.
// O texto é renderizado com a Poppins do @fontsource (não depende da fonte instalada no sistema).
// Uso: node scripts/generate-og.mjs
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
import sharp from 'sharp';

const require = createRequire(import.meta.url);

/** Converte WOFF 1.0 em TTF (o Pango do sharp não lê WOFF): descomprime cada tabela e remonta o sfnt. */
function woffToTtf(woff) {
  const numTables = woff.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < numTables; i++) {
    const at = 44 + i * 20;
    const offset = woff.readUInt32BE(at + 4);
    const compLength = woff.readUInt32BE(at + 8);
    const origLength = woff.readUInt32BE(at + 12);
    const raw = woff.subarray(offset, offset + compLength);
    tables.push({
      tag: woff.subarray(at, at + 4),
      checksum: woff.readUInt32BE(at + 16),
      data: compLength < origLength ? inflateSync(raw) : raw,
    });
  }

  const pad4 = (n) => (n + 3) & ~3;
  const headerSize = 12 + numTables * 16;
  const out = Buffer.alloc(headerSize + tables.reduce((sum, t) => sum + pad4(t.data.length), 0));
  const searchRange = 2 ** Math.floor(Math.log2(numTables)) * 16;
  woff.copy(out, 0, 4, 8); // flavor (versão do sfnt)
  out.writeUInt16BE(numTables, 4);
  out.writeUInt16BE(searchRange, 6);
  out.writeUInt16BE(Math.log2(searchRange / 16), 8);
  out.writeUInt16BE(numTables * 16 - searchRange, 10);

  let offset = headerSize;
  tables.forEach((t, i) => {
    const at = 12 + i * 16;
    t.tag.copy(out, at);
    out.writeUInt32BE(t.checksum, at + 4);
    out.writeUInt32BE(offset, at + 8);
    out.writeUInt32BE(t.data.length, at + 12);
    t.data.copy(out, offset);
    offset += pad4(t.data.length);
  });
  return out;
}

const fontDir = await mkdtemp(join(tmpdir(), 'og-font-'));
const fontFile = async (weight) => {
  const woff = await readFile(
    require.resolve(`@fontsource/poppins/files/poppins-latin-${weight}-normal.woff`),
  );
  const file = join(fontDir, `poppins-${weight}.ttf`);
  await writeFile(file, woffToTtf(woff));
  return file;
};

const WIDTH = 1200;
const HEIGHT = 630;
const BG = '#0d0d0d';
const ACCENT = '#ccf381';
const MARGIN = 96;

/** Texto em PNG transparente; `size` em pontos do Pango (dpi 72 → 1pt = 1px). */
const text = async (content, weight, size) =>
  sharp({
    text: {
      text: `<span foreground="${ACCENT}">${content}</span>`,
      font: `Poppins ${weight >= 700 ? 'Bold ' : ''}${size}`,
      fontfile: await fontFile(weight),
      dpi: 72,
      rgba: true,
      width: WIDTH - MARGIN * 2,
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });

const name = await text('Filipe Santos', 700, 96);
const role = await text('Desenvolvedor Full-Stack Web · Laravel + React/TypeScript', 400, 32);

const gap = 28;
const blockHeight = name.info.height + gap + role.info.height;
const top = Math.round((HEIGHT - blockHeight) / 2);

// barra de destaque à esquerda do bloco de texto
const bar = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="${blockHeight}">
    <rect width="8" height="${blockHeight}" rx="4" fill="${ACCENT}"/>
  </svg>`,
);

await sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: BG } })
  .composite([
    { input: bar, left: MARGIN - 40, top },
    { input: name.data, left: MARGIN, top },
    { input: role.data, left: MARGIN, top: top + name.info.height + gap },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/og-default.png');

console.log('public/og-default.png gerado');
