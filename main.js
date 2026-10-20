// Movimiento del sitio con GSAP + ScrollTrigger: titulares palabra por palabra,
// parallax por capas con scrub, revelados escalonados, cinta que acelera con la
// velocidad del scroll y botones magnéticos. Todo con transform y opacidad.
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const video = document.querySelector(".hero-video");
  const nav = document.querySelector("[data-nav]");
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Navegación: se oculta al bajar y reaparece al subir.
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    nav?.classList.toggle("is-scrolled", y > 20);
    if (y > 160 && y - lastY > 6) nav?.classList.add("is-hidden");
    else if (lastY - y > 6 || y < 160) nav?.classList.remove("is-hidden");
    lastY = y;
  }, { passive: true });

  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  window.__motionReady = true;

  // Sin GSAP o con movimiento reducido: todo visible y estático.
  if (reduce || !gsap || !ST) {
    root.classList.remove("motion");
    if (reduce && video) { video.removeAttribute("autoplay"); video.pause(); }
    return;
  }
  gsap.registerPlugin(ST);
  const mobile = window.matchMedia("(max-width: 720px)").matches;
  const k = mobile ? 0.6 : 1;

  // Divide un elemento en palabras conservando etiquetas en línea (<em>, <i>).
  const split = (el) => {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(" "); return; }
            const w = document.createElement("span");
            w.className = "w";
            const wi = document.createElement("span");
            wi.className = "wi";
            wi.textContent = part;
            w.append(wi);
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    return el.querySelectorAll(".wi");
  };

  // ---------- HERO ----------
  const h1 = document.querySelector(".hero h1");
  const heroWords = split(h1);
  gsap.set(h1, { autoAlpha: 1 });
  const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
  intro
    .from(".hero-video", { scale: 1.18, duration: 2.4, ease: "power3.out" }, 0)
    .from(".nav", { autoAlpha: 0, duration: 1, clearProps: "opacity,visibility" }, 0.2)
    .fromTo(".hero .eyebrow", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.3)
    .from(heroWords, { yPercent: 110, rotate: 4, duration: 1.3, stagger: 0.07 }, 0.4)
    .fromTo(".hero .lead", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.9)
    .fromTo(".hero .cta-row", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 1.05)
    .from(".hero-drop", { autoAlpha: 0, y: -60, duration: 1.6 }, 0.8)
    .from(".hero-psi", { autoAlpha: 0, scale: 0.6, duration: 2 }, 0.6)
    .from(".scroll-cue", { autoAlpha: 0, duration: 1 }, 1.4);

  // Parallax del hero en tres profundidades.
  const heroST = { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 };
  gsap.to(".hero-media", { yPercent: 18 * k, scale: 1.08, ease: "none", scrollTrigger: heroST });
  gsap.to(".hero-psi", { yPercent: -60 * k, rotate: -12, ease: "none", scrollTrigger: heroST });
  gsap.to(".hero-drop", { yPercent: -140 * k, rotate: 20, ease: "none", scrollTrigger: heroST });
  gsap.to(".hero-copy", { yPercent: -22 * k, autoAlpha: 0.15, ease: "none", scrollTrigger: heroST });

  // ---------- REVELADOS GENERALES ----------
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.fromTo(el, { autoAlpha: 0, y: 50 }, {
      autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // Títulos de sección palabra por palabra.
  gsap.utils.toArray("main h2").forEach((h) => {
    if (h.closest(".hero")) return;
    const words = split(h);
    gsap.from(words, {
      yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.05,
      scrollTrigger: { trigger: h, start: "top 88%", once: true },
    });
  });

  // ---------- SOBRE MÍ ----------
  gsap.fromTo(".portrait img",
    { clipPath: "inset(100% 0% 0% 0% round 220px 220px 28px 28px)", scale: 1.25 },
    { clipPath: "inset(0% 0% 0% 0% round 220px 220px 28px 28px)", scale: 1, duration: 1.6, ease: "expo.inOut",
      scrollTrigger: { trigger: ".portrait", start: "top 80%", once: true } });
  gsap.to(".portrait", { yPercent: -10 * k, ease: "none",
    scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: 0.8 } });
  gsap.from(".creds li", {
    autoAlpha: 0, x: -40, duration: 0.9, ease: "expo.out", stagger: 0.1,
    scrollTrigger: { trigger: ".creds", start: "top 85%", once: true },
  });

  // ---------- CITA: palabras que se iluminan con el scroll ----------
  const quote = document.querySelector(".quote-band [data-split]");
  const qWords = split(quote);
  gsap.set(quote, { autoAlpha: 1 });
  gsap.fromTo(qWords, { opacity: 0.14 }, {
    opacity: 1, ease: "none", stagger: 0.06,
    scrollTrigger: { trigger: ".quote-band", start: "top 70%", end: "bottom 60%", scrub: 0.5 },
  });
  gsap.fromTo(".ink-layer", { yPercent: -12, rotate: -4, scale: 1.1 }, {
    yPercent: 12, rotate: 4, scale: 1, ease: "none",
    scrollTrigger: { trigger: ".quote-band", start: "top bottom", end: "bottom top", scrub: 1 },
  });

  // ---------- ACOMPAÑAMIENTO ----------
  gsap.from(".svc-list li", {
    autoAlpha: 0, y: 40, duration: 0.9, ease: "expo.out", stagger: { each: 0.07, grid: "auto" },
    scrollTrigger: { trigger: ".svc-list", start: "top 85%", once: true },
  });
  gsap.from(".modes > div", {
    autoAlpha: 0, y: 60, rotate: (i) => (i - 1) * 3, duration: 1.1, ease: "expo.out", stagger: 0.12,
    scrollTrigger: { trigger: ".modes", start: "top 88%", once: true },
  });

  // ---------- CINTA: avanza sola y acelera con la velocidad del scroll ----------
  gsap.utils.toArray("[data-ticker]").forEach((row) => {
    row.innerHTML += row.innerHTML; // duplica para el bucle
    const dir = Number(row.dataset.ticker);
    const tween = gsap.fromTo(row, { xPercent: dir > 0 ? 0 : -50 }, {
      xPercent: dir > 0 ? -50 : 0, duration: 38, ease: "none", repeat: -1,
    });
    ST.create({
      trigger: ".ticker", start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 6);
        gsap.to(tween, { timeScale: boost, duration: 0.2, overwrite: true });
        gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
      },
    });
  });
  gsap.fromTo(".ticker-row", { skewX: 0 }, {
    skewX: -6, ease: "none",
    scrollTrigger: { trigger: ".ticker", start: "top bottom", end: "bottom top", scrub: true },
  });

  // ---------- OPINIONES ----------
  gsap.from(".review", {
    autoAlpha: 0, y: 90, rotate: (i) => (i - 1) * 4, duration: 1.2, ease: "expo.out", stagger: 0.14,
    scrollTrigger: { trigger: ".review-grid", start: "top 85%", once: true },
  });
  gsap.utils.toArray(".review").forEach((card, i) => {
    gsap.to(card, { yPercent: (i - 1) * -8 * k, ease: "none",
      scrollTrigger: { trigger: ".reviews", start: "top bottom", end: "bottom top", scrub: 0.8 } });
  });

  // ---------- VISITA: tarjetas y ruta del mapa que se dibuja ----------
  gsap.from(".visit-card", {
    autoAlpha: 0, scale: 0.94, y: 60, duration: 1.2, ease: "expo.out", stagger: 0.15,
    scrollTrigger: { trigger: ".visit-grid", start: "top 85%", once: true },
  });
  document.querySelectorAll(".map-art path").forEach((path, i) => {
    const len = path.getTotalLength();
    gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, {
      strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", delay: 0.3 + i * 0.15,
      scrollTrigger: { trigger: ".map-card", start: "top 85%", once: true },
    });
  });
  gsap.from(".map-art .pin", {
    scale: 0, transformOrigin: "50% 50%", duration: 0.8, ease: "back.out(3)", delay: 1.6,
    scrollTrigger: { trigger: ".map-card", start: "top 85%", once: true },
  });

  // ---------- PIE: nombre gigante que entra en sentidos opuestos ----------
  gsap.fromTo(".foot-big span", { xPercent: -30 }, { xPercent: 0, ease: "none",
    scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 0.8 } });
  gsap.fromTo(".foot-big em", { xPercent: 30 }, { xPercent: 0, ease: "none",
    scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 0.8 } });

  // ---------- BOTONES MAGNÉTICOS (solo con puntero fino) ----------
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-magnetic], .nav .btn, .wa-float").forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3);
        yTo((e.clientY - r.top - r.height / 2) * 0.4);
      });
      btn.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  }

  // Pausa el video fuera de pantalla para ahorrar batería.
  if (video) {
    ST.create({
      trigger: ".hero", start: "top bottom", end: "bottom top",
      onToggle: (self) => (self.isActive ? video.play().catch(() => {}) : video.pause()),
    });
  }

  window.addEventListener("load", () => ST.refresh());
})();
