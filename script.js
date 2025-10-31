/* === PORTFOLIO SCRIPT.JS — FINAL FULL VERSION === */
document.addEventListener('DOMContentLoaded', () => {

/* === 1️⃣ Initialize EmailJS === */
emailjs.init('BV8zhZFGyQySbR4lg'); // Replace with your own public key

const EMAILJS_SERVICE_ID = 'service_6wu4u5i';
const EMAILJS_TEMPLATE_ID = 'template_zqaxpgb';

/* === 2️⃣ CONTACT FORM HANDLER === */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
form.addEventListener('submit', async (e) => {
e.preventDefault();

```
  const consentBox = document.getElementById('consent');
  if (consentBox && !consentBox.checked) {
    status.textContent = 'Please accept data consent to continue.';
    status.style.color = 'red';
    return;
  }

  status.textContent = 'Sending...';
  status.style.color = '#333';

  const formData = new FormData(form);
  const params = {
    from_name: formData.get('name'),
    from_email: formData.get('email'),
    from_phone: formData.get('phone'),
    message_html: formData.get('message'),
  };

  const file = formData.get('attachment');
  const sendNow = async () => {
    try {
      const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
      console.log('✅ Email sent:', result);
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
```

}

/* === 3️⃣ HEADER BEHAVIOR === */
const header = document.getElementById('main-header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

```
// Slight transparency + dynamic shadow
if (currentScroll > 50) {
  header.classList.add('scrolled');
  header.style.boxShadow = `0 4px ${Math.min(16, currentScroll / 15)}px rgba(0,0,0,0.15)`;
} else {
  header.classList.remove('scrolled');
  header.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
}

// Auto-hide on scroll down
if (currentScroll > lastScrollTop && currentScroll > 120) {
  header.classList.add('header-hidden');
} else {
  header.classList.remove('header-hidden');
}

lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
```

});

/* === 4️⃣ SMOOTH SCROLL TO SECTIONS === */
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
link.addEventListener('click', (e) => {
const targetId = link.getAttribute('href');
if (targetId && targetId.startsWith('#')) {
e.preventDefault();
document.querySelector(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
}
});
});

/* === 5️⃣ ACTIVE LINK HIGHLIGHT (CLICK + SCROLL SPY) === */
function setActiveLink(link) {
navLinks.forEach(l => l.classList.remove('active'));
if (link) link.classList.add('active');
}

navLinks.forEach(link => {
link.addEventListener('click', () => setActiveLink(link));
});

const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
setActiveLink(activeLink);
}
});
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

/* === 6️⃣ MOBILE MENU TOGGLE === */
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-links');

if (menuToggle && navMenu) {
menuToggle.addEventListener('click', () => {
navMenu.classList.toggle('open');
});

```
// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove('open');
  }
});
```

}

/* === 7️⃣ SCROLL ANIMATIONS === */
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

/* === 8️⃣ BACK TO TOP BUTTON === */
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
window.addEventListener('scroll', () => {
if (window.scrollY > 300) {
backToTopButton.classList.add('show');
} else {
backToTopButton.classList.remove('show');
}
});

```
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

}

/* === 9️⃣ COOKIE CONSENT === */
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');
if (cookieBanner && acceptCookies) {
if (!localStorage.getItem('cookiesAccepted')) {
cookieBanner.style.display = 'block';
}

```
acceptCookies.addEventListener('click', () => {
  cookieBanner.style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
});
```

}
});
