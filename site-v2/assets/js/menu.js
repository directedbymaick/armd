/* ============================================================
   ARMD v2 - MENU HAMBURGER
   Toggle open/close du menu panel + gestion accessibilite.
   ============================================================ */
(function () {
  const toggle = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-menu-panel]");
  const overlay = document.querySelector("[data-menu-overlay]");
  const body = document.body;

  if (!toggle || !panel || !overlay) return;

  function open() {
    body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    // Focus le premier lien du menu pour navigation clavier
    const firstLink = panel.querySelector("a");
    if (firstLink) firstLink.focus({ preventScroll: true });
  }

  function close() {
    body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    toggle.focus({ preventScroll: true });
  }

  function toggleMenu() {
    if (body.classList.contains("menu-open")) {
      close();
    } else {
      open();
    }
  }

  // Click toggle
  toggle.addEventListener("click", toggleMenu);

  // Click overlay = close
  overlay.addEventListener("click", close);

  // Escape key = close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("menu-open")) {
      close();
    }
  });

  // Click sur un lien du menu = close (navigation se fera apres)
  panel.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => {
      close();
    });
  });

  // Etat initial accessibilite
  toggle.setAttribute("aria-expanded", "false");
  panel.setAttribute("aria-hidden", "true");
})();
