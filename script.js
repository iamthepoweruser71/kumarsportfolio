document.addEventListener("DOMContentLoaded", () => {
  // --- Header Scroll Behavior ---
  const header = document.getElementById("main-header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 200) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
    lastScrollY = window.scrollY;
  });

  // --- Active Section Highlight ---
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80;
      if (pageYOffset >= sectionTop) current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // --- Counter Animation ---
  const counters = document.querySelectorAll(".counter");
  const speed = 150;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const update = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(update, 30);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  };

  // Trigger counters when visible
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector(".hero-stats");
  if (statsSection) observer.observe(statsSection);

  // --- Reveal Animations ---
  ScrollReveal().reveal(".hero-text", { origin: "left", distance: "50px", duration: 1000, delay: 200 });
  ScrollReveal().reveal(".hero-photo", { origin: "right", distance: "50px", duration: 1000, delay: 400 });
});
