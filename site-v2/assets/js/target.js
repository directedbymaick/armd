/* Target grid ARMD (charte p.23).
   - Suivi souris (data-target-follow) : quand le curseur est dans la
     section, la croix suit le pointeur avec un leger retard (lerp),
     comme une optique de visee qui accroche sa cible.
   - Derive auto (data-target-auto) : sans curseur dans la section
     (ou sur tactile), la croix balaie la section vers des points
     aleatoires, en continu.
   - Drag : le losange reste saisissable au doigt sur tactile.
   Desactive si l'utilisateur prefere les animations reduites. */
(function () {
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-target-drag]').forEach(function (target) {
    var handle = target.querySelector('[data-target-handle]');
    var zone = target.parentElement; // la section hote (hero)
    if (!handle || !zone) return;

    var pos = {
      x: parseFloat(getComputedStyle(target).getPropertyValue('--tx')) || 50,
      y: parseFloat(getComputedStyle(target).getPropertyValue('--ty')) || 50,
    };

    function clampX(v) { return Math.min(97, Math.max(3, v)); }
    function clampY(v) { return Math.min(94, Math.max(6, v)); }

    function apply() {
      target.style.setProperty('--tx', pos.x + '%');
      target.style.setProperty('--ty', pos.y + '%');
    }

    /* ---------- suivi souris (lerp) ---------- */
    var following = false;
    var followRaf = null;
    var dest = {x: pos.x, y: pos.y};

    function followStep() {
      // Lerp : 8% de l'ecart par frame = trainee douce derriere le curseur
      pos.x += (dest.x - pos.x) * 0.08;
      pos.y += (dest.y - pos.y) * 0.08;
      apply();
      if (following || Math.abs(dest.x - pos.x) + Math.abs(dest.y - pos.y) > 0.05) {
        followRaf = requestAnimationFrame(followStep);
      } else {
        followRaf = null;
      }
    }

    function startFollow() {
      if (followRaf === null) followRaf = requestAnimationFrame(followStep);
    }

    function stopFollow() {
      following = false;
      // le rAF se coupe tout seul une fois arrive a destination
    }

    var follow = target.hasAttribute('data-target-follow') && !REDUCE;
    if (follow) {
      zone.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        if (target.classList.contains('is-dragging')) return;
        var box = zone.getBoundingClientRect();
        dest.x = clampX(((e.clientX - box.left) / box.width) * 100);
        dest.y = clampY(((e.clientY - box.top) / box.height) * 100);
        if (!following) {
          following = true;
          pauseDrift();
        }
        startFollow();
      });

      zone.addEventListener('pointerleave', function (e) {
        if (e.pointerType !== 'mouse') return;
        stopFollow();
        resumeDrift(2000);
      });
    }

    /* ---------- derive automatique ---------- */
    var auto = target.hasAttribute('data-target-auto') && !REDUCE;
    var raf = null;
    var timer = null;
    var paused = false;

    function drift() {
      if (following) return;
      var from = {x: pos.x, y: pos.y};
      var to = {
        x: 12 + Math.random() * 76,
        y: 15 + Math.random() * 68,
      };
      var dur = 3500 + Math.random() * 3000;
      var t0 = performance.now();

      function step(now) {
        if (following) return; // la souris a repris la main
        var t = Math.min(1, (now - t0) / dur);
        // easeInOutQuad : depart et arrivee doux
        var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        pos.x = from.x + (to.x - from.x) * e;
        pos.y = from.y + (to.y - from.y) * e;
        apply();
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          schedule(1200 + Math.random() * 2600); // respiration entre deux points
        }
      }
      raf = requestAnimationFrame(step);
    }

    function schedule(delay) {
      if (!auto || paused || following) return;
      clearTimeout(timer);
      timer = setTimeout(drift, delay);
    }

    function pauseDrift() {
      paused = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    }

    function resumeDrift(delay) {
      if (!auto) return;
      paused = false;
      cancelAnimationFrame(raf);
      schedule(delay);
    }

    /* ---------- drag (surtout tactile - a la souris le suivi suffit) ---------- */
    handle.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      pauseDrift();
      stopFollow();
      try { handle.setPointerCapture(e.pointerId); } catch (err) { /* pointerId synthetique */ }
      target.classList.add('is-dragging');

      function move(ev) {
        var box = target.getBoundingClientRect();
        pos.x = clampX(((ev.clientX - box.left) / box.width) * 100);
        pos.y = clampY(((ev.clientY - box.top) / box.height) * 100);
        apply();
      }

      function up(ev) {
        target.classList.remove('is-dragging');
        try { handle.releasePointerCapture(ev.pointerId); } catch (err) { /* idem */ }
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        handle.removeEventListener('pointercancel', up);
        resumeDrift(5000);
      }

      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
      handle.addEventListener('pointercancel', up);
    });

    if (auto) schedule(1800);
  });
})();
