// === INTERACTIONS & HEADER BEHAVIOR ===
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Header shrink + transparency on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Highlight active section in nav
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
