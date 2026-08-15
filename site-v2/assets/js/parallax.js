/* ============================================================
   ARMD v2 - PARALLAX SCROLL EFFECT (subtle)
   Anime les elements [data-parallax="N"] avec un translateY
   inversement proportionnel au scroll.
   - data-parallax="0.3" : element bouge 30% du scroll normal
   - data-parallax="0.5" : 50%, etc.
   Utilise requestAnimationFrame + IntersectionObserver pour
   ne pas trigger hors viewport (perf).
   ============================================================ */
(function () {
  const elements = document.querySelectorAll("[data-parallax]");
  if (elements.length === 0) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Stocke speed + offset pour chaque element
  const items = Array.from(elements).map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax) || 0.3,
    visible: false,
  }));

  // Track quels elements sont dans le viewport (perf)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const item = items.find((i) => i.el === entry.target);
        if (item) item.visible = entry.isIntersecting;
      });
    },
    { rootMargin: "100px" }
  );
  items.forEach((item) => observer.observe(item.el));

  // Update via rAF, throttle si pas de scroll
  let ticking = false;
  function update() {
    const scrollY = window.scrollY;
    items.forEach((item) => {
      if (!item.visible) return;
      const rect = item.el.getBoundingClientRect();
      // Position absolue du top de l'element dans la page
      const elementTop = rect.top + scrollY;
      // Offset = combien de pixels on a scrolle depuis l'apparition de
      // l'element. Multiplie par la vitesse. Resultat : a scrollY=elementTop
      // l'offset est 0 (element au natural position).
      const offset = (scrollY - elementTop) * item.speed;
      item.el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  // Init position
  update();
})();
