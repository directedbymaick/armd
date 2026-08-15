/* ============ MERIDIAN WORLDWIDE — interactions ============ */
(function () {
  "use strict";

  /* ---------- scroll-aware header ---------- */
  const hd = document.querySelector(".hd");
  const onScroll = () => hd.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.78);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mega menu (Responsibility) ---------- */
  const megaWrap = document.querySelector("[data-mega-trigger]");
  const mega = document.querySelector(".mega");
  if (megaWrap && mega) {
    let t;
    const open = () => { clearTimeout(t); mega.classList.add("open"); };
    const close = () => { t = setTimeout(() => mega.classList.remove("open"), 120); };
    [megaWrap, mega].forEach(el => {
      el.addEventListener("mouseenter", open);
      el.addEventListener("mouseleave", close);
    });
    megaWrap.querySelector("button").addEventListener("click", () =>
      mega.classList.toggle("open"));
  }

  /* ---------- full-screen overlay menu ---------- */
  const overlay = document.querySelector(".overlay");
  const openOverlay = () => { overlay.classList.add("open"); document.body.style.overflow = "hidden"; };
  const closeOverlay = () => { overlay.classList.remove("open"); document.body.style.overflow = ""; };
  document.querySelectorAll("[data-open-menu]").forEach(b => b.addEventListener("click", openOverlay));
  document.querySelectorAll("[data-close-menu]").forEach(b => b.addEventListener("click", closeOverlay));
  overlay.querySelectorAll(".ov-links a").forEach(a => a.addEventListener("click", closeOverlay));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeOverlay(); });

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- newsletter form ---------- */
  const form = document.querySelector(".form");
  if (form) {
    const field = form.querySelector(".field");
    const input = field.querySelector("input");
    const msg = field.querySelector(".msg");
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value.trim();
      field.classList.remove("ok", "err");
      if (!re.test(v)) {
        field.classList.add("err");
        msg.textContent = v ? "Enter a valid email address." : "Email is required.";
        input.focus();
        return;
      }
      field.classList.add("ok");
      msg.textContent = "";
      form.closest(".signup").classList.add("done");
    });
    input.addEventListener("input", () => {
      if (field.classList.contains("err") && re.test(input.value.trim())) {
        field.classList.remove("err"); msg.textContent = "";
      }
    });
  }

  /* ---------- live stock ticker ---------- */
  const tk = document.querySelector(".ticker");
  if (tk) {
    const priceEl = tk.querySelector(".price");
    const chgEl = tk.querySelector(".chg");
    const hiEl = tk.querySelector('[data-k="hi"]');
    const loEl = tk.querySelector('[data-k="lo"]');
    const volEl = tk.querySelector('[data-k="vol"]');
    const updEl = tk.querySelector('[data-k="upd"]');
    const spark = tk.querySelector(".spark");

    const prevClose = 23.74;
    let price = 24.18;
    let hi = 24.36, lo = 23.61, vol = 612400;
    const fmt = n => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const series = [];
    let p = 23.7;
    for (let i = 0; i < 48; i++) { p += (Math.random() - 0.46) * 0.18; series.push(p); }
    series[series.length - 1] = price;

    function drawSpark() {
      const w = spark.clientWidth || 480, h = 70, pad = 4;
      const min = Math.min(...series), max = Math.max(...series);
      const x = i => pad + (i / (series.length - 1)) * (w - pad * 2);
      const y = v => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
      const d = series.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" ");
      const up = price >= prevClose;
      const col = up ? "oklch(0.55 0.12 150)" : "oklch(0.55 0.16 28)";
      spark.innerHTML =
        '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" height="' + h + '" preserveAspectRatio="none">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="' + col + '" stop-opacity=".22"/>' +
        '<stop offset="1" stop-color="' + col + '" stop-opacity="0"/></linearGradient></defs>' +
        '<path d="' + d + ' L' + x(series.length - 1) + ' ' + h + ' L' + x(0) + ' ' + h + ' Z" fill="url(#g)"/>' +
        '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
        '</svg>';
    }

    function render() {
      const diff = price - prevClose;
      const pct = (diff / prevClose) * 100;
      const up = diff >= 0;
      priceEl.textContent = "$" + fmt(price);
      chgEl.className = "chg " + (up ? "up" : "down");
      chgEl.innerHTML = (up ? "▲" : "▼") + " " + fmt(Math.abs(diff)) + " (" + fmt(Math.abs(pct)) + "%)";
      hiEl.textContent = "$" + fmt(hi);
      loEl.textContent = "$" + fmt(lo);
      volEl.textContent = Math.round(vol).toLocaleString("en-US");
    }

    // count-up reveal
    let revealed = false;
    const tio = new IntersectionObserver((ents) => {
      ents.forEach(en => {
        if (en.isIntersecting && !revealed) {
          revealed = true;
          const target = price; let cur = 0; const t0 = performance.now();
          const step = (now) => {
            const k = Math.min(1, (now - t0) / 900);
            const e = 1 - Math.pow(1 - k, 3);
            price = cur + (target - cur) * 1; // keep series intact
            priceEl.textContent = "$" + fmt(target * e || 0.0);
            if (k < 1) requestAnimationFrame(step); else { price = target; render(); }
          };
          requestAnimationFrame(step);
          drawSpark(); render();
        }
      });
    }, { threshold: 0.4 });
    tio.observe(tk);

    // simulated live ticks
    setInterval(() => {
      const move = (Math.random() - 0.48) * 0.07;
      price = Math.max(0, +(price + move).toFixed(2));
      hi = Math.max(hi, price); lo = Math.min(lo, price);
      vol += Math.round(Math.random() * 1800);
      series.push(price); series.shift();
      drawSpark(); render();
      if (updEl) updEl.textContent = "Just now";
    }, 2600);

    window.addEventListener("resize", drawSpark, { passive: true });
    drawSpark(); render();
  }

  /* ---------- subtle hero parallax ---------- */
  const film = document.querySelector(".hero .filmph");
  if (film) {
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY, window.innerHeight);
      film.style.transform = "translateY(" + y * 0.18 + "px) scale(1.05)";
    }, { passive: true });
  }
})();
