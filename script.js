/* script.js
   - Scroll-triggered reveal (IntersectionObserver)
   - Header shrink & transparency with auto-hide behavior
   - Active nav link tracking on scroll + click
   - Counter animations triggered when hero visible
   - Mobile menu toggle
   - EmailJS contact form send with optional attachment (base64)
   - Back-to-top and cookie banner
*/

document.addEventListener('DOMContentLoaded', () => {
  // ===== Page load fade-in
  requestAnimationFrame(() => document.body.classList.remove('page-preload'));
  document.body.classList.add('page-loaded');

  // ===== EmailJS init (your public key)
  // Replace with your EmailJS public key if different
  if (window.emailjs && typeof emailjs.init === 'function') {
    try { emailjs.init('BV8zhZFGyQySbR4lg'); } catch(e){ console.warn('emailjs init failed', e); }
  }

  // ===== Intersection Observer for reveal animations
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => revealObserver.observe(el));

  // ===== Hero counters - animate when hero visible
  const hero = document.getElementById('hero');
  const counterEls = document.querySelectorAll('.count');

  if (hero) {
    const heroCounterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // start counters
          counterEls.forEach(el => animateCounter(el));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    heroCounterObserver.observe(hero);
  }

  function animateCounter(el) {
    const target = Number(el.dataset.target) || 0;
    const duration = 1400;
    const start = performance.now();
    const from = 0;
    function step(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = Math.pow(progress, 0.85); // gentle ease
      const value = Math.floor(from + (target - from) * eased);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  // ===== Header behavior: shrink + auto-hide on scroll
  const header = document.getElementById('main-header');
  let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const current = window.pageYOffset || document.documentElement.scrollTop;

        // shrink when scrolled beyond 60px
        if (current > 60) header.classList.add('shrink'); else header.classList.remove('shrink');

        // auto-hide on scroll down
        if (current > lastScroll && current > 140) {
          header.style.transform = 'translateY(-110%)';
        } else {
          header.style.transform = '';
        }
        lastScroll = current <= 0 ? 0 : current;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ===== Active nav link while scrolling (section observer)
  const sections = Array.from(document.querySelectorAll('main .section, main .section-panel, #hero'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const matchingLink = document.querySelector(`.nav-links a[data-target="${id}"]`);
      if (entry.isIntersecting) {
        // clear active
        navLinks.forEach(a => a.classList.remove('active'));
        if (matchingLink) matchingLink.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  // Also set active on click + smooth scroll
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', (ev) => {
      // hide mobile nav if open
      navLinksContainer.classList.remove('open');
      document.getElementById('menu-toggle').setAttribute('aria-expanded','false');

      // active link
      navLinks.forEach(n => n.classList.remove('active'));
      a.classList.add('active');

      // smooth scroll to target
      const id = a.getAttribute('href');
      if (id && id.startsWith('#')) {
        ev.preventDefault();
        const target = document.querySelector(id);
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // ===== Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      const open = navLinksContainer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ===== Back to top
  const backBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backBtn.classList.add('show'); else backBtn.classList.remove('show');
  });
  backBtn && backBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  // ===== Cookie banner (simple)
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookies = document.getElementById('accept-cookies');
  if (cookieBanner && !localStorage.getItem('cookiesAccepted')) cookieBanner.hidden = false;
  if (acceptCookies) acceptCookies.addEventListener('click', () => { localStorage.setItem('cookiesAccepted','1'); cookieBanner.hidden = true; });

  // ===== Contact form (EmailJS)
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (
