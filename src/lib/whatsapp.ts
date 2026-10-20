/**
 * Canal principal de conversión del sitio: WhatsApp directo.
 * Cada CTA envía un mensaje pre-redactado distinto para que Damaris
 * identifique de inmediato el motivo real de quien escribe.
 */
export const WHATSAPP_NUMBER = "573137939898";
export const WHATSAPP_DISPLAY = "+57 313 793 9898";

export function buildWaUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  // Navegación y CTAs generales
  nav: "Hola Damaris, quiero agendar una cita. ¿Me confirmas tu disponibilidad?",
  hero: "Hola Damaris, vengo de tu página web y quiero agendar mi primera consulta.",
  float: "Hola Damaris, tengo una duda antes de agendar mi consulta.",
  contacto: "Hola Damaris, quiero reservar una cita. ¿Qué horarios tienes disponibles?",
  primerPaso:
    "Hola Damaris, no tengo todo claro todavía, pero quiero dar el primer paso. ¿Podemos hablar?",

  // Motivos de consulta
  ansiedad: "Hola Damaris, estoy pasando por ansiedad o angustia y quiero iniciar un proceso.",
  tristeza: "Hola Damaris, me he sentido triste y desmotivado(a). Quiero agendar una consulta.",
  duelo: "Hola Damaris, estoy atravesando un duelo o una pérdida y necesito acompañamiento.",
  crisis: "Hola Damaris, estoy en un momento de crisis y quisiera una consulta lo antes posible.",
  vinculos:
    "Hola Damaris, quiero trabajar temas de pareja, dependencia emocional o vínculos. ¿Cómo empiezo?",
  burnout: "Hola Damaris, siento estrés laboral o burnout y quiero agendar una consulta.",
  adolescentes:
    "Hola Damaris, quiero información sobre consulta psicológica para mi hijo(a) adolescente.",
  autoconocimiento:
    "Hola Damaris, quiero iniciar un proceso de autoconocimiento. ¿Cómo es la primera sesión?",

  // Modalidades
  presencial: "Hola Damaris, quiero agendar una consulta presencial en tu consultorio de Medellín.",
  online: "Hola Damaris, quiero agendar una consulta en línea. ¿Qué horarios tienes disponibles?",
  internacional:
    "Hola Damaris, vivo fuera de Colombia y quiero agendar una consulta en línea internacional.",

  // Tarifas y dudas
  tarifas: "Hola Damaris, quiero confirmar la tarifa y las formas de pago para iniciar mi proceso.",
  faq: "Hola Damaris, tengo una pregunta que no resolví en tu página web.",
};
