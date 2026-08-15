/* ============================================================
   ARMD v2 - BACK TO TOP
   Bouton flottant qui apparait apres 600px de scroll.
   S'auto-injecte : aucun changement HTML requis.
   ============================================================ */
(function () {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Revenir en haut de la page");
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 19V5" />
      <path d="M6 11l6-6 6 6" />
    </svg>
  `;
  document.body.appendChild(btn);

  const THRESHOLD = 600;
  let visible = false;
  let ticking = false;

  function update() {
    const shouldShow = window.scrollY > THRESHOLD;
    if (shouldShow !== visible) {
      visible = shouldShow;
      btn.classList.toggle("is-visible", visible);
    }
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  });
})();
