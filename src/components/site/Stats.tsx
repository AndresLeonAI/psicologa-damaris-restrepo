import { motion } from "framer-motion";
import { CountUp } from "./CountUp";
import { conditions } from "./Conditions";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Cifras verificables del perfil profesional, sin redondeos inflados. */
const stats = [
  { to: 10, prefix: "+", suffix: "", label: "años de ejercicio", detail: "Psicóloga desde 2014" },
  { to: 30, prefix: "+", suffix: "", label: "opiniones de pacientes", detail: "Publicadas en Doctoralia" },
  { to: 3, prefix: "", suffix: "", label: "publicaciones académicas", detail: "Psicoanálisis, trauma y duelo" },
  { to: conditions.length, prefix: "", suffix: "", label: "motivos de consulta", detail: "Acompañados en consulta" },
];

export function Stats() {
  return (
    <section aria-label="Cifras" className="relative bg-[#F6FBFA] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-[#A9E4E2]/50 bg-white shadow-[0_30px_80px_-40px_rgba(11,74,80,0.35)] lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className={`group relative p-7 sm:p-9 ${i % 2 === 0 ? "border-r" : ""} ${
                i < 2 ? "border-b lg:border-b-0" : ""
              } border-[#E3F6F5] lg:border-r lg:last:border-r-0`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#E3F6F5] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="relative font-serif-editorial text-5xl font-bold text-[#0B7A80] sm:text-6xl">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="relative mt-3 text-sm font-bold text-[#0E2A2E]">{s.label}</p>
              <p className="relative mt-1 text-xs text-slate-500">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
