document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS
  emailjs.init({
    publicKey: 'BV8zhZFGyQySbR4lg'
  });

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

  // Contact form
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // GDPR consent
    const consentBox = document.getElementById('consent');
    if (consentBox && !consentBox.checked) {
      status.textContent = 'Please accept data consent to continue.';
      return;
    }

    status.textContent = 'Sending...';

    // Gather form data
    const formData = new FormData(form);
    const file = formData.get('attachment');

    const params = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      from_phone: formData.get('phone'),
      message_html: formData.get('message'),
    };

    // Optional attachment (≤ 5 MB)
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
});
