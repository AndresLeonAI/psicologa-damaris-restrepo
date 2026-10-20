import { createFileRoute } from "@tanstack/react-router";

import { SmoothScrollProvider } from "@/components/site/SmoothScrollProvider";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { About } from "@/components/site/About";
import { Stats } from "@/components/site/Stats";
import { Manifesto } from "@/components/site/Manifesto";
import { Trajectory } from "@/components/site/Trajectory";
import { Credentials } from "@/components/site/Credentials";
import { WhenToStart } from "@/components/site/WhenToStart";
import { Services } from "@/components/site/Services";
import { Conditions, conditions } from "@/components/site/Conditions";
import { Process } from "@/components/site/Process";
import { Modalities } from "@/components/site/Modalities";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";
import { Pricing } from "@/components/site/Pricing";
import { FAQ, faqs } from "@/components/site/FAQ";
import { ConsultationCTA } from "@/components/site/ConsultationCTA";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Psychologist", "MedicalBusiness"],
      "@id": `${SITE_URL}/#consulta`,
      name: SITE_NAME,
      description:
        "Consulta de psicología clínica con enfoque psicoanalítico en Medellín y en línea. Psicoterapia para adolescentes, universitarios y adultos: ansiedad, tristeza, duelo, crisis, dependencia emocional, estrés laboral y burnout.",
      url: SITE_URL,
      telephone: CONTACT.phoneTel,
      priceRange: "$130.000 COP",
      currenciesAccepted: "COP",
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address,
        postalCode: CONTACT.postalCode,
        addressLocality: "Medellín",
        addressRegion: "Antioquia",
        addressCountry: "CO",
      },
      geo: { "@type": "GeoCoordinates", latitude: 6.2401772, longitude: -75.5832748 },
      areaServed: [
        { "@type": "City", name: "Medellín" },
        { "@type": "Country", name: "Colombia" },
      ],
      availableService: [
        { "@type": "MedicalTherapy", name: "Psicoterapia individual" },
        { "@type": "MedicalTherapy", name: "Psicoterapia de duelo" },
        { "@type": "MedicalTherapy", name: "Consulta en crisis" },
        { "@type": "MedicalTherapy", name: "Consulta juvenil" },
        { "@type": "MedicalTherapy", name: "Consulta psicológica en línea" },
        { "@type": "Service", name: "Asesoría psicológica y psicoeducación" },
      ],
      sameAs: [CONTACT.instagram, CONTACT.doctoralia],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#profesional`,
      name: "Leydi Damaris Restrepo Giraldo",
      alternateName: "Damaris Restrepo",
      jobTitle: "Psicóloga clínica",
      description:
        "Psicóloga de la Corporación Universitaria Minuto de Dios (2014) y magíster en Investigación Psicoanalítica de la Universidad de Antioquia (2021), con tesis laureada Cum laude.",
      url: SITE_URL,
      image: `${SITE_URL}/damaris-restrepo.jpg`,
      telephone: CONTACT.phoneTel,
      worksFor: { "@id": `${SITE_URL}/#consulta` },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Corporación Universitaria Minuto de Dios" },
        { "@type": "CollegeOrUniversity", name: "Universidad de Antioquia" },
      ],
      award: "Tesis de maestría laureada Cum laude",
      knowsAbout: ["Psicoanálisis", "Psicología clínica", "Terapia breve", "Psicoterapia", ...conditions.slice(0, 12)],
      sameAs: [CONTACT.instagram, CONTACT.doctoralia],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const TITLE = "Psicóloga en Medellín | Damaris Restrepo — Psicoterapia y psicoanálisis presencial y en línea";
const DESCRIPTION =
  "Damaris Restrepo, psicóloga clínica y magíster en Investigación Psicoanalítica (U. de Antioquia). Psicoterapia para adolescentes y adultos: ansiedad, tristeza, duelo, crisis, dependencia emocional y burnout. Consulta en Medellín y en línea.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "psicóloga en Medellín, psicólogo Medellín, psicoanálisis Medellín, psicoterapia Medellín, psicóloga ansiedad Medellín, psicóloga duelo, terapia dependencia emocional, burnout, psicóloga adolescentes Medellín, psicóloga en línea Colombia, Damaris Restrepo",
      },
      { name: "geo.region", content: "CO-ANT" },
      { name: "geo.placename", content: "Medellín" },
      { name: "geo.position", content: "6.2401772;-75.5832748" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CO" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: `${SITE_URL}/damaris-restrepo.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen overflow-x-hidden bg-[#F6FBFA] text-slate-900 antialiased">
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <TrustStrip />
          <About />
          <Stats />
          <Manifesto />
          <Trajectory />
          <Credentials />
          <WhenToStart />
          <Services />
          <Conditions />
          <Process />
          <Modalities />
          <Testimonials />
          <Gallery />
          <Pricing />
          <FAQ />
          <ConsultationCTA />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </SmoothScrollProvider>
  );
}
