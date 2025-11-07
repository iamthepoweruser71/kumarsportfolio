document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const header = document.getElementById("main-header");
  const metricCards = document.querySelectorAll(".metric-card");
  const themeToggle = document.getElementById("theme-toggle");
  let metricsAnimated = false;

  /* === Smooth Scrolling === */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      }
      navLinks.forEach((lnk) => lnk.classList.remove("active"));
      link.classList.add("active");
    });
  });

  /* === Header Shrink on Scroll === */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) header.classList.add("shrink");
    else header.classList.remove("shrink");
  });

  /* === Fade-in Animation === */
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

  /* === Theme Toggle (Light/Dark) === */
  const userPref = localStorage.getItem("theme");
  if (
    userPref === "dark" ||
    (!userPref && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "🌞";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "🌞" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
