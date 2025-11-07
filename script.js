document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const header = document.getElementById("main-header");
  const metricCards = document.querySelectorAll(".metric-card");
  let metricsAnimated = false;

  // Smooth scrolling
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
      navLinks.forEach((lnk) => lnk.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Header shrink on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) header.classList.add("shrink");
    else header.classList.remove("shrink");
  });

  // Fade-in and metric animation
  const fadeElements = document.querySelectorAll(".fade-in");

  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;
    fadeElements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add("visible");
    });

    const intro = document.querySelector("#intro");
    if (!metricsAnimated && intro.getBoundingClientRect().top < trigger) {
      metricCards.forEach((card) => (card.style.animationPlayState = "running"));
      metricsAnimated = true;
    }
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});
