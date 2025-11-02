document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const navLinks = document.querySelectorAll(".nav-link");

  // Header shrink + transparency on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section");
  const options = { threshold: 0.6 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, options);

  sections.forEach((section) => observer.observe(section));
});
