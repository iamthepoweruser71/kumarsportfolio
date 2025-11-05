// Basic smooth scrolling and active link highlight
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");

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

  // Header transparency on scroll
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.style.background = "rgba(0, 60, 136, 0.9)";
      header.style.backdropFilter = "blur(4px)";
    } else {
      header.style.background = "#003c88";
      header.style.backdropFilter = "none";
    }
  });
});
