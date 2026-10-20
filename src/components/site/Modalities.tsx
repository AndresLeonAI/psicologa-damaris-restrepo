import { motion } from "framer-motion";
import { Building2, CalendarCheck, Check, Globe2, MessageCircle, Video } from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/site";
import { CTAButton } from "./CTAButton";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const modes = [
  {
    icon: Building2,
    tag: "Presencial",
    title: "Consulta en Medellín",
    desc: "Un espacio tranquilo y confidencial para encontrarnos cara a cara.",
    points: [`${CONTACT.address}, ${CONTACT.city}`, "Consulta individual presencial", "Agenda por WhatsApp o Doctoralia"],
    href: buildWaUrl(WA.presencial),
    booking: CONTACT.doctoraliaPresencial,
    tone: "teal" as const,
    gradient: "from-[#19B3B8] to-[#0B4A50]",
  },
  {
    icon: Video,
    tag: "En línea",
    title: "Consulta virtual",
    desc: "La misma escucha, desde donde estés. Para todo Colombia y el exterior.",
    points: ["Bogotá y resto de Colombia", "Consulta en línea internacional", "Solo necesitas conexión y un lugar privado"],
    href: buildWaUrl(WA.online),
    booking: CONTACT.doctoraliaOnline,
    tone: "sky" as const,
    gradient: "from-[#4FB3E8] to-[#1D5C70]",
  },
];

export function Modalities() {
  return (
    <section id="modalidades" className="relative scroll-mt-24 overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Modalidades"
          icon={Globe2}
          title="Aquí en Medellín"
          accent="o donde estés."
          lead="Damaris entiende los cambios de la vida actual y atiende tanto de forma presencial como virtual."
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {modes.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.tag}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                className="group relative overflow-hidden rounded-[2rem] border border-[#A9E4E2]/50 bg-[#F6FBFA] p-8 sm:p-10"
              >
                <div
                  aria-hidden
                  className={`absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${m.gradient} opacity-15 blur-2xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-25`}
                />
                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${m.gradient} text-white shadow-lg transition-transform duration-500 group-hover:scale-110`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full border border-[#A9E4E2] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B7A80]">
                    {m.tag}
                  </span>
                </div>
                <h3 className="relative mt-7 font-serif-editorial text-3xl font-bold text-[#0E2A2E]">{m.title}</h3>
                <p className="relative mt-3 text-base text-slate-600">{m.desc}</p>
                <ul className="relative mt-6 space-y-3">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-slate-700">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#14A3A8]/15 text-[#0B7A80]">
                        <Check className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
                  <CTAButton href={m.href} tone={m.tone} icon={MessageCircle}>
                    Agendar por WhatsApp
                  </CTAButton>
                  <CTAButton href={m.booking} tone="ocean" variant="outline" icon={CalendarCheck} arrow={false}>
                    Reservar en Doctoralia
                  </CTAButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
