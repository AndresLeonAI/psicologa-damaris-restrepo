import { motion } from "framer-motion";
import { CalendarCheck, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/site";
import { CTAButton } from "./CTAButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: CONTACT.phoneDisplay, href: buildWaUrl(WA.contacto) },
  { icon: Phone, label: "Teléfono", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneTel}` },
  { icon: MapPin, label: "Consultorio", value: `${CONTACT.address}, ${CONTACT.city}`, href: CONTACT.mapsUrl },
  { icon: Instagram, label: "Instagram", value: CONTACT.instagramHandle, href: CONTACT.instagram },
];

export function ConsultationCTA() {
  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden bg-[#F6FBFA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="bg-premium-teal premium-noise relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl sm:p-14"
        >
          <div className="aurora-blob pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-40" />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-6 select-none font-serif-editorial text-[22rem] leading-none text-white/[0.05]"
          >
            Ψ
          </span>

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D6F2F0]">
                <CalendarCheck className="h-3.5 w-3.5" /> Reserva una visita
              </span>
              <h2 className="mt-6 font-serif-editorial text-4xl font-bold leading-tight sm:text-5xl">
                Será un gusto <span className="font-normal italic text-[#8FE3D9]">acompañarte</span> en
                este camino.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#D6F2F0]/85">
                A veces, dar el primer paso es el inicio de un cambio muy importante. Escríbeme y
                encontramos juntos el mejor horario para ti.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href={buildWaUrl(WA.contacto)} tone="white" size="lg" icon={MessageCircle}>
                  Escribir por WhatsApp
                </CTAButton>
                <CTAButton
                  href={CONTACT.doctoralia}
                  tone="white"
                  variant="outline"
                  size="lg"
                  className="!border-white/40 !bg-white/10 !text-white backdrop-blur-sm"
                >
                  Agenda en Doctoralia
                </CTAButton>
              </div>

              <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {channels.map(({ icon: Icon, label, value, href }, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE }}
                  >
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.14]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[#8FE3D9] transition-transform group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9E4E2]">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-semibold text-white">{value}</span>
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="relative min-h-[360px] overflow-hidden rounded-[2rem] border-4 border-white/15 bg-[#E3F6F5]"
            >
              <iframe
                title="Ubicación del consultorio de Damaris Restrepo en Medellín"
                src={CONTACT.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
              />
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 px-5 py-4 text-[#0E2A2E] shadow-xl backdrop-blur transition-transform hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#14A3A8]" />
                  <span>
                    <span className="block text-sm font-bold">{CONTACT.address}</span>
                    <span className="block text-xs text-slate-500">{CONTACT.city}</span>
                  </span>
                </span>
                <span className="hidden text-xs font-bold text-[#0B7A80] sm:inline">Cómo llegar →</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
