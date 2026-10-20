import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle, Quote } from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/site";
import { CTAButton } from "./CTAButton";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Opiniones reales publicadas por pacientes en Doctoralia, citadas de forma
 * anónima. Deliberadamente sin marcado `Review`/`AggregateRating`: las reseñas
 * verificadas viven en la plataforma de origen.
 */
const featured = [
  {
    quote:
      "Llegué nublada, triste, un poco perdida y evasiva. Llevo más de un año en terapia y siento más claridad, reconocimiento y comprensión sobre mí. Ha sido un proceso muy transformador.",
    who: "Paciente en proceso",
  },
  {
    quote:
      "Iniciar este proceso terapéutico fue una de las mejores decisiones de mi vida. Aprendí a conocerme, a creer nuevamente en mí y a descubrir una versión de mí que ni siquiera conocía.",
    who: "Paciente",
  },
  {
    quote:
      "Desde que mi hija adolescente consulta con Damaris se le han observado avances significativos, algo que fue complejo con otros profesionales, ya que se le dificultaba hablar y expresarse.",
    who: "Madre de paciente adolescente",
  },
  {
    quote:
      "Siento que voy hilando, conectando y entendiendo cada vez un poco más de quién soy y quién quiero llegar a ser. Gracias por hacer de este proceso de psicoanálisis una guía bonita para mi vida.",
    who: "Paciente de psicoanálisis",
  },
  {
    quote:
      "Hoy me siento con mucha libertad de hablar; antes solía silenciarme mucho. He aprendido a abrazarme, escucharme y conocerme muchísimo más.",
    who: "Paciente",
  },
];

const short = [
  "Me sentí escuchada desde el primer momento y siempre me brindó un espacio seguro y de confianza.",
  "Las consultas fueron mi salvavidas en medio de la crisis.",
  "Hace preguntas que llevan a cuestionarse y clarificar.",
  "Puntual, responsable, atenta y muy respetuosa, siempre dispuesta a escuchar.",
  "Me ayuda a fijarme en cosas de las que no me doy cuenta.",
  "Es una calma que brinda calidez. Sin dudas, la mejor.",
  "Respetuosa en los temas complicados de trabajar.",
  "Comprometida con la formación continua.",
  "Excelente servicio, escucha atenta e intervenciones oportunas.",
  "Ha sido una experiencia de crecimiento invaluable.",
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = featured.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 7000);
    return () => clearInterval(id);
  }, [paused, n]);

  const loop = [...short, ...short];

  return (
    <section
      id="opiniones"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#F6FBFA] via-[#E3F6F5]/60 to-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Opiniones de pacientes"
          title="Lo que dicen quienes"
          accent="ya dieron el paso."
          lead="Más de 30 opiniones publicadas en Doctoralia. Aquí algunas, en sus propias palabras."
        />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-[#A9E4E2]/50 bg-white p-8 shadow-[0_40px_100px_-50px_rgba(11,74,80,0.45)] sm:p-14"
        >
          <Quote className="absolute right-8 top-8 h-20 w-20 text-[#E3F6F5]" strokeWidth={1.2} />
          <div className="relative min-h-[220px] sm:min-h-[190px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div className="mb-5 flex gap-1 text-[#F2B84B]">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <svg key={k} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-serif-editorial text-xl leading-relaxed text-[#0E2A2E] sm:text-2xl">
                  “{featured[i].quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-[#0B7A80]">
                  {featured[i].who} · <span className="font-normal text-slate-500">Doctoralia</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="relative mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {featured.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  aria-label={`Ver opinión ${k + 1}`}
                  onClick={() => setI(k)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    k === i ? "w-10 bg-[#14A3A8]" : "w-2 bg-[#A9E4E2] hover:bg-[#14A3A8]/60"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Opinión anterior"
                onClick={() => setI((v) => (v - 1 + n) % n)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#A9E4E2] text-[#0B7A80] transition-colors hover:bg-[#E3F6F5]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Opinión siguiente"
                onClick={() => setI((v) => (v + 1) % n)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#14A3A8] text-white transition-colors hover:bg-[#0B7A80]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cinta de frases cortas */}
      <div className="marquee-pause mask-fade-x mt-16 overflow-hidden">
        <div className="animate-marquee-slow flex w-max gap-5">
          {loop.map((q, k) => (
            <figure
              key={`${q}-${k}`}
              aria-hidden={k >= short.length}
              className="w-[320px] shrink-0 rounded-2xl border border-[#A9E4E2]/50 bg-white/90 p-5 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-slate-700">“{q}”</p>
              <figcaption className="mt-3 text-xs font-semibold text-[#14A3A8]">Paciente</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center justify-center gap-3 px-6 sm:flex-row">
        <CTAButton href={buildWaUrl(WA.hero)} tone="rose" icon={MessageCircle}>
          Quiero vivir mi proceso
        </CTAButton>
        <CTAButton href={CONTACT.doctoralia} tone="ocean" variant="outline">
          Leer todas en Doctoralia
        </CTAButton>
      </div>
    </section>
  );
}
