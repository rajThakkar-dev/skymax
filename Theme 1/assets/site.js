(() => {
  /* ── LOGO SVG ──────────────────────────────────────────── */
  const LOGO_SVG = `<svg class="mark" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M39.8 8.8C33.3 12.5 20.5 18.9 9 25.3L5.5 17.5 38 1.8Z" fill="currentColor"/>
    <path d="M40.9 17.6C35.7 21 25 25.9 12.7 30.5l-6.4-5.8L34 11.7Z" fill="#3174FA"/>
    <path d="M41.2 27.5C33.8 31.4 22.8 37.7 10 45V34.2l29.9-14Z" fill="#00BBAB"/>
  </svg>`;

  /* ── MOBILE NAV ────────────────────────────────────────── */
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }

  /* ── SCROLL: header shadow ─────────────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── SCROLL REVEAL ─────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── COUNTER ANIMATION ─────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();
        const animate = now => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        countIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countIO.observe(el));
  }

  /* ── DEMO FORM ─────────────────────────────────────────── */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const fb = form.querySelector('[role="status"]');
      if (fb) {
        fb.hidden = false;
        fb.className = 'form-success';
        fb.textContent = 'Thanks for your message. This is a demonstration form — no details were sent. A live email or CRM integration is required before launch.';
      }
    });
  });

  /* ── FOOTER YEAR ───────────────────────────────────────── */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();