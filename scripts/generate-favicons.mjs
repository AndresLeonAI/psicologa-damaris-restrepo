/**
 * Genera el juego de favicons a partir de brand-icon-source.png.
 *
 * Produce el juego de iconos que un navegador espera de verdad a partir de
 * una imagen cuadrada de origen:
 *
 *   favicon.ico          ICO real con 16/32/48 dentro (los navegadores lo
 *                        piden en la raíz aunque no se declare)
 *   favicon-96x96.png    pestañas en pantallas de alta densidad
 *   apple-touch-icon.png 180x180, pantalla de inicio en iOS
 *
 * No se generan los tamaños 192 y 512: solo los usa un manifest de PWA y este
 * sitio no lo tiene, así que serían archivos muertos en el despliegue.
 *
 * El ICO se construye a mano porque sharp no escribe ese contenedor. La
 * especificación admite PNG incrustado en cada entrada, que es lo que usan
 * todos los navegadores modernos y Windows desde Vista.
 */
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(ROOT, "package.json"));
const sharp = require("sharp");

const SOURCE = join(ROOT, "brand-icon-source.png");
const OUT = join(ROOT, "public");

/** Empaqueta varios PNG en un contenedor ICO válido. */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo 1 = icono
  header.writeUInt16LE(pngs.length, 4);

  const directory = Buffer.alloc(16 * pngs.length);
  let offset = 6 + directory.length;

  pngs.forEach(({ size, data }, i) => {
    const e = i * 16;
    directory[e] = size >= 256 ? 0 : size; // 0 significa 256
    directory[e + 1] = size >= 256 ? 0 : size;
    directory[e + 2] = 0; // paleta
    directory[e + 3] = 0; // reservado
    directory.writeUInt16LE(1, e + 4); // planos
    directory.writeUInt16LE(32, e + 6); // bits por píxel
    directory.writeUInt32LE(data.length, e + 8);
    directory.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });

  return Buffer.concat([header, directory, ...pngs.map((p) => p.data)]);
}

const kb = (p) => (statSync(p).size / 1024).toFixed(1);

const png = (size) =>
  sharp(SOURCE).resize(size, size, { fit: "contain" }).png({ compressionLevel: 9 }).toBuffer();

const icoSizes = [16, 32, 48];
const pngTargets = [
  { size: 96, name: "favicon-96x96.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

const embedded = [];
for (const size of icoSizes) embedded.push({ size, data: await png(size) });

writeFileSync(join(OUT, "favicon.ico"), buildIco(embedded));
console.log(`favicon.ico        ${icoSizes.join("/")}px   ${kb(join(OUT, "favicon.ico"))} KB`);

for (const { size, name } of pngTargets) {
  writeFileSync(join(OUT, name), await png(size));
  console.log(`${name.padEnd(19)}${size}px${" ".repeat(9 - String(size).length)}${kb(join(OUT, name))} KB`);
}

console.log(`\norigen: ${(statSync(SOURCE).size / 1048576).toFixed(2)} MB`);
