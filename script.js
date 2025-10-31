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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // GDPR Consent Check
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
        console.log("📨 Sending params:", params);
        const result = await emailjs.send('service_6wu4u5i', 'template_zqaxpgb', params);
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

    // Handle attachment (optional, up to 5 MB)
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

  if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'block';
  }

  acceptCookies.addEventListener('click', () => {
    cookieBanner.style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
  });

  // === Back to Top Button ===
  const backToTopButton = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// ---------- HERO: chart + visibility-triggered counters + parallax ----------
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
// === AUTO-HIDE NAVIGATION ===
let lastScrollTop = 0;
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // Scroll down → hide
    header.classList.add('header-hidden');
  } else {
    // Scroll up → show
    header.classList.remove('header-hidden');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
// === ACTIVE NAV LINK ON CLICK ===
const navLinksList = document.querySelectorAll('.nav-links a');

navLinksList.forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// === MOBILE MENU TOGGLE ===
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});


