import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/site";
import { Logo } from "./Logo";

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#motivos", label: "Motivos de consulta" },
  { href: "#modalidades", label: "Modalidades" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#tarifas", label: "Tarifas" },
  { href: "#preguntas", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#061B1D] pt-20 pb-10 text-[#D6F2F0]/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#inicio" className="group inline-flex">
              <Logo theme="light" />
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed">
              Psicóloga clínica y magíster en Investigación Psicoanalítica. Acompañamiento cercano,
              humano y respetuoso con tu singularidad, en Medellín y en línea.
            </p>
            <p className="mt-4 text-xs text-[#A9E4E2]/70">Colegiada N.º {CONTACT.colegiado}</p>
          </div>

          <nav aria-label="Secciones" className="md:col-span-3">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white">Navegación</p>
            <ul className="grid grid-cols-2 gap-3 text-sm md:grid-cols-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white">Contacto</p>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                  <MapPin className="h-4 w-4 shrink-0 text-[#14A3A8]" />
                  {CONTACT.address}, {CONTACT.postalCode} {CONTACT.city}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneTel}`} className="flex gap-3 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-[#14A3A8]" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={buildWaUrl(WA.contacto)} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#14A3A8]" />
                  Escribir por WhatsApp
                </a>
              </li>
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                  <Instagram className="h-4 w-4 shrink-0 text-[#14A3A8]" />
                  {CONTACT.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-[#A9E4E2]/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Damaris Restrepo · Psicóloga clínica · Medellín, Colombia</p>
          <p>Si estás en riesgo inminente, comunícate con la Línea 123 o acude a urgencias.</p>
        </div>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-20 right-0 select-none font-serif-editorial text-[18rem] leading-none text-white/[0.03]"
      >
        Ψ
      </span>
    </footer>
  );
}
