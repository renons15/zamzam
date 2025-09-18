// Minimal enhancements: mobile nav toggle, header on-scroll state, basic form honeypot handling
(function () {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const header = document.querySelector('.site-header');

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when clicking a link (useful on mobile)
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.closest('a')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header scrolled state
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 4) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Simple honeypot: prevent submission if hidden field is filled
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    const honeypot = form.querySelector('#company');
    if (honeypot && honeypot instanceof HTMLInputElement && honeypot.value.trim() !== '') {
      e.preventDefault();
      // Optionally inform user silently; bots will be blocked anyway
    }
  });
})();
