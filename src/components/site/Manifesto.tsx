import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Feather, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";
import { WA, buildWaUrl } from "@/lib/whatsapp";

/**
 * Manifiesto — declaración editorial guiada por scroll (sin tarjetas).
 * El texto es la voz literal de Damaris, tomado de sus publicaciones: la
 * repetición y el error como material de transformación, no de reproche.
 */

const STATEMENT =
  "Los errores y las repeticiones pueden convertirse en culpas y reproches a sí mismo, o en aprendizajes de vida y oportunidades para alcanzar mejores versiones.";

// Palabras que permanecen en turquesa claro incluso tras revelarse por completo.
const ACCENT = new Set(["aprendizajes", "vida", "oportunidades", "mejores", "versiones"]);

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.28em] inline-block ${accent ? "text-[#8FE3D9]" : "text-white"}`}
    >
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const { scrollYProgress: bgProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const auroraY = useTransform(bgProgress, [0, 1], ["-12%", "12%"]);
  const glyphY = useTransform(bgProgress, [0, 1], ["18%", "-18%"]);
  const glyphOpacity = useTransform(bgProgress, [0, 0.5, 1], [0, 0.09, 0]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const words = STATEMENT.split(" ");

  return (
    <section className="bg-premium-teal premium-noise relative overflow-hidden">
      {/* Costuras de color para mantener el flujo con las secciones claras */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-[#F6FBFA] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-[#F6FBFA] to-transparent" />

      <motion.div
        style={{ y: auroraY }}
        className="aurora-blob pointer-events-none absolute left-1/2 top-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40"
      />

      <motion.span
        style={{ y: glyphY, opacity: glyphOpacity }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-serif-editorial text-[42vw] font-bold leading-none text-white"
      >
        Ψ
      </motion.span>

      <div
        ref={containerRef}
        className="relative z-0 mx-auto max-w-5xl px-6 py-40 lg:px-10 lg:py-56"
      >
        <Reveal className="mb-10 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#E3F6F5] backdrop-blur-sm">
            <Feather className="h-3.5 w-3.5" />
            Lo que creo
          </span>
        </Reveal>

        <p className="flex flex-wrap font-serif-editorial text-3xl font-medium leading-[1.35] tracking-tight sm:text-4xl lg:text-[3.25rem] lg:leading-[1.3]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const cleaned = word.toLowerCase().replace(/[.,:]/g, "");
            return (
              <Word
                key={`${word}-${i}`}
                progress={scrollYProgress}
                range={[start, end]}
                accent={ACCENT.has(cleaned)}
              >
                {word}
              </Word>
            );
          })}
        </p>

        <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative h-px w-40 overflow-hidden bg-white/15">
              <motion.div
                style={{ scaleX: lineScale }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-[#8FE3D9] to-white"
              />
            </div>
            <div>
              <p className="font-serif-editorial text-lg font-bold text-white">Damaris Restrepo</p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#D6F2F0]/70">
                Psicología clínica · Psicoanálisis
              </p>
            </div>
          </div>

          <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
            <CTAButton
              href={buildWaUrl(WA.hero)}
              tone="white"
              size="lg"
              icon={MessageCircle}
            >
              Empezar mi proceso
            </CTAButton>
            <CTAButton
              href="#proceso"
              tone="white"
              variant="outline"
              size="lg"
              className="!border-white/40 !bg-white/10 !text-white backdrop-blur-sm"
            >
              Cómo trabajo
            </CTAButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
