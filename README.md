# Damaris Restrepo — Psicóloga clínica en Medellín

Sitio web profesional de **Damaris Restrepo**, psicóloga clínica y magíster en
Investigación Psicoanalítica (Universidad de Antioquia). Construido sobre la
plantilla de psicólogos de NODOTO con TanStack Start, React 19, Tailwind CSS 4,
Framer Motion y Lenis.

Landing de una sola página con captación por WhatsApp y agenda en Doctoralia.

---

## Secciones

1. **Hero** — titular con revelado palabra por palabra, retrato en arco con
   anillos giratorios, insignias flotantes y halo que sigue al cursor.
2. **Cinta de respaldo** — marquesina con instituciones, títulos y publicaciones.
3. **Sobre mí** — su carta de bienvenida, especialidades y a quién acompaña.
4. **Cifras** — contadores animados (años de ejercicio, opiniones, publicaciones,
   motivos de consulta).
5. **Manifiesto** — su frase sobre los errores y las repeticiones, revelada con el scroll.
6. **Trayectoria** — línea de tiempo 2014–2023 que se dibuja al bajar.
7. **Respaldo académico** — diplomas con visor ampliado y publicaciones.
8. **¿Cuándo comenzar?** — motivos tomados de sus publicaciones.
9. **Motivos de consulta** — 8 tarjetas con halo al cursor y WhatsApp pre-redactado.
10. **Nube de motivos** — los 42 motivos de su perfil en tres cintas animadas.
11. **Cómo empezamos** — cuatro pasos con barra de progreso.
12. **Modalidades** — presencial en Medellín y en línea (nacional e internacional).
13. **Opiniones** — carrusel de testimonios reales y cinta de frases cortas.
14. **Multimedia** — publicaciones de Instagram.
15. **Tarifa** — $130.000 COP por sesión, en cualquier modalidad.
16. **Preguntas frecuentes** — acordeón (alimenta el JSON-LD `FAQPage`).
17. **Contacto** — WhatsApp, teléfono, dirección, Instagram y mapa.

Además: barra de progreso de lectura, navegación que se oculta al bajar,
botón flotante de WhatsApp y soporte para `prefers-reduced-motion`.

---

## Puesta en marcha

```bash
npm install
npm run dev        # desarrollo en localhost:3000
npm run build      # genera favicons, sitemap y compila (salida para Vercel)
npm run preview    # sirve el build de producción
```

---

## Dónde vive cada dato

| Dónde | Qué contiene |
|---|---|
| `src/lib/site.ts` | Dominio (`SITE_URL`), teléfono, dirección, mapa, Instagram, Doctoralia y colegiatura. |
| `src/lib/whatsapp.ts` | Número de WhatsApp y los mensajes pre-redactados por motivo. |
| `src/components/site/Trajectory.tsx` | Formación, reconocimientos y publicaciones con fecha. |
| `src/components/site/Services.tsx` | Motivos de consulta. |
| `src/components/site/Conditions.tsx` | Listado completo de motivos atendidos. |
| `src/components/site/Testimonials.tsx` | Opiniones de pacientes (anónimas). |
| `src/components/site/Pricing.tsx` | Tarifa. |
| `src/components/site/FAQ.tsx` | Preguntas frecuentes. |
| `src/routes/index.tsx` | Metadatos SEO y JSON-LD. |
| `src/styles.css` | Paleta turquesa de marca y utilidades de animación. |

Toda la información proviene de su perfil profesional publicado
(profesionaldamarisrestrepo.com / Doctoralia).

---

## Notas de SEO y cumplimiento

- Los testimonios **no** se marcan con `Review` ni `AggregateRating`: las
  reseñas verificadas viven en Doctoralia.
- Falta publicar una **política de tratamiento de datos** (Ley 1581 de 2012)
  antes de recopilar datos por formularios.
- Las fotografías provienen de su perfil público; conviene sumar fotos del
  consultorio cuando estén disponibles.
