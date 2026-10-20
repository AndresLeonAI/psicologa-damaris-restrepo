import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "./Logo";
import { WA, buildWaUrl } from "@/lib/whatsapp";

/**
 * Secciones de la página principal. La navegación se mantiene deliberadamente
 * corta: cada enlace extra compite con el CTA de conversión.
 */
const sections = [
  { hash: "#sobre-mi", label: "Sobre mí" },
  { hash: "#trayectoria", label: "Trayectoria" },
  { hash: "#motivos", label: "Motivos" },
  { hash: "#opiniones", label: "Opiniones" },
  { hash: "#tarifas", label: "Tarifas" },
  { hash: "#contacto", label: "Contacto" },
];

type NavProps = {
  /**
   * `home` activa el scroll-spy sobre las secciones de la portada.
   * `inner` enlaza de vuelta a la portada desde una ruta interna.
   */
  variant?: "home" | "inner";
};

export function Nav({ variant = "home" }: NavProps) {
  const isHome = variant === "home";
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // La barra se retira al bajar y reaparece al subir. Se prefiere este patrón
  // sobre "visible solo al inicio" para que el CTA de agendar siga a un gesto
  // de distancia en cualquier punto de una página larga.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      // Umbral de 6 px: por debajo de eso es temblor del trackpad, no intención.
      if (y < 120) {
        setHidden(false);
      } else if (y - lastY > 6) {
        setHidden(true);
      } else if (lastY - y > 6) {
        setHidden(false);
      }
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: resalta el enlace de la sección visible (solo en la portada).
  useEffect(() => {
    if (!isHome) return;

    const observed = sections
      .map((s) => document.querySelector<HTMLElement>(s.hash))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!observed.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveTab(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    observed.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const desktopClass = (active: boolean) =>
    `relative cursor-pointer py-2 text-sm font-medium transition-all duration-300 ${
      active ? "font-semibold text-[#0B7A80]" : "text-slate-600 hover:text-[#14A3A8]"
    }`;

  const mobileClass = (active: boolean) =>
    `cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
      active ? "bg-[#E3F6F5] font-bold text-[#0B7A80]" : "text-slate-700 hover:bg-slate-50"
    }`;

  const activeIndicator = (
    <motion.div
      layoutId="activeNavIndicator"
      className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#14A3A8]"
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  );

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        // Con el menú móvil abierto la barra nunca se esconde: el botón de
        // cerrar vive dentro de ella.
        animate={{ y: hidden && !isOpen ? -140 : 0, opacity: 1 }}
        transition={{
          y: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        }}
        className={`fixed left-1/2 z-50 h-16 -translate-x-1/2 rounded-full border backdrop-blur-xl transition-all duration-500 sm:h-20 ${
          scrolled
            ? "top-3 w-[calc(100%-1.5rem)] max-w-7xl border-[#A9E4E2]/40 bg-white/90 shadow-[0_12px_40px_rgba(20,163,168,0.09)] sm:top-5"
            : "top-4 w-[calc(100%-2rem)] max-w-7xl border-[#A9E4E2]/25 bg-white/80 shadow-[0_8px_30px_rgba(20,163,168,0.05)] sm:top-6"
        }`}
      >
        <div className="mx-auto flex h-full w-full items-center justify-between px-5 sm:px-8 lg:px-10">
          {isHome ? (
            <a href="#inicio" className="group flex cursor-pointer items-center py-1">
              <Logo />
            </a>
          ) : (
            <Link to="/" className="group flex cursor-pointer items-center py-1">
              <Logo />
            </Link>
          )}

          {/* Enlaces centrales */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
            {sections.map((l) => {
              const isActive = isHome && activeTab === l.hash;
              return isHome ? (
                <a
                  key={l.hash}
                  href={l.hash}
                  onClick={() => setActiveTab(l.hash)}
                  className={desktopClass(isActive)}
                >
                  {l.label}
                  {isActive && activeIndicator}
                </a>
              ) : (
                <Link
                  key={l.hash}
                  to="/"
                  hash={l.hash.slice(1)}
                  className={desktopClass(false)}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href={buildWaUrl(WA.nav)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundImage: "linear-gradient(135deg, #19B3B8 0%, #0B7A80 100%)",
                boxShadow: "0 10px 26px -12px #19B3B8",
              }}
              className="btn-shine hidden cursor-pointer items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-[1.06] sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Agenda tu cita</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-[#A9E4E2]/50 bg-[#E3F6F5]/60 text-[#0B7A80] transition-colors hover:bg-[#E3F6F5] lg:hidden"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className={`fixed left-4 right-4 z-40 flex flex-col gap-5 rounded-3xl border border-[#A9E4E2]/50 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl lg:hidden ${
              scrolled ? "top-20" : "top-24"
            }`}
          >
            <nav className="flex flex-col gap-2">
              {sections.map((l, index) => {
                const shared = {
                  initial: { opacity: 0, x: -10 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: index * 0.04, duration: 0.3 },
                };
                return isHome ? (
                  <motion.a
                    key={l.hash}
                    href={l.hash}
                    onClick={() => {
                      setActiveTab(l.hash);
                      setIsOpen(false);
                    }}
                    {...shared}
                    className={mobileClass(activeTab === l.hash)}
                  >
                    {l.label}
                  </motion.a>
                ) : (
                  <motion.div key={l.hash} {...shared}>
                    <Link
                      to="/"
                      hash={l.hash.slice(1)}
                      onClick={() => setIsOpen(false)}
                      className={`block ${mobileClass(false)}`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.a
              href={buildWaUrl(WA.nav)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (sections.length + 1) * 0.04, duration: 0.3 }}
              style={{
                backgroundImage: "linear-gradient(135deg, #19B3B8 0%, #0B7A80 100%)",
                boxShadow: "0 10px 26px -12px #19B3B8",
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Agenda tu cita</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
