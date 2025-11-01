/* ========= SCRIPT.JS — Base interactions, EmailJS, ScrollSpy, Animations ========= */
document.addEventListener('DOMContentLoaded', () => {
  // --- EmailJS init (public key you provided) ---
  try {
    emailjs.init('BV8zhZFGyQySbR4lg');
  } catch (e) {
    console.warn('EmailJS load/init issue:', e);
  }

  // --- DOM references ---
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link, .nav-links a'); // Support both selector types
  const backToTop = document.getElementById('back-to-top');
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookies = document.getElementById('accept-cookies');

  // --- HEADER: scroll behavior (scrolled class + hide on scroll) ---
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const cur = window.scrollY || window.pageYOffset;
    if (cur > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    if (cur > lastScroll && cur > 120) header.classList.add('header-hidden');
    else header.classList.remove('header-hidden');

    lastScroll = cur <= 0 ? 0 : cur;

    // back-to-top toggle
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 300);
  }, { passive: true });

  // --- Mobile menu toggle ---
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // --- Smooth scroll & click activation ---
  navLinks.forEach(a => {
    a.addEventListener('click', (ev) => {
      // If it's an anchor to a section on page
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        ev.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = Math.max(72, document.getElementById('main-header').offsetHeight || 72);
          const topPos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8;
          window.scrollTo({ top: topPos, behavior: 'smooth' });
        }
      }
      // mark active immediately on click
      navLinks.forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      // close mobile menu if open
      if (navMenu) navMenu.classList.remove('open');
    });
  });

  // --- ScrollSpy: update active nav while scrolling ---
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const spyOffset = 120;
  const onScrollSpy = () => {
    const pos = window.scrollY + spyOffset;
    for (const sec of sections) {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.id;
      if (pos >= top && pos < bottom) {
        navLinks.forEach(n => n.classList.toggle('active', n.getAttribute('href') === `#${id}`));
      }
    }
  };
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  // Initial run in case page is loaded scrolled
  onScrollSpy();

  // --- Counters (hero) — animate once when visible ---
  const counters = document.querySelectorAll('.count');
  const animateCounters = (entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.count').forEach(el => {
        const target = Number(el.dataset.target) || 0;
        let cur = 0;
        const step = Math.max(1, Math.floor(target / 100));
        const tick = () => {
          cur += step;
          if (cur < target) {
            el.textContent = cur;
            requestAnimationFrame(tick);
          } else {
            el.textContent = target;
          }
        };
        tick();
      });
      obs.disconnect();
    });
  };
  // If counters exist, observe hero
  if (counters.length > 0) {
    const hero = document.getElementById('hero');
    if (hero) {
      const obs = new IntersectionObserver(animateCounters, { threshold: 0.3 });
      obs.observe(hero);
    }
  }

  // --- Career Chart (Chart.js) draw animation ---
  const chartCanvas = document.getElementById('careerChart');
  if (chartCanvas && typeof Chart !== 'undefined') {
    const ctx = chartCanvas.getContext('2d');
    const dataPoints = [10, 40, 80, 130, 180, 230]; // placeholder, replace with your data
    const labels = ['2006','2010','2014','2018','2021','2025'];
    const careerChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Career Progression',
          data: dataPoints,
          borderColor: '#00AEEF',
          backgroundColor: 'rgba(0,174,239,0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          borderWidth: 3
        }]
      },
      options: {
        animation: { duration: 2000, easing: 'easeOutQuart' },
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } }
      }
    });
  }

  // --- Fade-in on scroll for sections and cards ---
  const faders = document.querySelectorAll('.fade-in, .card, .qual-card, .edu-card');
  const revealOnScroll = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  faders.forEach(f => revealOnScroll.observe(f));

  // --- Cookie banner (simple) ---
  if (cookieBanner) {
    if (!localStorage.getItem('cookiesAccepted')) cookieBanner.style.display = 'flex';
    if (acceptCookies) {
      acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted','true');
        cookieBanner.style.display = 'none';
      });
    }
  }

  // --- Back to top button ---
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // --- Contact form handling (EmailJS) ---
  (function initContact() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

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
      status.style.color = '#333';

      const fd = new FormData(form);
      const params = {
        from_name: fd.get('name') || '',
        from_email: fd.get('email') || '',
        from_phone: fd.get('phone') || '',
        message_html: fd.get('message') || ''
      };

      // Handle optional attachment (<=5MB)
      const file = fd.get('attachment');
      const sendEmail = async () => {
        try {
          const res = await emailjs.send('service_6wu4u5i', 'template_zqaxpgb', params);
          console.log('EmailJS result:', res);
          status.textContent = 'Message sent successfully!';
          status.style.color = 'green';
          form.reset();
        } catch (err) {
          console.error('EmailJS error:', err);
          status.textContent = 'Error sending message. Please try again later.';
          status.style.color = 'crimson';
        }
      };

      if (file && file.size && file.size > 0) {
        if (file.size > 5 * 1024 * 1024) {
          status.textContent = 'Attachment exceeds 5 MB limit.';
          status.style.color = 'crimson';
          return;
        }
        const reader = new FileReader();
        reader.onload = async (e) => {
          // EmailJS expects base64 content as string (template param name: attachment)
          // we split the dataURL prefix
          const base64 = String(e.target.result).split(',')[1];
          params.attachment = base64;
          params.attachment_filename = file.name;
          await sendEmail();
        };
        reader.readAsDataURL(file);
      } else {
        await sendEmail();
      }
    });
  })();

  // --- Accessibility: close nav if focus moves away on mobile (optional improvement) ---
  document.addEventListener('click', (e) => {
    if (!navMenu) return;
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
    }
  });

}); // DOMContentLoaded end


