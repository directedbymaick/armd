// Hero stroke animation
(function () {
  var stroke = document.querySelector('.hero__stroke');
  if (!stroke) return;
  setTimeout(function () {
    stroke.classList.add('is-visible');
  }, 400);
})();

(function () {
  var header = document.querySelector('.header');
  if (!header) return;

  function isLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function getScrollBg() {
    var style = getComputedStyle(document.documentElement);
    return style.getPropertyValue('--color-header-scrolled').trim();
  }

  function onScroll() {
    var scrolled = window.scrollY > 80;
    header.style.background = scrolled ? getScrollBg() : 'transparent';
    header.style.backdropFilter = scrolled ? 'blur(12px)' : 'blur(0px)';
    header.style.webkitBackdropFilter = scrolled ? 'blur(12px)' : 'blur(0px)';
    header.classList.toggle('header--scrolled', scrolled);

    if (isLight()) {
      header.style.color = scrolled ? '#282828' : '#ffffff';
    } else {
      header.style.color = '#ffffff';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Theme toggle
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  var saved = localStorage.getItem('armd-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  toggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('armd-theme', next);
    onScroll();
  });

})();

// Methode horizontal scroll
(function () {
  var section = document.querySelector('.methode');
  var track = document.querySelector('.methode__track');
  var trackTitles = document.querySelector('.methode__track-titles');
  var progress = document.querySelector('.methode__frise-progress');
  var steps = document.querySelectorAll('.methode__step');
  var stepTops = document.querySelectorAll('.methode__step-top');
  if (!section || !track || !steps.length) return;

  function setup() {
    var totalScroll = track.scrollWidth - window.innerWidth;
    var sectionHeight = totalScroll * 3 + window.innerHeight;
    section.style.height = sectionHeight + 'px';
    return { totalScroll: totalScroll, sectionHeight: sectionHeight };
  }

  var dims = setup();

  function onScroll() {
    var rect = section.getBoundingClientRect();
    var scrolled = -rect.top;
    var maxScroll = dims.sectionHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    var ratio = Math.max(0, Math.min(1, scrolled / maxScroll));

    var tx = 'translateX(' + (-ratio * dims.totalScroll) + 'px)';
    track.style.transform = tx;
    if (trackTitles) trackTitles.style.transform = tx;
    if (progress) progress.style.width = (ratio * 100) + '%';

    steps.forEach(function (step, i) {
      var active = ratio >= i / steps.length;
      step.classList.toggle('is-active', active);
      if (stepTops[i]) stepTops[i].classList.toggle('is-active', active);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { dims = setup(); onScroll(); });
  onScroll();
})();

// Livrable popup mouse-follow
(function () {
  var livrables = document.querySelectorAll('.methode__step-livrable--preview');
  if (!livrables.length) return;

  livrables.forEach(function (liv) {
    var popup = liv.querySelector('.methode__livrable-popup');
    if (!popup) return;

    liv.addEventListener('mousemove', function (e) {
      var rect = liv.getBoundingClientRect();
      var ratio = (e.clientX - rect.left) / rect.width;
      var offset = ratio * rect.width - popup.offsetWidth / 2;
      popup.style.left = offset + 'px';
    });

    liv.addEventListener('mouseleave', function () {
      popup.style.left = '50%';
    });
  });
})();

// Radar interactif
(function () {
  var radar = document.querySelector('[data-radar]');
  if (!radar) return;

  var points = radar.querySelectorAll('.radar__point');
  var labels = radar.querySelectorAll('.radar__label');

  function activate(index) {
    points.forEach(function (p, i) {
      p.classList.toggle('is-active', i === index);
    });
    labels.forEach(function (l, i) {
      l.classList.toggle('is-active', i === index);
    });
  }

  function deactivate() {
    points.forEach(function (p) { p.classList.remove('is-active'); });
    labels.forEach(function (l) { l.classList.remove('is-active'); });
  }

  points.forEach(function (p) {
    var idx = parseInt(p.getAttribute('data-index'), 10);
    p.addEventListener('mouseenter', function () { activate(idx); });
    p.addEventListener('mouseleave', deactivate);
  });

  labels.forEach(function (l) {
    var idx = parseInt(l.getAttribute('data-index'), 10);
    l.addEventListener('mouseenter', function () { activate(idx); });
    l.addEventListener('mouseleave', deactivate);
  });

  var current = 0;
  var interval = setInterval(function () {
    activate(current);
    current = (current + 1) % 5;
  }, 2500);

  radar.addEventListener('mouseenter', function () {
    clearInterval(interval);
  });

  radar.addEventListener('mouseleave', function () {
    deactivate();
    current = 0;
    interval = setInterval(function () {
      activate(current);
      current = (current + 1) % 5;
    }, 2500);
  });
})();
