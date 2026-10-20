import { motion } from "framer-motion";
import { Compass, HeartCrack, CloudRain, Repeat, Siren, Sprout, Waypoints } from "lucide-react";
import postImg from "@/assets/images/post-cuando-comenzar.webp";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ¿Cuándo comenzar un proceso terapéutico? Las razones son las que la propia
 * Damaris enumera en sus publicaciones.
 */
const reasons = [
  { icon: HeartCrack, text: "La pérdida o separación de un ser querido" },
  { icon: CloudRain, text: "Episodios de tristeza y angustia" },
  { icon: Waypoints, text: "Dependencia emocional" },
  { icon: Siren, text: "Urgencias subjetivas y momentos de crisis" },
  { icon: Repeat, text: "Experiencias del pasado que no han podido superarse" },
  { icon: Compass, text: "La necesidad de hacer un cambio en la vida" },
];

export function WhenToStart() {
  return (
    <section className="relative overflow-hidden bg-[#F6FBFA] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <SectionHeading
            align="left"
            eyebrow="¿Cuándo comenzar?"
            title="Hay sufrimientos que pesan demasiado"
            accent="para vivirlos solo."
            lead="Es común encontrar como motivo de consulta situaciones como estas. Pero también es posible comenzar si simplemente quieres vivir una experiencia de autoconocimiento."
            className="!mb-10"
          />
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {reasons.map(({ icon: Icon, text }) => (
              <motion.li
                key={text}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
                }}
                className="group flex items-center gap-4 rounded-2xl border border-[#A9E4E2]/50 bg-white p-4 transition-all duration-300 hover:border-[#14A3A8]/60 hover:shadow-[0_16px_40px_-24px_rgba(11,74,80,0.4)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E3F6F5] text-[#0B7A80] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#14A3A8] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-[#0E2A2E]">{text}</span>
              </motion.li>
            ))}
            <motion.li
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#14A3A8] to-[#0B7A80] p-4 text-white sm:col-span-2"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Sprout className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">
                O, sencillamente, el deseo de conocerte mejor.
              </span>
            </motion.li>
          </motion.ul>
        </div>

        <motion.figure
          initial={{ opacity: 0, rotate: 4, y: 40 }}
          whileInView={{ opacity: 1, rotate: -2, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="relative mx-auto w-full max-w-md lg:col-span-5"
        >
          <div aria-hidden className="animate-blob absolute -inset-6 bg-gradient-to-br from-[#7BE0B4]/40 to-[#14A3A8]/30 blur-2xl" />
          <img
            src={postImg}
            alt="Publicación de Damaris Restrepo: ¿Cuándo comenzar un proceso terapéutico?"
            width={530}
            height={530}
            loading="lazy"
            decoding="async"
            className="relative w-full rounded-[2rem] border-[6px] border-white shadow-2xl"
          />
        </motion.figure>
      </div>
    </section>
  );
}
