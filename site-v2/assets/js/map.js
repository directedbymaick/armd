/* Carte interactive implantations - moteur viewBox v4.
   - Zoom vectoriel net (viewBox), amorti par interpolation (lerp) :
     molette, double-clic, pinch 2 doigts, boutons.
   - Tactile : 1 doigt = scroll de page normal (hint "deux doigts"),
     2 doigts = pan + pinch de la carte.
   - flyTo : clic sur une ville dans les listes = zoom anime dessus.
   - Arcs de connexion entre bureaux actifs (Paris-Abidjan-Douala).
   - Cards repositionnees intelligemment pres des bords du cadre. */
(function () {
  var map = document.querySelector('[data-map]');
  if (!map) return;

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas = map.querySelector('[data-map-canvas]');
  var hint = map.querySelector('[data-map-hint]');
  var markers = Array.prototype.slice.call(map.querySelectorAll('.map-marker'));

  var MAXZ = 7;
  var svg = null;
  var BASE = null;   // viewBox d'origine
  var cur = null;    // viewBox affiche (interpole)
  var target = null; // viewBox cible (gestes)

  /* Marqueurs : fraction de la carte + cote de card d'origine */
  var points = markers.map(function (el) {
    return {
      el: el,
      fx: parseFloat(el.style.getPropertyValue('--mx')) / 100,
      fy: parseFloat(el.style.getPropertyValue('--my')) / 100,
      side: el.getAttribute('data-side') || '',
    };
  });

  /* Villes des bureaux actifs pour les arcs (fractions) */
  var OFFICES = ['paris', 'abidjan', 'douala'];

  /* ---------- chargement du fond ---------- */
  fetch('assets/images/world-map.svg?v=3')
    .then(function (r) { return r.text(); })
    .then(function (markup) {
      canvas.innerHTML = markup;
      svg = canvas.querySelector('svg');
      var vb = svg.getAttribute('viewBox').split(/\s+/).map(Number);
      BASE = { x: vb[0], y: vb[1], w: vb[2], h: vb[3] };
      cur = { x: BASE.x, y: BASE.y, w: BASE.w, h: BASE.h };
      target = { x: BASE.x, y: BASE.y, w: BASE.w, h: BASE.h };
      drawArcs();
      map.classList.add('is-loaded');
      render();
    })
    .catch(function () { /* fond degrade seul : marqueurs restent places */ });

  /* Arcs quadratiques entre les 3 bureaux */
  function drawArcs() {
    var coords = {};
    points.forEach(function (p) {
      var city = p.el.getAttribute('data-city');
      if (OFFICES.indexOf(city) !== -1) {
        coords[city] = { x: BASE.x + p.fx * BASE.w, y: BASE.y + p.fy * BASE.h };
      }
    });
    var pairs = [['paris', 'abidjan'], ['abidjan', 'douala'], ['douala', 'paris']];
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    pairs.forEach(function (pair) {
      var a = coords[pair[0]];
      var b = coords[pair[1]];
      if (!a || !b) return;
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      var dist = Math.hypot(dx, dy);
      // Point de controle : milieu decale perpendiculairement (bombement)
      var cx = (a.x + b.x) / 2 - dy / dist * dist * 0.18;
      var cy = (a.y + b.y) / 2 + dx / dist * dist * 0.18;
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M' + a.x + ' ' + a.y + ' Q' + cx + ' ' + cy + ' ' + b.x + ' ' + b.y);
      path.setAttribute('class', 'map-arc');
      path.setAttribute('vector-effect', 'non-scaling-stroke');
      g.appendChild(path);
    });
    svg.appendChild(g);
  }

  /* ---------- rendu + interpolation ---------- */
  var raf = null;

  function clampView(v) {
    v.w = Math.min(BASE.w, Math.max(BASE.w / MAXZ, v.w));
    v.h = v.w * (BASE.h / BASE.w);
    v.x = Math.min(BASE.x + BASE.w - v.w, Math.max(BASE.x, v.x));
    v.y = Math.min(BASE.y + BASE.h - v.h, Math.max(BASE.y, v.y));
  }

  function render() {
    svg.setAttribute('viewBox', cur.x + ' ' + cur.y + ' ' + cur.w + ' ' + cur.h);
    points.forEach(function (p) {
      var mapX = BASE.x + p.fx * BASE.w;
      var mapY = BASE.y + p.fy * BASE.h;
      var lx = (mapX - cur.x) / cur.w * 100;
      var ly = (mapY - cur.y) / cur.h * 100;
      p.el.style.left = lx + '%';
      p.el.style.top = ly + '%';
      // Hors cadre : on masque (evite les cards fantomes sur les bords)
      p.el.style.visibility = (lx < -2 || lx > 102 || ly < -2 || ly > 102) ? 'hidden' : '';
      // Card intelligente : flip pres des bords
      var side = p.side;
      if (ly < 22) side = 'bottom';
      else if (lx < 14) side = 'right';
      else if (lx > 86) side = 'left';
      if (side) p.el.setAttribute('data-side', side);
      else p.el.removeAttribute('data-side');
    });
  }

  function animate() {
    var k = REDUCE ? 1 : 0.22; // amorti : 22% de l'ecart par frame
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;
    cur.w += (target.w - cur.w) * k;
    cur.h += (target.h - cur.h) * k;
    var done = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) +
               Math.abs(target.w - cur.w) < BASE.w * 0.0004;
    if (done) {
      cur.x = target.x; cur.y = target.y; cur.w = target.w; cur.h = target.h;
      raf = null;
    } else {
      raf = requestAnimationFrame(animate);
    }
    render();
  }

  function kick() {
    if (raf === null) raf = requestAnimationFrame(animate);
  }

  /* ---------- gestes ---------- */
  function zoomAt(fx, fy, factor) {
    if (!BASE) return;
    var newW = Math.min(BASE.w, Math.max(BASE.w / MAXZ, target.w / factor));
    if (newW === target.w) return;
    var mapX = target.x + fx * target.w;
    var mapY = target.y + fy * target.h;
    target.x = mapX - fx * newW;
    target.y = mapY - fy * newW * (BASE.h / BASE.w);
    target.w = newW;
    clampView(target);
    kick();
  }

  function panBy(dxPx, dyPx) {
    if (!BASE) return;
    var rect = map.getBoundingClientRect();
    target.x -= dxPx * target.w / rect.width;
    target.y -= dyPx * target.h / rect.height;
    clampView(target);
    kick();
  }

  /* flyTo : centre une ville avec un zoom confortable */
  function flyTo(city) {
    if (!BASE) return;
    var p = null;
    points.forEach(function (pt) {
      if (pt.el.getAttribute('data-city') === city) p = pt;
    });
    if (!p) return;
    var newW = BASE.w / 3.2;
    target.w = newW;
    target.h = newW * (BASE.h / BASE.w);
    target.x = BASE.x + p.fx * BASE.w - newW / 2;
    target.y = BASE.y + p.fy * BASE.h - target.h / 2;
    clampView(target);
    kick();
  }

  /* ---------- molette ---------- */
  map.addEventListener('wheel', function (e) {
    e.preventDefault();
    var box = map.getBoundingClientRect();
    var factor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
    zoomAt((e.clientX - box.left) / box.width, (e.clientY - box.top) / box.height, factor);
  }, { passive: false });

  /* ---------- double-clic ---------- */
  map.addEventListener('dblclick', function (e) {
    if (e.target.closest('.map-marker') || e.target.closest('.map-controls')) return;
    var box = map.getBoundingClientRect();
    var atMax = BASE && target.w <= BASE.w / MAXZ * 1.01;
    zoomAt((e.clientX - box.left) / box.width, (e.clientY - box.top) / box.height, atMax ? 1 / MAXZ : 1.9);
  });

  /* ---------- drag souris + pinch tactile ---------- */
  var pointers = new Map();
  var pinchDist = 0;
  var moved = false;
  var hintTimer = null;

  function showHint() {
    if (!hint) return;
    hint.classList.add('is-visible');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () {
      hint.classList.remove('is-visible');
    }, 1800);
  }

  /* touch-action: pan-y laisse le scroll de page au navigateur pour
     1 doigt. A 2 doigts on reprend la main (preventDefault). */
  map.addEventListener('touchmove', function (e) {
    if (e.touches.length >= 2) {
      e.preventDefault();
    } else if (e.touches.length === 1) {
      showHint();
    }
  }, { passive: false });

  map.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.map-controls')) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, type: e.pointerType });
    moved = false;
    if (pointers.size === 2) {
      var pts = Array.from(pointers.values());
      pinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    }
    if (e.pointerType === 'mouse') map.setPointerCapture(e.pointerId);
  });

  map.addEventListener('pointermove', function (e) {
    if (!pointers.has(e.pointerId)) return;
    var prev = pointers.get(e.pointerId);
    var dx = e.clientX - prev.x;
    var dy = e.clientY - prev.y;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, type: e.pointerType });

    if (pointers.size === 1) {
      // Souris uniquement : au doigt, 1 pointeur = scroll de page
      if (prev.type !== 'mouse') return;
      if (Math.abs(dx) + Math.abs(dy) > 2) {
        moved = true;
        map.classList.add('is-panning');
      }
      panBy(dx, dy);
    } else if (pointers.size === 2) {
      moved = true;
      var pts = Array.from(pointers.values());
      var dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      var box = map.getBoundingClientRect();
      var midX = ((pts[0].x + pts[1].x) / 2 - box.left) / box.width;
      var midY = ((pts[0].y + pts[1].y) / 2 - box.top) / box.height;
      if (pinchDist > 0 && dist > 0) {
        zoomAt(midX, midY, dist / pinchDist);
        // Pan au milieu des deux doigts
        panBy(dx / 2, dy / 2);
      }
      pinchDist = dist;
    }
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchDist = 0;
    if (pointers.size === 0) map.classList.remove('is-panning');
    try { map.releasePointerCapture(e.pointerId); } catch (err) { /* deja relache */ }
  }
  map.addEventListener('pointerup', endPointer);
  map.addEventListener('pointercancel', endPointer);

  /* Un drag ne declenche pas le clic marqueur au relachement */
  map.addEventListener('click', function (e) {
    if (moved) {
      e.stopPropagation();
      e.preventDefault();
      moved = false;
    }
  }, true);

  /* ---------- boutons ---------- */
  var btnIn = map.querySelector('[data-map-zoom-in]');
  var btnOut = map.querySelector('[data-map-zoom-out]');
  var btnReset = map.querySelector('[data-map-reset]');
  if (btnIn) btnIn.addEventListener('click', function () { zoomAt(0.5, 0.5, 1.6); });
  if (btnOut) btnOut.addEventListener('click', function () { zoomAt(0.5, 0.5, 1 / 1.6); });
  if (btnReset) btnReset.addEventListener('click', function () {
    if (!BASE) return;
    target = { x: BASE.x, y: BASE.y, w: BASE.w, h: BASE.h };
    kick();
  });

  /* ---------- marqueurs : hover, clavier, cartes info ---------- */
  function setHot(city, on) {
    document.querySelectorAll('[data-city="' + city + '"]').forEach(function (el) {
      el.classList.toggle('is-hot', on);
    });
  }

  function closeAll() {
    markers.forEach(function (m) { m.classList.remove('is-open'); });
  }

  function toggleCard(marker) {
    var wasOpen = marker.classList.contains('is-open');
    closeAll();
    if (!wasOpen) marker.classList.add('is-open');
  }

  markers.forEach(function (marker) {
    var city = marker.getAttribute('data-city');
    marker.addEventListener('mouseenter', function () { setHot(city, true); });
    marker.addEventListener('mouseleave', function () { setHot(city, false); });
    marker.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // laisse passer le mailto
      e.stopPropagation();
      toggleCard(marker);
    });
    marker.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(marker);
      }
    });
  });

  /* Listes : hover = surbrillance, clic = flyTo */
  document.querySelectorAll('.locations-block [data-city]').forEach(function (item) {
    var city = item.getAttribute('data-city');
    item.addEventListener('mouseenter', function () { setHot(city, true); });
    item.addEventListener('mouseleave', function () { setHot(city, false); });
    item.addEventListener('click', function () {
      flyTo(city);
      map.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'nearest' });
    });
  });

  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });
})();
