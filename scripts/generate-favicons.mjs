// Gera os favicons a partir do logo legado (F preto em quadrado branco, 500x500).
// O "F" foi redesenhado em vetor com as medidas de legacy/img/logo.png.
// Uso: node scripts/generate-favicons.mjs
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const letterF = `
  <g fill="#0d0d0d">
    <rect x="141" y="94" width="91" height="297" rx="10"/>
    <rect x="141" y="94" width="227" height="66" rx="10"/>
    <rect x="141" y="213" width="179" height="63" rx="10"/>
  </g>`;

const svg = (radius) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <rect width="500" height="500" rx="${radius}" fill="#ffffff"/>${letterF}
</svg>
`;

// favicon com cantos arredondados (como o logo na navbar); apple-touch sem cantos (o iOS aplica a máscara)
const rounded = svg(84);
const square = svg(0);

await writeFile('public/favicon.svg', rounded);
await sharp(Buffer.from(rounded)).resize(32, 32).png().toFile('public/favicon-32x32.png');
await sharp(Buffer.from(square)).resize(180, 180).png().toFile('public/apple-touch-icon.png');

console.log('Favicons gerados em public/');
