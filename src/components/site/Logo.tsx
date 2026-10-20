/**
 * Marca de Damaris Restrepo: el símbolo Ψ de su identidad profesional dentro
 * de un sello turquesa, acompañado del nombre en la tipografía editorial.
 * Es SVG en línea para que se vea nítido a cualquier densidad de pantalla.
 */
type LogoProps = {
  /** `dark` para fondos claros, `light` para las bandas turquesa oscuras. */
  theme?: "dark" | "light";
  className?: string;
};

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dr-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#19B3B8" />
          <stop offset="1" stopColor="#0B4A50" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#dr-mark)" />
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="30"
        fill="#FFFFFF"
      >
        Ψ
      </text>
    </svg>
  );
}

export function Logo({ theme = "dark", className = "" }: LogoProps) {
  const name = theme === "dark" ? "text-[#0E2A2E]" : "text-white";
  const role = theme === "dark" ? "text-[#0B7A80]" : "text-[#A9E4E2]";
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:rotate-[8deg] sm:h-11 sm:w-11" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif-editorial text-lg font-bold tracking-tight sm:text-xl ${name}`}>
          Damaris Restrepo
        </span>
        <span className={`mt-1 text-[10px] font-bold uppercase tracking-[0.22em] ${role}`}>
          Psicóloga clínica
        </span>
      </span>
    </span>
  );
}
