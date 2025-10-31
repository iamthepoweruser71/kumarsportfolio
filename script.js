document.addEventListener('DOMContentLoaded', () => {
// === HEADER AUTO-HIDE + SCROLL EFFECT ===
const header = document.getElementById('main-header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

```
if (currentScroll > 50) header.classList.add('scrolled');
else header.classList.remove('scrolled');

if (currentScroll > lastScrollTop && currentScroll > 120)
  header.classList.add('header-hidden');
else header.classList.remove('header-hidden');

lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
```

});

// === ACTIVE LINK ON CLICK ===
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
link.addEventListener('click', () => {
navLinks.forEach(l => l.classList.remove('active'));
link.classList.add('active');
});
});

// === MOBILE MENU TOGGLE ===
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-links');
if (menuToggle && navMenu) {
menuToggle.addEventListener('click', () => {
navMenu.classList.toggle('open');
});
navLinks.forEach(link => {
link.addEventListener('click', () => navMenu.classList.remove('open'));
});
}

// === SCROLLSPY FUNCTIONALITY ===
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
let scrollPos = window.scrollY + 150;
sections.forEach(section => {
if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href').substring(1) === section.id) link.classList.add('active');
});
}
});
});

// === BACK TO TOP BUTTON ===
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
window.addEventListener('scroll', () => {
backToTop.classList.toggle('show', window.scrollY > 300);
});
backToTop.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});
}

// === SCROLL ANIMATIONS ===
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (!entry.isIntersecting) return;
entry.target.classList.add('visible');
observer.unobserve(entry.target);
});
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));
});
