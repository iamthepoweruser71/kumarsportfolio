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

// === Contact Form ===
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
e.preventDefault();

```
// GDPR consent check
const consentBox = document.getElementById('consent');
if (consentBox && !consentBox.checked) {
  status.textContent = 'Please accept data consent to continue.';
  return;
}

status.textContent = 'Sending...';

const formData = new FormData(form);
const file = formData.get('attachment');

const params = {
  from_name: formData.get('name'),
  from_email: formData.get('email'),
  from_phone: formData.get('phone'),
  message_html: formData.get('message'),
};

// Send function
const sendNow = async () => {
  try {
    const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
    console.log('EmailJS result:', result);
    status.textContent = 'Message sent successfully!';
    form.reset();
  } catch (error) {
    console.error('EmailJS error:', error);
    status.textContent = 'Error sending message. Please try again.';
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

// === Scroll-triggered Fade-in Animations ===
const faders = document.querySelectorAll('section, .card, .qual-card, .edu-card');
const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

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

// === BACK TO TOP BUTTON FUNCTIONALITY ===
const backToTopButton = document.getElementById('back-to-top');
const heroSection = document.querySelector('.hero');
const footerSection = document.querySelector('footer');

window.addEventListener('scroll', () => {
const scrollY = window.scrollY;


// Toggle visibility
if (scrollY > 300) {
  backToTopButton.classList.add('show');
} else {


