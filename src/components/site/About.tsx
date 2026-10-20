import { motion } from "framer-motion";
import { Brain, Clock3, Heart, HeartHandshake, MessageCircle, Sparkles, Users } from "lucide-react";
import retratoImg from "@/assets/images/damaris-retrato.webp";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CTAButton } from "./CTAButton";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Especialidades declaradas en su perfil profesional. */
const approach = [
  { icon: Brain, label: "Psicoanálisis", color: "#0B7A80" },
  { icon: HeartHandshake, label: "Psicología clínica", color: "#14A3A8" },
  { icon: Clock3, label: "Terapia breve", color: "#2F7F95" },
  { icon: Sparkles, label: "Psicoterapia", color: "#4CC995" },
];

/** A quién acompaña. */
const people = [
  { title: "Adolescentes", desc: "Un espacio donde poder hablar y expresarse sin sentirse juzgados." },
  { title: "Universitarios", desc: "Presión académica, decisiones y cambios que mueven el piso." },
  { title: "Adultos", desc: "Relaciones, trabajo, pérdidas y momentos de transformación personal." },
];

export function About() {
  return (
    <section
      id="sobre-mi"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-[#E3F6F5]/50 to-[#F6FBFA] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 aspect-square w-[45%] rounded-full bg-[#E3F6F5]/70 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A9E4E2]/60 bg-[#E3F6F5] px-3.5 py-1.5">
            <Heart className="h-3.5 w-3.5 text-[#0B7A80]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B7A80]">
              Unas pocas palabras
            </span>
          </div>
          <h2 className="font-serif-editorial text-4xl font-bold leading-tight text-[#0E2A2E] sm:text-5xl">
            Buscar ayuda no siempre es fácil.{" "}
            <span className="font-normal italic text-[#14A3A8]">Que estés aquí ya es un paso.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Carta de bienvenida */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#A9E4E2]/40 bg-white p-8 shadow-sm sm:p-12 lg:col-span-7"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-16 select-none font-serif-editorial text-[16rem] leading-none text-[#E3F6F5]"
            >
              “
            </span>
            <div className="relative">
              <p className="mb-2 font-serif-editorial text-3xl font-bold text-[#0E2A2E]">
                Hola, soy Damaris Restrepo.
              </p>
              <p className="mb-8 text-sm font-semibold text-[#14A3A8]">
                Psicóloga · Magíster en Investigación Psicoanalítica · Medellín
              </p>

              <div className="space-y-5 text-[15px] leading-relaxed text-slate-600 sm:text-base">
                <p>
                  Antes que nada, quiero agradecerte por estar aquí. Sé que buscar ayuda no siempre
                  es fácil, y el hecho de que hayas llegado hasta aquí{" "}
                  <strong className="text-[#0B7A80]">ya es un paso muy importante</strong>.
                </p>
                <p>
                  Quiero acompañarte a comprender lo que estás viviendo y favorecer estrategias que
                  te ayuden a encontrar claridad sobre tu experiencia y posibilidades de alivio, para
                  que transites tu proceso de la mejor manera posible.
                </p>
                <p>
                  Mi forma de trabajar es{" "}
                  <strong className="text-[#0B7A80]">cercana, humana y respetuosa con tu singularidad</strong>.
                  Cada persona tiene una historia diferente; por eso adapto cada proceso terapéutico a
                  sus necesidades, para que juntos podamos comprender lo que estás viviendo, gestionar
                  tus emociones y construir herramientas que favorezcan tu bienestar.
                </p>
                <p className="font-serif-editorial text-xl italic text-[#0E2A2E]">
                  No necesitas tener todo resuelto para empezar. A veces, dar el primer paso es el
                  inicio de un cambio muy importante.
                </p>
              </div>
            </div>

            <div className="relative mt-10 border-t border-[#E3F6F5] pt-7">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Especialidades
              </p>
              <div className="mb-8 flex flex-wrap gap-2.5">
                {approach.map(({ icon: Icon, label, color }, i) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
                    whileHover={{ y: -3 }}
                    className="inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold text-[#0E2A2E]"
                    style={{ borderColor: `${color}40`, backgroundColor: `${color}12` }}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                    {label}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <CTAButton href={buildWaUrl(WA.primerPaso)} tone="teal" icon={MessageCircle}>
                  Dar el primer paso
                </CTAButton>
                <CTAButton href="#trayectoria" tone="ocean" variant="outline">
                  Ver mi trayectoria
                </CTAButton>
              </div>
            </div>
          </motion.div>

          {/* Columna visual */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
              className="group relative flex min-h-[380px] flex-1 flex-col justify-end overflow-hidden rounded-[2rem] border border-[#A9E4E2]/40 p-8 shadow-md"
            >
              <img
                src={retratoImg}
                alt="Retrato de Damaris Restrepo, psicóloga"
                width={548}
                height={548}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[50%_25%] transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2A2E]/92 via-[#0E2A2E]/30 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A9E4E2]">
                  Un espacio seguro
                </span>
                <h3 className="mt-1 font-serif-editorial text-2xl font-bold">
                  Aquí no se juzga: se escucha
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-slate-200">
                  Escucha atenta, confidencialidad y respeto por tu ritmo. Un lugar para hablar de
                  aquello que pesa demasiado para vivirlo solo.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="rounded-[2rem] border border-[#A9E4E2]/40 bg-white/85 p-7 backdrop-blur"
            >
              <p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                <Users className="h-4 w-4 text-[#14A3A8]" /> Con quién trabajo
              </p>
              <ul className="space-y-4">
                {people.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#14A3A8]" />
                    <p className="text-sm leading-relaxed text-slate-600">
                      <strong className="text-[#0E2A2E]">{p.title}.</strong> {p.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
