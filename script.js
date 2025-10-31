// ============================
// PORTFOLIO MAIN SCRIPT — FINAL VERSION WITH TRANSPARENT HEADER SHADOW
// ============================
document.addEventListener('DOMContentLoaded', () => {
  // === Initialize EmailJS ===
  emailjs.init('BV8zhZFGyQySbR4lg');

  const EMAILJS_SERVICE_ID = 'service_6wu4u5i';
  const EMAILJS_TEMPLATE_ID = 'template_zqaxpgb';

  // === Counter Animation ===
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;
    const updateCount = () => {
      if (count < target) {
        count += Math.ceil(target / 100);
        counter.textContent = count;
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };
    updateCount();
  });

  // === Tab Switching for Certifications ===
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // === CONTACT FORM ===
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const consentBox = document.getElementById('consent');
      if (consentBox && !consentBox.checked) {
        status.textContent = 'Please accept data consent to continue.';
        status.style.color = 'red';
        return;
      }

      status.textContent = 'Sending...';
      status.style.color = '#333';

      const formData = new FormData(form);
      const file = formData.get('attachment');

      const params = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        from_phone: formData.get('phone'),
        message_html: formData.get('message')
      };

      const sendNow = async () => {
        try {
          const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
          console.log('✅ EmailJS result:', result);
          status.textContent = 'Message sent successfully!';
          status.style.color = 'green';
          form.reset();
        } catch (error) {
          console.error('❌ EmailJS error:', error);
          status.textContent = 'Error sending message. Please try again.';
          status.style.color = 'red';
        }
      };

      if (file && file.size > 0 && file.size <= 5 * 1024 * 1024) {
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

  // === Scroll-triggered Fade-in Animations ===
  const faders = document.querySelectorAll('section, .card, .qual-card, .edu-card');
  const appearOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    fader.classList.add('fade-in');
    appearOnScroll.observe(fader);
  });

  // === Cookie Consent ===
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookies = document.getElementById('accept-cookies');

  if (cookieBanner && acceptCookies) {
    if (!localStorage.getItem('cookiesAccepted')) {
      cookieBanner.style.display = 'block';
    }

    acceptCookies.addEventListener('click', () => {
      cookieBanner.style.display = 'none';
      localStorage.setItem('cookiesAccepted', 'true');
    });
  }

  // === Back to Top Button ===
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === NAVIGATION: Active Link Highlight + Smooth Scroll ===
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Activate underline highlight
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Smooth scroll to section
      if (targetId.startsWith('#') && document.querySelector(targetId)) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        const offsetTop = targetEl.offsetTop - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }

      // Close mobile menu after click
      const navMenu = document.querySelector('.nav-links');
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });

  // === MOBILE MENU TOGGLE ===
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.nav-links');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // === AUTO-HIDE HEADER, TRANSPARENT FADE & SHADOW ===
  const header = document.getElementById('main-header');
  let lastScrollTop = 0;
  let isScrolled = false;

  if (header) {
    header.style.transition = 'background-color 0.6s ease, box-shadow 0.6s ease, transform 0.4s ease';

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      // Smooth fade between solid → transparent blue + shadow
      if (currentScroll > 60 && !isScrolled) {
        header.style.backgroundColor = 'rgba(0, 64, 128, 0.90)';
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        isScrolled = true;
      } else if (currentScroll <= 60 && isScrolled) {
        header.style.backgroundColor = '#004080';
        header.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.05)';
        isScrolled = false;
      }

      // Auto-hide on downward scroll
      if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  }
});

// ---------- HERO: Chart + Counters + Parallax ----------
(function initHeroDashboard() {
  const ctx = document.getElementById('careerChart');
  let careerChart = null;

  function createCareerChart() {
    if (!ctx) return;
    careerChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2006', '2010', '2014', '2018', '2021', '2025'],
        datasets: [{
          label: 'Career Progression',
          data: [10, 40, 80, 130, 180, 230],
          borderColor: '#00AEEF',
          backgroundColor: 'rgba(0,174,239,0.15)',
          borderWidth: 3,
          pointRadius: 4,
          tension: 0.35,
          fill: true
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
        animation: { duration: 2000, easing: 'easeOutQuart' }
      }
    });
  }

  // Animate counters when hero becomes visible
  const heroCounters = document.querySelectorAll('.hero .count');
  let hasAnimated = false;

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        heroCounters.forEach(el => {
          const target = +el.dataset.target;
          let current = 0;
          const step = Math.max(1, Math.floor(target / 100));
          const tick = () => {
            current += step;
            if (current < target) {
              el.textContent = current;
              requestAnimationFrame(tick);
            } else {
              el.textContent = target;
            }
          };
          tick();
        });

        createCareerChart();
        hasAnimated = true;
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.querySelector('.hero');
  if (heroSection) heroObserver.observe(heroSection);

  // Subtle parallax effect on chart
  const heroRight = document.querySelector('.hero-right');
  if (heroRight && heroSection) {
    window.addEventListener('scroll', () => {
      const rect = heroSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrollRatio = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        heroRight.style.transform = `translateY(${scrollRatio * 20}px)`;
      }
    }, { passive: true });
  }
})();
