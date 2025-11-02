document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  // === HEADER BEHAVIOR ===
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 60);

    // Scroll Spy
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // === SMOOTH SCROLL on CLICK ===
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
    });
  });

  // === FADE IN SECTIONS ===
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));
});
