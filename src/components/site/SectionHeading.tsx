import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Encabezado de sección compartido: etiqueta superior, título editorial con
 * la segunda mitad en cursiva turquesa, y bajada opcional. Mantiene el mismo
 * ritmo tipográfico en toda la página.
 */
type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  lead?: ReactNode;
  icon?: LucideIcon;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  icon: Icon,
  align = "center",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = theme === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`${centered ? "mx-auto text-center" : ""} mb-14 max-w-3xl ${className}`}
    >
      <span
        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] ${
          dark
            ? "border-white/20 bg-white/10 text-[#D6F2F0] backdrop-blur-sm"
            : "border-[#A9E4E2]/60 bg-[#E3F6F5] text-[#0B7A80]"
        }`}
      >
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {eyebrow}
      </span>
      <h2
        className={`font-serif-editorial text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl ${
          dark ? "text-white" : "text-[#0E2A2E]"
        }`}
      >
        {title}{" "}
        {accent && (
          <span className={`font-normal italic ${dark ? "text-[#8FE3D9]" : "text-[#14A3A8]"}`}>
            {accent}
          </span>
        )}
      </h2>
      {lead && (
        <p
          className={`${centered ? "mx-auto" : ""} mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            dark ? "text-[#D6F2F0]/80" : "text-slate-600"
          }`}
        >
          {lead}
        </p>
      )}
    </motion.div>
  );
}
