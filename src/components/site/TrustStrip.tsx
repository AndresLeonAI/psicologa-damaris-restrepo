import { Award, BookOpenText, GraduationCap, Landmark, ScrollText, ShieldCheck } from "lucide-react";
import { CONTACT } from "@/lib/site";

/**
 * Cinta continua de respaldo académico. Solo instituciones, títulos y
 * publicaciones reales del perfil profesional: nada de sellos genéricos.
 */
const items = [
  { icon: Landmark, label: "Universidad de Antioquia" },
  { icon: GraduationCap, label: "Magíster en Investigación Psicoanalítica" },
  { icon: Award, label: "Tesis laureada Cum laude" },
  { icon: ScrollText, label: "Psicóloga · Corporación Universitaria Minuto de Dios" },
  { icon: BookOpenText, label: "Publicada en Revista Affectio Societatis" },
  { icon: ShieldCheck, label: `Colegiada N.º ${CONTACT.colegiado}` },
];

export function TrustStrip() {
  const loop = [...items, ...items];
  return (
    <section
      aria-label="Formación y respaldo académico"
      className="marquee-pause relative overflow-hidden border-y border-[#A9E4E2]/40 bg-white/70 py-7 backdrop-blur-sm"
    >
      <div className="mask-fade-x">
        <div className="animate-marquee flex w-max items-center gap-12">
          {loop.map(({ icon: Icon, label }, i) => (
            <span
              key={`${label}-${i}`}
              aria-hidden={i >= items.length}
              className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-[#0B4A50]/80"
            >
              <Icon className="h-5 w-5 text-[#14A3A8]" strokeWidth={1.7} />
              {label}
              <span className="ml-9 text-[#A9E4E2]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
