document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const fadeElements = document.querySelectorAll(".fade-in");

  // Shrink header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });

  // Fade-in animation on scroll
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));
});
