import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

/**
 * Sistema único de llamados a la acción.
 *
 * Cada tono corresponde a un color de la paleta de marca y tiene un significado
 * fijo en todo el sitio, para que el color comunique y no solo decore:
 *
 *   teal  → agendar consulta y CTA principal
 *   ocean → trayectoria, formación y publicaciones
 *   rose  → vínculos, pareja, duelo y testimonios
 *   mint  → adolescentes, jóvenes y bienestar
 *   sky   → atención en línea
 *   sun   → crisis y prioridades
 *   white → CTA sobre las bandas turquesa oscuras
 *
 * Los rellenos sólidos usan un degradado del color de paleta a una versión más
 * profunda del mismo tono para subir el contraste del texto blanco. El menta
 * lleva texto oscuro, porque el blanco sobre verde claro es ilegible.
 */
export type CTATone = "teal" | "ocean" | "rose" | "sky" | "sun" | "mint" | "white";
export type CTAVariant = "solid" | "outline" | "soft";
export type CTASize = "sm" | "md" | "lg";

type ToneSpec = {
  /** Color de paleta: relleno, bordes y halo. */
  base: string;
  /** Extremo profundo del degradado del relleno sólido. */
  deep: string;
  /** Texto sobre el relleno sólido. */
  ink: string;
  /** Texto de las variantes claras (outline y soft). */
  onLight: string;
};

const TONES: Record<CTATone, ToneSpec> = {
  teal: { base: "#19B3B8", deep: "#0B7A80", ink: "#FFFFFF", onLight: "#0A6A70" },
  ocean: { base: "#2F7F95", deep: "#1D5C70", ink: "#FFFFFF", onLight: "#1D5C70" },
  rose: { base: "#F28C8C", deep: "#D9606A", ink: "#FFFFFF", onLight: "#B23A47" },
  sky: { base: "#4FB3E8", deep: "#2A88C2", ink: "#FFFFFF", onLight: "#1A6AA0" },
  sun: { base: "#F29E6B", deep: "#D8743F", ink: "#FFFFFF", onLight: "#A9501F" },
  mint: { base: "#7BE0B4", deep: "#4CC995", ink: "#0B3A2A", onLight: "#1F7A52" },
  white: { base: "#FFFFFF", deep: "#E3F6F5", ink: "#0B4A50", onLight: "#0B4A50" },
};

const SIZES: Record<CTASize, string> = {
  sm: "px-4 py-2.5 text-xs gap-2",
  md: "px-6 py-3.5 text-sm gap-2.5",
  lg: "px-7 py-4 text-base gap-2.5",
};

type CTAButtonProps = {
  /** Enlace externo o ancla dentro de la misma página. */
  href?: string;
  /** Ruta interna del sitio: navega sin recargar (tiene prioridad sobre `href`). */
  to?: LinkProps["to"];
  /** Ancla de destino cuando se navega a otra ruta, sin el `#`. */
  hash?: string;
  children: React.ReactNode;
  tone?: CTATone;
  variant?: CTAVariant;
  size?: CTASize;
  icon?: LucideIcon;
  /** Muestra la flecha que se desplaza al pasar el cursor. Activa por defecto. */
  arrow?: boolean;
  /** Ocupa todo el ancho disponible. */
  block?: boolean;
  /** Abre en pestaña nueva (WhatsApp y enlaces externos). */
  external?: boolean;
  className?: string;
};

export function CTAButton({
  href,
  to,
  hash,
  children,
  tone = "teal",
  variant = "solid",
  size = "md",
  icon: Icon,
  arrow = true,
  block = false,
  external = Boolean(href?.startsWith("http")),
  className = "",
}: CTAButtonProps) {
  const t = TONES[tone];

  const shared = `group inline-flex cursor-pointer items-center justify-center rounded-2xl font-semibold transition-all duration-300 ${
    SIZES[size]
  } ${block ? "w-full" : ""} ${className}`;

  const styles: React.CSSProperties =
    variant === "solid"
      ? {
          backgroundImage: `linear-gradient(135deg, ${t.base} 0%, ${t.deep} 100%)`,
          color: t.ink,
          boxShadow: `0 10px 30px -12px ${t.base}`,
        }
      : variant === "outline"
        ? {
            border: `1.5px solid ${t.base}`,
            color: t.onLight,
            backgroundColor: "rgba(255,255,255,0.7)",
          }
        : {
            border: `1px solid ${t.base}55`,
            color: t.onLight,
            backgroundColor: `${t.base}18`,
          };

  const hover =
    variant === "solid"
      ? "btn-shine hover:scale-[1.02] hover:brightness-[1.06]"
      : "hover:scale-[1.02] hover:brightness-[0.98]";

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span className="whitespace-nowrap">{children}</span>
      {arrow && (
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} hash={hash} style={styles} className={`${shared} ${hover}`}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      style={styles}
      className={`${shared} ${hover}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
