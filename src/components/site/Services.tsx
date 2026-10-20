import { motion } from "framer-motion";
import {
  Briefcase,
  CloudRain,
  HeartHandshake,
  Leaf,
  MessageCircle,
  Siren,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CTAButton, type CTATone } from "./CTAButton";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
  tone: CTATone;
  color: string;
  wa: string;
};

/** Motivos de consulta agrupados a partir de las áreas que atiende. */
const services: Service[] = [
  {
    icon: Wind,
    title: "Ansiedad y angustia",
    desc: "Cuando la mente no se detiene, el cuerpo se tensa y aparecen el miedo o los ataques de pánico.",
    bullets: ["Ansiedad generalizada", "Ataques de pánico", "Fobia social e insomnio"],
    tone: "teal",
    color: "#14A3A8",
    wa: WA.ansiedad,
  },
  {
    icon: CloudRain,
    title: "Tristeza y estado de ánimo",
    desc: "Desmotivación, irritabilidad o la sensación de haber perdido el rumbo.",
    bullets: ["Depresión y tristeza", "Déficit de motivación", "Insatisfacción personal"],
    tone: "ocean",
    color: "#2F7F95",
    wa: WA.tristeza,
  },
  {
    icon: Leaf,
    title: "Duelo y pérdidas",
    desc: "Un acompañamiento respetuoso para elaborar la ausencia, a tu ritmo.",
    bullets: ["Duelo por muerte", "Rupturas y divorcio", "Trauma y estrés postraumático"],
    tone: "rose",
    color: "#F28C8C",
    wa: WA.duelo,
  },
  {
    icon: Siren,
    title: "Crisis emocionales",
    desc: "Urgencias subjetivas en las que necesitas un espacio para recuperar el suelo.",
    bullets: ["Consulta en crisis", "Cambios tras una lesión o enfermedad", "Trastornos de adaptación"],
    tone: "sun",
    color: "#F29E6B",
    wa: WA.crisis,
  },
  {
    icon: HeartHandshake,
    title: "Vínculos y dependencia emocional",
    desc: "Relaciones que duelen, se repiten o te hacen perderte de ti.",
    bullets: ["Dependencia y codependencia", "Conflictos de pareja y celos", "Problemas de apego"],
    tone: "rose",
    color: "#D9606A",
    wa: WA.vinculos,
  },
  {
    icon: Briefcase,
    title: "Estrés laboral y burnout",
    desc: "Agotamiento, presión y acoso que afectan tu bienestar y tu desempeño.",
    bullets: ["Burnout laboral", "Estrés y acoso laboral", "Cambios profesionales"],
    tone: "sky",
    color: "#4FB3E8",
    wa: WA.burnout,
  },
  {
    icon: Sparkles,
    title: "Adolescentes y jóvenes",
    desc: "Un lugar donde poder hablar cuando expresarse cuesta, para ellos y sus familias.",
    bullets: ["Consulta juvenil e infantil", "Bullying y acoso escolar", "Timidez y conducta"],
    tone: "mint",
    color: "#4CC995",
    wa: WA.adolescentes,
  },
  {
    icon: MessageCircle,
    title: "Autoconocimiento",
    desc: "Comprender tu historia y tus repeticiones para decidir quién quieres llegar a ser.",
    bullets: ["Baja autoestima", "Confusión de roles", "Conflictos personales y familiares"],
    tone: "ocean",
    color: "#0B7A80",
    wa: WA.autoconocimiento,
  },
];

/** Tarjeta con halo que sigue al cursor (vía variables CSS, sin re-render). */
function ServiceCard({ s, index }: { s: Service; index: number }) {
  const Icon = s.icon;
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: EASE }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#A9E4E2]/50 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-35px_rgba(11,74,80,0.45)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), ${s.color}22, transparent 65%)`,
        }}
      />
      <div
        className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
        style={{ backgroundImage: `linear-gradient(135deg, ${s.color}, #0B4A50)` }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="relative font-serif-editorial text-xl font-bold text-[#0E2A2E]">{s.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
      <ul className="relative mt-5 flex-1 space-y-2">
        {s.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
            {b}
          </li>
        ))}
      </ul>
      <div className="relative mt-6">
        <CTAButton href={buildWaUrl(s.wa)} tone={s.tone} variant="soft" size="sm" block>
          Consultar por esto
        </CTAButton>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="motivos"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white to-[#F6FBFA] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute right-[-10%] top-0 h-[600px] w-[600px] rounded-full bg-[#E3F6F5] blur-[140px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Motivos de consulta"
          title="¿Qué te trae"
          accent="hasta aquí?"
          lead="Elige lo que más se parece a lo que estás viviendo. Te escribo de vuelta para contarte cómo podemos empezar."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
