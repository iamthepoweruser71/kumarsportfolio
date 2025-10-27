document.addEventListener('DOMContentLoaded', () => {
  /* === Initialize EmailJS === */
  emailjs.init({
    publicKey: 'BV8zhZFGyQySbR4lg'
  });

  const EMAILJS_SERVICE_ID = 'service_6wu4u5i';
  const EMAILJS_TEMPLATE_ID = 'template_zqaxpgb';

  /* === HERO COUNTER ANIMATION === */
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

  /* === HERO CAREER CHART === */
  const ctx = document.getElementById('careerChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2004', '2008', '2012', '2016', '2020', '2025'],
        datasets: [{
          label: 'Career Progression (Revenue/Impact)',
          data: [5, 25, 60, 120, 160, 200],
          borderColor: '#fff',
          borderWidth: 3,
          tension: 0.4,
          fill: false,
          pointRadius: 5,
          pointBackgroundColor: '#00AEEF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#e0e0e0', font: { size: 12 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.2)' },
            ticks: { color: '#e0e0e0', font: { size: 12 } }
          }
        },
        animations: {
          tension: {
            duration: 1500,
            easing: 'easeOutQuart',
            from: 0.5,
            to: 0,
            loop: false
          }
        }
      }
    });
  }

  /* === TAB SWITCHING LOGIC === */
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

  /* === CONTACT FORM === */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

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

      const sendEmail = async () => {
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
          await sendEmail();
        };
        reader.readAsDataURL(file);
      } else {
        await sendEmail();
      }
    });
  }

  /* === COOKIE BANNER === */
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookies = document.getElementById('accept-cookies');

  if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'block';
  }

  if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }
});
