import { motion } from "framer-motion";
import { Building2, Check, Globe2, MessageCircle, Sparkles, Video } from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/site";
import { CTAButton } from "./CTAButton";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Tarifa única publicada en su perfil para todas las modalidades. */
const PRICE = "130.000";

const included = [
  "Consulta psicológica individual",
  "Psicoterapia y consulta terapéutica",
  "Consulta en crisis",
  "Psicoterapia de duelo",
  "Consulta juvenil y primera vez infantil",
  "Asesoría psicológica y psicoeducación",
];

const channels = [
  { icon: Building2, label: "Presencial en Medellín" },
  { icon: Video, label: "En línea en Colombia" },
  { icon: Globe2, label: "En línea internacional" },
];

export function Pricing() {
  return (
    <section id="tarifas" className="relative scroll-mt-24 overflow-hidden bg-[#F6FBFA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Tarifas"
          title="Una tarifa clara,"
          accent="sin letra pequeña."
          lead="El mismo valor por sesión, sin importar el motivo de consulta ni la modalidad que elijas."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-[2.5rem] border border-[#A9E4E2]/60 bg-white shadow-[0_40px_100px_-50px_rgba(11,74,80,0.5)] lg:grid-cols-5"
        >
          <div className="bg-premium-teal premium-noise relative flex flex-col justify-between overflow-hidden p-10 text-white lg:col-span-2">
            <div className="aurora-blob pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full opacity-40" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#D6F2F0]">
                <Sparkles className="h-3.5 w-3.5" /> Por sesión
              </span>
              <p className="mt-8 font-serif-editorial text-6xl font-bold leading-none sm:text-7xl">
                ${PRICE}
              </p>
              <p className="mt-3 text-sm text-[#D6F2F0]/80">COP · presencial o en línea</p>
            </div>
            <ul className="relative mt-10 space-y-3">
              {channels.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-white/90">
                  <Icon className="h-4 w-4 text-[#8FE3D9]" /> {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col p-10 lg:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Incluye la misma tarifa para
            </p>
            <ul className="mt-6 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              {included.map((item, k) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + k * 0.06, ease: EASE }}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#14A3A8] text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={buildWaUrl(WA.tarifas)} tone="teal" icon={MessageCircle}>
                Reservar mi sesión
              </CTAButton>
              <CTAButton href={CONTACT.doctoralia} tone="ocean" variant="outline">
                Ver en Doctoralia
              </CTAButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
