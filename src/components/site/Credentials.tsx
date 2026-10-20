import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpenText, Expand, FileBadge2, X } from "lucide-react";
import diplomaMagister from "@/assets/images/diploma-magister-udea.webp";
import diplomaPsicologa from "@/assets/images/diploma-psicologa-uniminuto.webp";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Títulos con su diploma digitalizado (los datos personales ya vienen ocultos). */
const diplomas = [
  {
    src: diplomaMagister,
    w: 342,
    h: 530,
    title: "Magíster en Investigación Psicoanalítica",
    org: "Universidad de Antioquia · 2021",
    note: "Distinción Cum laude al trabajo de investigación",
  },
  {
    src: diplomaPsicologa,
    w: 530,
    h: 377,
    title: "Psicóloga",
    org: "Corporación Universitaria Minuto de Dios · 2014",
    note: "Título profesional en psicología",
  },
];

/** Producción académica publicada. */
const publications = [
  {
    year: "2023",
    title: "De la queja a la rectificación subjetiva",
    where: "Producción académica",
  },
  {
    year: "2021",
    title:
      "Trauma y duelo ante la pérdida de hijos en el contexto del conflicto armado colombiano: el caso de madres del municipio de Granada, Antioquia",
    where: "Tesis de maestría laureada · Universidad de Antioquia",
  },
  {
    year: "2019",
    title: "Las paradojas de la resistencia durante el proceso de cura según la perspectiva psicoanalítica",
    where: "Revista Affectio Societatis · Universidad de Antioquia, Vol. 16",
  },
];

export function Credentials() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="formacion" className="relative scroll-mt-24 overflow-hidden bg-white py-24 lg:py-32">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Respaldo académico"
          icon={FileBadge2}
          title="Títulos que puedes ver,"
          accent="investigación que puedes leer."
          lead="La confianza también se construye con transparencia. Estos son sus títulos y su producción académica."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Diplomas */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {diplomas.map((d, i) => (
              <motion.button
                key={d.title}
                type="button"
                onClick={() => setOpen(i)}
                initial={{ opacity: 0, y: 30, rotate: i === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                whileHover={{ y: -6 }}
                className="group flex cursor-zoom-in flex-col overflow-hidden rounded-3xl border border-[#A9E4E2]/50 bg-[#F6FBFA] text-left shadow-sm transition-shadow hover:shadow-[0_30px_70px_-35px_rgba(11,74,80,0.45)]"
              >
                <div className="relative flex h-72 items-center justify-center overflow-hidden bg-white p-5">
                  <img
                    src={d.src}
                    alt={`Diploma: ${d.title}, ${d.org}`}
                    width={d.w}
                    height={d.h}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#0E2A2E]/70 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex-1 p-6">
                  <h3 className="font-serif-editorial text-lg font-bold text-[#0E2A2E]">{d.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#0B7A80]">{d.org}</p>
                  <p className="mt-2 text-xs text-slate-500">{d.note}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Publicaciones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="rounded-3xl border border-[#A9E4E2]/50 bg-gradient-to-br from-[#E3F6F5] to-white p-8 lg:col-span-5"
          >
            <p className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B7A80]">
              <BookOpenText className="h-4 w-4" /> Publicaciones
            </p>
            <ol className="space-y-6">
              {publications.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
                  className="group relative border-l-2 border-[#A9E4E2] pl-5 transition-colors hover:border-[#14A3A8]"
                >
                  <span className="text-xs font-bold text-[#14A3A8]">{p.year}</span>
                  <p className="mt-1 font-serif-editorial text-base font-semibold leading-snug text-[#0E2A2E] sm:text-lg">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-500">{p.where}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>

      {/* Visor ampliado */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={diplomas[open].title}
            className="fixed inset-0 z-[70] flex cursor-zoom-out items-center justify-center bg-[#061B1D]/85 p-6 backdrop-blur-md"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              src={diplomas[open].src}
              alt={diplomas[open].title}
              className="max-h-[85vh] w-auto max-w-full rounded-2xl bg-white p-3 shadow-2xl"
            />
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
