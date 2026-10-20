import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CalendarCheck, Ear, MessageCircle, Route } from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CTAButton } from "./CTAButton";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    icon: MessageCircle,
    title: "Me escribes",
    desc: "Por WhatsApp o desde Doctoralia. No necesitas explicarlo todo: basta con contarme brevemente qué te trae.",
  },
  {
    icon: CalendarCheck,
    title: "Agendamos tu primera cita",
    desc: "Eliges consulta presencial en Medellín o en línea, en el horario que mejor se ajuste a tu vida.",
  },
  {
    icon: Ear,
    title: "Te escucho",
    desc: "En la primera sesión hablamos de lo que estás viviendo y de lo que esperas del proceso, y resolvemos tus dudas.",
  },
  {
    icon: Route,
    title: "Construimos tu proceso",
    desc: "Un camino adaptado a tu singularidad, con la frecuencia que acordemos, para comprender, aliviar y transformar.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section id="proceso" className="relative scroll-mt-24 overflow-hidden bg-[#F6FBFA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Cómo empezamos"
          title="Cuatro pasos,"
          accent="ninguna prisa."
          lead="Empezar terapia puede dar vértigo. Por eso el camino es sencillo y lo recorremos juntos."
        />

        <div ref={ref} className="relative">
          {/* Línea de progreso horizontal (escritorio) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-[3px] rounded-full bg-[#E3F6F5] lg:block" />
          <motion.div
            style={{ scaleX }}
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-[#7BE0B4] via-[#14A3A8] to-[#0B7A80] lg:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                  className="group relative flex flex-col items-center text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#F6FBFA] bg-gradient-to-br from-[#19B3B8] to-[#0B7A80] text-white shadow-[0_18px_40px_-16px_rgba(11,122,128,0.7)]"
                  >
                    <Icon className="h-7 w-7" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-[#0B7A80] shadow">
                      {i + 1}
                    </span>
                  </motion.div>
                  <h3 className="font-serif-editorial text-xl font-bold text-[#0E2A2E]">{s.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <CTAButton href={buildWaUrl(WA.hero)} tone="teal" size="lg" icon={MessageCircle}>
            Dar el paso uno
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
