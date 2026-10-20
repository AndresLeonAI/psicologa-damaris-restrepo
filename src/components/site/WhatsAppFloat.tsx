import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WA, buildWaUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Etiqueta permanente */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pointer-events-auto hidden items-center rounded-full border border-[#A9E4E2]/40 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur sm:flex"
      >
        <span className="whitespace-nowrap text-xs font-semibold text-slate-800">
          ¿Dudas antes de agendar?{" "}
          <span className="font-bold text-[#0B7A80]">Escríbeme por WhatsApp</span>
        </span>
      </motion.div>

      <motion.a
        href={buildWaUrl(WA.float)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp a Damaris Restrepo"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.08 }}
        className="pointer-events-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-[#A9E4E2]/50 bg-gradient-to-tr from-[#0B7A80] to-[#14A3A8] text-white shadow-xl shadow-[#14A3A8]/30 transition-transform hover:from-[#0B7A80] hover:to-[#118E93]"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </div>
  );
}
