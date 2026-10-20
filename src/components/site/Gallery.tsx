import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import postAyuda from "@/assets/images/post-pedir-ayuda.webp";
import postComenzar from "@/assets/images/post-cuando-comenzar.webp";
import postErrores from "@/assets/images/post-errores-repeticiones.webp";
import tarjeta from "@/assets/images/tarjeta-damaris.webp";
import { CONTACT } from "@/lib/site";
import { CTAButton } from "./CTAButton";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const posts: { src: string; w: number; h: number; alt: string; contain?: boolean }[] = [
  { src: postAyuda, w: 530, h: 530, alt: "Hay sufrimientos que pesan demasiado para vivirlos solo. A veces es necesario pedir ayuda." },
  { src: postErrores, w: 530, h: 530, alt: "Los errores y las repeticiones pueden convertirse en aprendizajes de vida." },
  { src: postComenzar, w: 530, h: 530, alt: "¿Cuándo comenzar un proceso terapéutico?" },
  { src: tarjeta, w: 530, h: 324, alt: "Tarjeta profesional de Damaris Restrepo, psicóloga clínica.", contain: true },
];

export function Gallery() {
  return (
    <section id="multimedia" className="relative scroll-mt-24 overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Multimedia"
          icon={Instagram}
          title="Psicología para"
          accent="pensar en voz alta."
          lead="Reflexiones que Damaris comparte en sus redes para acompañarte también fuera de la consulta."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {posts.map((p, i) => (
            <motion.a
              key={p.alt}
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className={`group relative overflow-hidden rounded-3xl border border-[#A9E4E2]/50 bg-[#E3F6F5] ${
                i % 2 === 1 ? "lg:translate-y-10" : ""
              }`}
            >
              <img
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                className={`aspect-square h-full w-full transition-transform duration-[1.2s] group-hover:scale-110 ${
                  p.contain ? "bg-[#2FE39A] object-contain" : "object-cover"
                }`}
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0E2A2E]/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Instagram className="h-4 w-4" /> Ver en Instagram
                </span>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-20 flex justify-center">
          <CTAButton href={CONTACT.instagram} tone="ocean" variant="outline" icon={Instagram}>
            Seguir a {CONTACT.instagramHandle}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
