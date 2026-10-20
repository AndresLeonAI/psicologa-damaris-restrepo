import { motion, useScroll, useSpring } from "framer-motion";

/** Barra fina de progreso de lectura fijada en el borde superior. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#7BE0B4] via-[#14A3A8] to-[#0B7A80]"
    />
  );
}
