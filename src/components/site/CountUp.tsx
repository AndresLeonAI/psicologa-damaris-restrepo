import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Cifra que cuenta desde cero cuando entra en pantalla. Con movimiento
 * reducido muestra el valor final directamente.
 */
export function CountUp({
  to,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
