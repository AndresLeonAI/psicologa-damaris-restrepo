import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Award,
  CalendarCheck,
  GraduationCap,
  MapPin,
  MessageCircle,
  MoveRight,
  ShieldCheck,
  Video,
} from "lucide-react";
import retratoImg from "@/assets/images/damaris-retrato.webp";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/site";
import { CTAButton } from "./CTAButton";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Credenciales verificables, tomadas de su perfil profesional. */
const credentials = [
  { icon: GraduationCap, title: "Magíster", desc: "en Investigación Psicoanalítica · U. de Antioquia" },
  { icon: Award, title: "Cum laude", desc: "Tesis de maestría laureada (2021)" },
  { icon: CalendarCheck, title: "Desde 2014", desc: "acompañando procesos terapéuticos" },
  { icon: ShieldCheck, title: `N.º ${CONTACT.colegiado}`, desc: "Registro profesional de colegiada" },
];

/** Titular dividido en palabras para revelarlo una a una. */
const HEADLINE = [
  ["No", "necesitas", "tener"],
  ["todo", "resuelto"],
  ["para", "empezar."],
];
const ACCENT_WORD = "resuelto";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Parallax: el retrato se desplaza más lento que la página.
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Halo de luz que sigue al cursor sobre el hero.
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgba(123,224,180,0.18), transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#F6FBFA] pt-32 pb-20 lg:pt-36"
    >
      {/* Fondos ambientales */}
      <motion.div aria-hidden style={{ background: spotlight }} className="pointer-events-none absolute inset-0" />
      <div className="bg-radial-teal-glow pointer-events-none absolute left-[-10%] top-[-5%] aspect-square w-[60%] rounded-full opacity-90 blur-[70px]" />
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_10%,transparent_65%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* Texto */}
        <motion.div style={{ y: textY }} className="flex flex-col items-start lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#A9E4E2]/70 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0B7A80] backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-soft-ping absolute inline-flex h-full w-full rounded-full bg-[#14A3A8]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14A3A8]" />
            </span>
            Psicóloga clínica{" "}
            <span className="hidden sm:inline">· Psicoanálisis </span>· Medellín y en línea
          </motion.span>

          <h1 className="mb-7 font-serif-editorial text-[2.7rem] font-bold leading-[1.05] tracking-tight text-[#0E2A2E] sm:text-6xl lg:text-[4.4rem]">
            {HEADLINE.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => {
                  const order = HEADLINE.slice(0, li).flat().length + wi;
                  return (
                    <motion.span
                      key={w}
                      initial={{ opacity: 0, y: 40, rotateX: -40, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.9, delay: 0.1 + order * 0.08, ease: EASE }}
                      className={`mr-[0.25em] inline-block ${
                        w === ACCENT_WORD ? "text-shimmer font-normal italic" : ""
                      }`}
                    >
                      {w}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mb-8 flex max-w-xl items-start gap-3 text-base leading-relaxed text-[#0E2A2E]/80 sm:text-lg"
          >
            <MoveRight className="mt-1.5 h-5 w-5 shrink-0 text-[#14A3A8]" strokeWidth={2} />
            <p>
              Soy <span className="font-semibold text-[#0B7A80]">Damaris Restrepo</span>, psicóloga
              clínica y magíster en Investigación Psicoanalítica. Acompaño a adolescentes,
              universitarios y adultos a comprender lo que están viviendo y a encontrar{" "}
              <span className="font-semibold text-[#0B7A80]">claridad y alivio</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78, ease: EASE }}
            className="mb-8 flex flex-wrap items-center gap-2.5"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A9E4E2]/70 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#0B4A50] backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-[#14A3A8]" />
              Consultorio en Medellín · {CONTACT.address}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A9E4E2]/70 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#0B4A50] backdrop-blur-sm">
              <Video className="h-3.5 w-3.5 text-[#14A3A8]" />
              Consulta en línea nacional e internacional
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.86, ease: EASE }}
            className="mb-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center"
          >
            <CTAButton href={buildWaUrl(WA.hero)} tone="teal" size="lg" icon={MessageCircle} className="w-full sm:w-auto">
              Agenda tu primera cita
            </CTAButton>
            <CTAButton href="#motivos" tone="ocean" variant="outline" size="lg" className="w-full sm:w-auto">
              ¿En qué puedo ayudarte?
            </CTAButton>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
            className="grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4"
          >
            {credentials.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                className="group flex flex-col"
              >
                <Icon
                  className="mb-3 h-7 w-7 text-[#14A3A8] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#0B7A80]"
                  strokeWidth={1.6}
                />
                <p className="text-[15px] font-bold text-[#0E2A2E]">{title}</p>
                <p className="mt-1 text-xs leading-snug text-slate-500 sm:text-[13px]">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Retrato */}
        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
          className="relative mx-auto w-full max-w-[440px] lg:col-span-5"
        >
          {/* Anillos giratorios */}
          <div aria-hidden className="animate-spin-slow absolute -inset-6 rounded-full border border-dashed border-[#14A3A8]/30" />
          <div aria-hidden className="animate-spin-slower absolute -inset-12 rounded-full border border-[#7BE0B4]/25" />
          <div aria-hidden className="animate-blob absolute -inset-2 bg-gradient-to-br from-[#7BE0B4]/50 via-[#14A3A8]/30 to-[#0B7A80]/40 blur-2xl" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border-[6px] border-white bg-[#E3F6F5] shadow-[0_40px_90px_-30px_rgba(11,74,80,0.55)]">
            <img
              src={retratoImg}
              alt="Damaris Restrepo, psicóloga clínica en Medellín"
              width={548}
              height={548}
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover object-[50%_30%]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B4A50]/40 to-transparent" />
          </div>

          {/* Insignias flotantes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
            className="animate-float-gentle glass-card-luxury absolute -left-4 top-[6%] flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#19B3B8] to-[#0B7A80] text-white">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0E2A2E]">Tesis laureada</p>
              <p className="text-[11px] text-slate-500">Cum laude · U. de Antioquia</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
            style={{ animationDelay: "1.5s" }}
            className="animate-float-gentle glass-card-luxury absolute -right-3 bottom-[14%] rounded-2xl px-4 py-3 sm:-right-8"
          >
            <div className="mb-1 flex gap-0.5 text-[#F2B84B]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden>
                  <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8z" />
                </svg>
              ))}
            </div>
            <p className="text-xs font-bold text-[#0E2A2E]">+30 opiniones de pacientes</p>
            <p className="text-[11px] text-slate-500">“Me sentí escuchada desde el primer momento”</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#sobre-mi"
        aria-label="Bajar a la siguiente sección"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#0B7A80]/70 lg:flex"
      >
        Descubre
        <span className="flex h-9 w-5 justify-center rounded-full border-2 border-[#14A3A8]/40 pt-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-[#14A3A8]"
          />
        </span>
      </motion.a>
    </section>
  );
}
