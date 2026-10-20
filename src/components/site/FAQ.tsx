import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, MessageCircle, Plus } from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CTAButton } from "./CTAButton";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Preguntas frecuentes. También alimentan el JSON-LD `FAQPage`. */
export const faqs = [
  {
    q: "¿Necesito tener claro mi problema para pedir una cita?",
    a: "No. No necesitas tener todo resuelto para empezar. Muchas personas llegan sin saber muy bien qué les pasa; justamente la consulta es el lugar para empezar a comprenderlo.",
  },
  {
    q: "¿Qué es el enfoque psicoanalítico y cómo se trabaja?",
    a: "Es una forma de psicoterapia centrada en la palabra y en la escucha de tu historia singular. A través de la conversación y de preguntas que ayudan a clarificar, se busca comprender el sentido de lo que te hace sufrir y de lo que se repite, para abrir nuevas posibilidades. Damaris también integra herramientas de psicología clínica y terapia breve según lo que cada proceso necesite.",
  },
  {
    q: "¿Cuánto cuesta una consulta?",
    a: "El valor de cada sesión es de $130.000 COP, tanto en consulta presencial en Medellín como en consulta en línea nacional o internacional.",
  },
  {
    q: "¿Dónde queda el consultorio?",
    a: "La consulta presencial es en la Cra. 65 #34-05, Medellín, Antioquia. También puedes atenderte en línea desde cualquier lugar.",
  },
  {
    q: "¿Atiendes a adolescentes y niños?",
    a: "Sí. Damaris trabaja con adolescentes, universitarios y adultos, y ofrece consulta juvenil y consulta psicológica infantil de primera vez. Las familias de varios pacientes adolescentes destacan sus avances en la expresión y en el bienestar.",
  },
  {
    q: "¿Cuánto dura un proceso terapéutico?",
    a: "Depende de cada persona y de lo que la trae a consulta. Cada proceso se adapta a tus necesidades; la frecuencia y el camino se acuerdan contigo desde las primeras sesiones.",
  },
  {
    q: "¿Cómo agendo mi cita?",
    a: "Puedes escribir directamente por WhatsApp al +57 313 793 9898 o reservar en su agenda de Doctoralia, eligiendo consulta presencial o en línea.",
  },
  {
    q: "¿Lo que hable en consulta es confidencial?",
    a: "Sí. La confidencialidad es la base del espacio terapéutico y está protegida por el secreto profesional que rige el ejercicio de la psicología en Colombia.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="preguntas" className="relative scroll-mt-24 overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Preguntas frecuentes"
              icon={HelpCircle}
              title="Lo que suelen"
              accent="preguntarme antes de empezar."
              lead="Si tu duda no está aquí, escríbeme y te respondo personalmente."
              className="!mb-8"
            />
            <CTAButton href={buildWaUrl(WA.faq)} tone="teal" icon={MessageCircle}>
              Tengo otra pregunta
            </CTAButton>
          </div>
        </div>

        <div className="space-y-3 lg:col-span-7">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-[#14A3A8]/50 bg-[#F6FBFA]" : "border-[#A9E4E2]/50 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[#0E2A2E]">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      isOpen ? "bg-[#14A3A8] text-white" : "bg-[#E3F6F5] text-[#0B7A80]"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
