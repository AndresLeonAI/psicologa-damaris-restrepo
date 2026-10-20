// Movimiento del sitio: parallax por capas, revelado al hacer scroll y barra
// de navegación que se oculta al bajar. Todo con transform, sin librerías.
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const video = document.querySelector(".hero-video");

  // Con movimiento reducido el video queda en su fotograma de póster.
  if (reduce.matches && video) {
    video.removeAttribute("autoplay");
    video.pause();
  }

  // Revelado
  const reveals = document.querySelectorAll(".reveal");
  if (reduce.matches || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    reveals.forEach((el) => io.observe(el));
  }

  // Parallax: cada capa se desplaza según su data-depth respecto al centro de
  // su sección. Una sola lectura de layout por frame y escritura solo de transform.
  const layers = [...document.querySelectorAll("[data-depth]")].map((el) => ({
    el,
    depth: parseFloat(el.dataset.depth) || 0,
    host: el.closest("section") || el.parentElement,
  }));
  const nav = document.querySelector("[data-nav]");
  let lastY = window.scrollY;
  let ticking = false;

  const frame = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;

    if (!reduce.matches) {
      const scale = window.innerWidth < 720 ? 0.6 : 1;
      for (const l of layers) {
        const r = l.host.getBoundingClientRect();
        if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) continue;
        const offset = (r.top + r.height / 2 - vh / 2) * l.depth * -0.35 * scale;
        l.el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    }

    if (nav) {
      nav.classList.toggle("is-scrolled", y > 20);
      if (y > 160 && y - lastY > 6) nav.classList.add("is-hidden");
      else if (lastY - y > 6 || y < 160) nav.classList.remove("is-hidden");
    }
    lastY = y;
  };

  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  reduce.addEventListener?.("change", () => {
    if (reduce.matches) layers.forEach((l) => (l.el.style.transform = ""));
    onScroll();
  });
  frame();

  // Pausa el video cuando el hero sale de pantalla para ahorrar batería.
  if (video && "IntersectionObserver" in window && !reduce.matches) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()))
      .observe(video);
  }

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
