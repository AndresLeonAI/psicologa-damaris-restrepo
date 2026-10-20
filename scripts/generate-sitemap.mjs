/**
 * Genera public/sitemap.xml y public/robots.txt a partir de src/lib/site.ts.
 *
 * Se ejecuta antes del build para que el sitemap nunca se desincronice de las
 * rutas reales: añadir una página es añadir una entrada en ROUTES, y nada más.
 *
 * Se leen las constantes con una expresión regular en lugar de importar el
 * módulo porque es TypeScript y este script corre en Node sin transpilar.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(ROOT, "src/lib/site.ts"), "utf8");

const siteUrl = source.match(/export const SITE_URL = "([^"]+)"/)?.[1];
if (!siteUrl) throw new Error("No se pudo leer SITE_URL de src/lib/site.ts");

const routes = [...source.matchAll(/\{\s*path:\s*"([^"]+)",\s*changefreq:\s*"([^"]+)",\s*priority:\s*"([^"]+)"/g)]
  .map(([, path, changefreq, priority]) => ({ path, changefreq, priority }));

if (!routes.length) throw new Error("No se pudo leer ROUTES de src/lib/site.ts");

// Fecha del build. Solo debe cambiar cuando cambie el contenido, así que se usa
// la fecha del día del despliegue y no una marca por cada ejecución.
const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(({ path, changefreq, priority }) => {
    const loc = path === "/" ? siteUrl : `${siteUrl}${path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

// Se permite todo el rastreo. Los únicos bloqueos son rutas internas de la
// plataforma que no aportan nada al índice y solo gastan presupuesto de rastreo.
const robots = `User-agent: *
Allow: /

Disallow: /_build/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(join(ROOT, "public"), { recursive: true });
writeFileSync(join(ROOT, "public/sitemap.xml"), sitemap);
writeFileSync(join(ROOT, "public/robots.txt"), robots);

console.log(`sitemap.xml + robots.txt generados para ${siteUrl} (${routes.length} rutas)`);
