/* script.js — interactions, emailjs, scrollspy, counters, mobile menu */

document.addEventListener('DOMContentLoaded', () => {
  // === EmailJS init (public key you provided) ===
  try {
    emailjs.init('BV8zhZFGyQySbR4lg');
  } catch (err) {
    console.warn('EmailJS not available:', err);
  }

  // ===== DOM refs =====
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksWrap = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const counts = document.querySelectorAll('.count');

  // ===== Mobile menu toggle =====
  if (menuToggle && navLinksWrap) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinksWrap.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when link clicked (mobile)
    navLinks.forEach(a => a.addEventListener('click', () => navLinksWrap.classList.remove('open')));
  }

  // ===== Header shrink / semi-transparent on scroll =====
  const SCROLL_THRESHOLD = 30;
  function onScrollHeader() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  // ===== Smooth scrolling handled by CSS scroll-behavior, but offset anchor adjust =====
  // For browsers/anchors in-page: adjust scroll to account for fixed header.
  function offsetAnchorScroll(e) {
    if (!e) return;
    e.preventDefault();
    const href = this.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    const headerHeight = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
    window.scrollTo({ top, behavior: 'smooth' });
    // update active link immediately
    navLinks.forEach(l=>l.classList.remove('active'));
    this.classList.add('active');
  }
  navLinks.forEach(link => link.addEventListener('click', offsetAnchorScroll));

  // ===== Scrollspy: highlight link when section in view =====
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const observerOptions = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, observerOptions);
  sections.forEach(s => spyObserver.observe(s));

  // ===== Counters: animate when visible =====
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counts.forEach(el => {
          const target = +el.dataset.target;
          const duration = 1200; // ms
          let start = null;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
          };
          requestAnimationFrame(step);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  if (counts.length) counterObserver.observe(document.querySelector('.hero'));

  // ===== Contact form (EmailJS sending) =====
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const EMAILJS_SERVICE_ID = 'service_6wu4u5i';
  const EMAILJS_TEMPLATE_ID = 'template_zqaxpgb';

  if (form) {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      status.textContent = '';
      const consent = document.getElementById('consent');
      if (consent && !consent.checked) {
        status.textContent = 'Please accept data consent to continue.';
        status.style.color = 'crimson';
        return;
      }

      status.textContent = 'Sending...';
      status.style.color = '#444';

      const formData = new FormData(form);
      const params = {
        from_name: formData.get('name') || '',
        from_email: formData.get('email') || '',
        from_phone: formData.get('phone') || '',
        message_html: formData.get('message') || ''
      };

      const file = formData.get('attachment');
      const sendNow = async () => {
        try {
          const res = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
          console.log('EmailJS success:', res);
          status.textContent = 'Message sent successfully!';
          status.style.color = 'green';
          form.reset();
        } catch (err) {
          console.error('EmailJS error:', err);
          status.textContent = 'Error sending message. Please try again.';
          status.style.color = 'crimson';
        }
      };

      if (file && file.size && file.size <= 5 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = async () => {
          params.attachment = reader.result.split(',')[1];
          await sendNow();
        };
        reader.readAsDataURL(file);
      } else {
        await sendNow();
      }
    });
  }

  // === end DOMContentLoaded ===
});
