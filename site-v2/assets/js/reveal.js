/* Reveals au scroll - IntersectionObserver + classes CSS (voir animations.css).
   Auto-ciblage : aucun attribut a poser dans le HTML, les selecteurs ci-dessous
   couvrent toutes les pages. Les contenus injectes par Sanity (cards) sont
   captes par le MutationObserver.
   prefers-reduced-motion : les transitions passent a 0.01ms via le media query
   global de design-system.css, donc apparition instantanee. */
(function () {
  var SELECTORS = [
    '.page-header__inner',
    '.manifesto__quote',
    '.manifesto__attr',
    '.approach__heading',
    '.pillar',
    '.expertises__header',
    '.expertise-row',
    '.cases__header',
    '.case-card',
    '.founder__image',
    '.founder__content',
    '.founder-full__image',
    '.founder-full__content',
    '.team__header',
    '.team-member',
    '.insight-card',
    '.newsletter__inner',
    '.contact-cta__inner',
    '.contact-form',
    '.contact-info',
    '.legal__block',
  ].join(',');

  if (!('IntersectionObserver' in window)) return;
  document.documentElement.setAttribute('data-reveal-ready', '');

  var io = new IntersectionObserver(onIntersect, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.1,
  });

  var done = new WeakSet();

  function onIntersect(entries) {
    var batch = 0;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      // Stagger : les elements qui entrent ensemble se decalent de 70ms.
      var delay = batch++ * 70;
      el.style.transitionDelay = delay + 'ms';
      el.classList.add('is-visible');
      io.unobserve(el);
      // Une fois l'entree jouee, on retire TOUT (classes + delay) pour
      // rendre a l'element sa transition CSS d'origine - sinon la regle
      // .reveal ecrase les transitions de hover (ex: .expertise-row).
      var cleaned = false;
      function cleanup(ev) {
        if (cleaned) return;
        if (ev && ev.target !== el) return; // ignorer les transitions des enfants
        cleaned = true;
        el.style.transitionDelay = '';
        el.classList.remove('reveal', 'is-visible');
        el.removeEventListener('transitionend', cleanup);
      }
      el.addEventListener('transitionend', cleanup);
      setTimeout(cleanup, 800 + delay); // filet si transitionend ne vient pas
    });
  }

  function observe(el) {
    if (done.has(el) || el.classList.contains('reveal')) return;
    done.add(el);
    el.classList.add('reveal');
    io.observe(el);
  }

  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.matches && root.matches(SELECTORS)) observe(root);
    if (root.querySelectorAll) {
      Array.prototype.forEach.call(root.querySelectorAll(SELECTORS), observe);
    }
  }

  scan(document.body);

  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      Array.prototype.forEach.call(m.addedNodes, scan);
    });
  }).observe(document.body, {childList: true, subtree: true});
})();
