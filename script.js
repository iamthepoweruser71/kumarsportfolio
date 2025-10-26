document.addEventListener('DOMContentLoaded', () => {
// Initialize EmailJS (placeholders)
emailjs.init('BV8zhZFGyQySbR4lg');

const EMAILJS_SERVICE_ID = 'service_6wu4u5i';
const EMAILJS_TEMPLATE_ID = 'template_zqaxpgb';

// Counter animation
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

// Chart animation
const ctx = document.getElementById('careerChart').getContext('2d');
new Chart(ctx, {
type: 'line',
data: {
labels: ['2005', '2010', '2015', '2020', '2025'],
datasets: [{
label: 'Career Growth',
data: [10, 25, 45, 70, 100],
borderColor: '#00b4d8',
fill: false,
tension: 0.4
}]
},
options: {
responsive: true,
plugins: { legend: { display: false } },
scales: {
x: { grid: { display: false } },
y: { grid: { color: 'rgba(255,255,255,0.1)' }, display: false }
}
}
});

// Cookie consent
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');
if (!localStorage.getItem('cookiesAccepted')) {
cookieBanner.style.display = 'block';
}
acceptCookies.addEventListener('click', () => {
localStorage.setItem('cookiesAccepted', 'true');
cookieBanner.style.display = 'none';
});

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
e.preventDefault();
if (!document.getElementById('consent').checked) {
status.textContent = 'Please accept data consent to continue.';
return;
}
status.textContent = 'Sending...';

```
const formData = new FormData(form);
const file = formData.get('attachment');

let attachmentBase64 = '';
if (file && file.size > 0 && file.size <= 5 * 1024 * 1024) {
  const reader = new FileReader();
  reader.onload = async () => {
    attachmentBase64 = reader.result.split(',')[1];
    await sendEmail();
  };
  reader.readAsDataURL(file);
} else {
  await sendEmail();
}

async function sendEmail() {
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      from_phone: formData.get('phone'),
      message_html: formData.get('message'),
      attachment: attachmentBase64
    });
    status.textContent = 'Message sent successfully!';
    form.reset();
  } catch (error) {
    console.error(error);
    status.textContent = 'Error sending message. Please try again.';
  }
}
```

});
});


