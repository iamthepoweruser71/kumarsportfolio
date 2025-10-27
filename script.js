document.addEventListener('DOMContentLoaded', () => {
  // === Initialize EmailJS ===
  emailjs.init({
    publicKey: 'BV8zhZFGyQySbR4lg'
  });

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







