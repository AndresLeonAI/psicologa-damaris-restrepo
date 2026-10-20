import { motion } from "framer-motion";

/** Listado completo de motivos atendidos, tal como aparece en su perfil. */
export const conditions = [
  "Estrés", "Duelo", "Ansiedad", "Depresión", "Ruptura amorosa", "Trastorno de estrés postraumático",
  "Baja autoestima", "Problemas de apego", "Conflictos familiares", "Conflictos personales",
  "Trastorno de adaptación", "Fobia social", "Trastorno de conducta", "Ansiedad y depresión mixtas",
  "Ansiedad generalizada", "Insomnio", "Timidez", "Irritabilidad", "Codependencia emocional",
  "Conflictos de pareja", "Divorcio", "Separación de la pareja", "Insatisfacción personal",
  "Estrés laboral", "Trastorno de ansiedad", "Bullying", "Inestabilidad sexual o de pareja",
  "Trastornos por estrés", "Burnout", "Déficit de motivación",
  "Cambios emocionales tras una lesión o enfermedad", "Acoso escolar", "Acoso laboral", "Celopatía",
  "Dependencia emocional", "Tristeza", "Alteraciones del estado de ánimo", "Angustia",
  "Ataques de pánico", "Confusión de roles", "Burnout laboral", "Trastorno de personalidad",
] as const;

function Row({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="mask-fade-x overflow-hidden">
      <div className={`${reverse ? "animate-marquee-reverse" : "animate-marquee"} flex w-max gap-3 py-1.5`}>
        {loop.map((c, i) => (
          <span
            key={`${c}-${i}`}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 text-sm font-medium text-[#D6F2F0] backdrop-blur-sm transition-colors hover:border-[#7BE0B4]/60 hover:bg-[#7BE0B4]/15 hover:text-white"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Conditions() {
  const third = Math.ceil(conditions.length / 3);
  return (
    <section
      aria-label="Motivos de consulta atendidos"
      className="bg-premium-teal premium-noise marquee-pause relative overflow-hidden py-20"
    >
      <div className="aurora-blob pointer-events-none absolute left-1/3 top-0 h-[420px] w-[420px] rounded-full opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto mb-10 max-w-3xl px-6 text-center"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A9E4E2]">
          {conditions.length} motivos de consulta acompañados
        </p>
        <h2 className="mt-3 font-serif-editorial text-3xl font-bold text-white sm:text-4xl">
          Lo que vives tiene nombre,{" "}
          <span className="font-normal italic text-[#8FE3D9]">y también tiene salida.</span>
        </h2>
      </motion.div>
      <div className="relative space-y-3">
        <Row items={conditions.slice(0, third)} />
        <Row items={conditions.slice(third, third * 2)} reverse />
        <Row items={conditions.slice(third * 2)} />
      </div>
    </section>
  );
}
