// Mobile nav toggle
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Simple scroll-fade trigger
const faders = document.querySelectorAll(".fade-in");
const options = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.style.animationDelay = "0.2s";
    observer.unobserve(entry.target);
  });
}, options);

faders.forEach((fader) => appearOnScroll.observe(fader));

// Parallax effect on all elements with .parallax class
const parallaxes = document.querySelectorAll(".parallax");
window.addEventListener("scroll", () => {
  const offset = window.pageYOffset;
  parallaxes.forEach((el) => {
    el.style.backgroundPositionY = `${offset * -0.3}px`;
  });
});
