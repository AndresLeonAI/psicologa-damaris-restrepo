/**
 * Identidad canónica del sitio.
 *
 * Este es el ÚNICO lugar donde vive el dominio. Canonical, og:url, JSON-LD y el
 * sitemap se derivan de aquí, así que conectar el dominio definitivo es cambiar
 * una línea y volver a desplegar.
 */
export const SITE_URL = "https://www.profesionaldamarisrestrepo.com";

/** Nombre de la marca, usado en metadatos sociales y datos estructurados. */
export const SITE_NAME = "Damaris Restrepo — Psicóloga clínica en Medellín";

/**
 * Rutas indexables. El generador del sitemap lee de aquí, así que añadir una
 * página nueva es añadir una entrada y nada más.
 */
export const ROUTES = [{ path: "/", changefreq: "weekly", priority: "1.0" }] as const;

/** URL absoluta a partir de una ruta relativa. */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Datos de contacto y agenda verificados en su perfil profesional. */
export const CONTACT = {
  phoneDisplay: "+57 313 793 9898",
  phoneTel: "+573137939898",
  address: "Cra. 65 #34-05",
  city: "Medellín, Antioquia",
  postalCode: "050001",
  mapsUrl: "https://www.google.com/maps?q=6.2401772,-75.5832748",
  mapsEmbed: "https://maps.google.com/maps?q=6.2401772,-75.5832748&z=16&output=embed",
  instagram: "https://www.instagram.com/psico.damaris_restrepo",
  instagramHandle: "@psico.damaris_restrepo",
  doctoralia: "https://www.doctoralia.co/perfil/damaris-restrepo",
  doctoraliaPresencial: "https://www.doctoralia.co/perfil/damaris-restrepo#highlight-calendar-12352",
  doctoraliaOnline: "https://www.doctoralia.co/perfil/damaris-restrepo#highlight-calendar-12260",
  colegiado: "146247",
} as const;
