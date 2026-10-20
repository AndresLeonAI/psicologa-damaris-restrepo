import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, BookOpenText, GraduationCap, MessageCircle, School, Trophy } from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CTAButton } from "./CTAButton";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Trayectoria — formación, reconocimientos y producción académica en orden
 * cronológico. Todas las fechas provienen de su perfil profesional.
 */
const milestones = [
  {
    year: "2014",
    stage: "Formación de base",
    title: "Psicóloga",
    institution: "Corporación Universitaria Minuto de Dios",
    desc: "Formación profesional en psicología con práctica en el área clínica.",
    icon: School,
    color: "#2F7F95",
  },
  {
    year: "2014",
    stage: "Reconocimiento",
    title: "Reconocimiento por su labor en práctica clínica",
    institution: "Centro Psicológico UNIMINUTO · Bello",
    desc: "Distinción por la labor realizada durante la práctica profesional en psicología clínica.",
    icon: Trophy,
    color: "#F29E6B",
  },
  {
    year: "2019",
    stage: "Publicación",
    title: "Las paradojas de la resistencia durante el proceso de cura",
    institution: "Revista Affectio Societatis · Universidad de Antioquia, Vol. 16",
    desc: "Artículo sobre la resistencia en la clínica desde la perspectiva psicoanalítica.",
    icon: BookOpenText,
    color: "#4FB3E8",
  },
  {
    year: "2021",
    stage: "Especialización",
    title: "Magíster en Investigación Psicoanalítica",
    institution: "Universidad de Antioquia",
    desc: "Tesis laureada Cum laude: «Trauma y duelo ante la pérdida de hijos en el contexto del conflicto armado colombiano: el caso de madres del municipio de Granada, Antioquia».",
    icon: GraduationCap,
    color: "#0B7A80",
  },
  {
    year: "2023",
    stage: "Publicación",
    title: "De la queja a la rectificación subjetiva",
    institution: "Producción académica",
    desc: "Reflexión sobre el paso del malestar que se repite a la posibilidad de transformarlo.",
    icon: Award,
    color: "#4CC995",
  },
];

export function Trajectory() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section
      id="trayectoria"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#F6FBFA] via-white to-[#F6FBFA] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] bg-gradient-to-r from-[#E3F6F5]/80 to-transparent blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Trayectoria profesional"
          title="Una formación que"
          accent="sigue en movimiento."
          lead="Elegir a quién le confías tu proceso también significa saber dónde se formó, qué investiga y cómo piensa la clínica."
        />

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div ref={lineRef} className="relative pl-10 sm:pl-14 lg:col-span-8">
            {/* Riel y trazo que se dibuja con el scroll */}
            <div className="absolute bottom-4 left-3 top-4 w-[3px] rounded-full bg-[#E3F6F5] sm:left-5" />
            <motion.div
              style={{ scaleY }}
              className="absolute bottom-4 left-3 top-4 w-[3px] origin-top rounded-full bg-gradient-to-b from-[#2F7F95] via-[#14A3A8] to-[#4CC995] shadow-[0_0_14px_rgba(20,163,168,0.5)] sm:left-5"
            />

            <div className="space-y-10">
              {milestones.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <motion.article
                    key={m.title}
                    initial={{ opacity: 0, x: -36, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.85, delay: idx * 0.05, ease: EASE }}
                    className="group relative"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                      className="absolute -left-[37px] top-6 z-20 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white shadow-md sm:-left-[45px]"
                      style={{ backgroundColor: m.color }}
                    >
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </motion.div>

                    <div className="rounded-3xl border border-[#A9E4E2]/40 bg-white/90 p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#A9E4E2] group-hover:shadow-[0_24px_60px_-30px_rgba(11,74,80,0.35)] sm:p-8">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="font-serif-editorial text-3xl font-bold" style={{ color: m.color }}>
                          {m.year}
                        </span>
                        <span
                          className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                          style={{ color: m.color, backgroundColor: `${m.color}18` }}
                        >
                          {m.stage}
                        </span>
                      </div>
                      <h3 className="mb-2 font-serif-editorial text-xl font-bold text-[#0E2A2E] sm:text-2xl">
                        {m.title}
                      </h3>
                      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0B7A80]">
                        <Icon className="h-4 w-4 shrink-0" />
                        {m.institution}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-600">{m.desc}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* Tarjeta lateral fija */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="bg-premium-teal premium-noise relative overflow-hidden rounded-[2rem] p-8 text-white shadow-xl lg:sticky lg:top-28 lg:col-span-4"
          >
            <div className="aurora-blob pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40" />
            <p className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9E4E2]">
              Enfoque psicoanalítico
            </p>
            <p className="relative mt-4 font-serif-editorial text-2xl leading-snug">
              “Hace preguntas que llevan a cuestionarse y clarificar.”
            </p>
            <p className="relative mt-3 text-xs text-[#D6F2F0]/70">— Opinión de una paciente</p>
            <div className="relative my-7 h-px bg-white/15" />
            <ul className="relative space-y-3 text-sm text-[#D6F2F0]/90">
              <li>✦ Escucha de tu singularidad, no de un diagnóstico</li>
              <li>✦ Investigación en trauma, duelo y conflicto armado</li>
              <li>✦ Formación continua al servicio de cada proceso</li>
            </ul>
            <div className="relative mt-8">
              <CTAButton href={buildWaUrl(WA.hero)} tone="white" icon={MessageCircle} block>
                Agendar con Damaris
              </CTAButton>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
