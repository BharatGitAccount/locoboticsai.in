const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = [...document.querySelectorAll('.reveal')];

// Progressive enhancement: content is visible by default. Animation classes
// are added only after JavaScript is running, and a safety timer guarantees
// that no section can remain hidden if an observer fails unexpectedly.
if (!reducedMotion && 'IntersectionObserver' in window) {
  const showEverything = () => revealItems.forEach((item) => {
    item.classList.add('visible');
    item.classList.remove('reveal-pending');
  });

  try {
    revealItems.forEach((item) => item.classList.add('reveal-pending'));
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }),
      { threshold: 0.08, rootMargin: '0px 0px -24px' },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
    window.setTimeout(showEverything, 4000);
  } catch (error) {
    console.warn('Optional reveal animation disabled.', error);
    showEverything();
  }
}

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = () => {
  menuButton?.classList.remove('active');
  menuButton?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.remove('open');
  mobileMenu?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

menuButton?.addEventListener('click', () => {
  const isOpen = !mobileMenu?.classList.contains('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileMenu?.classList.toggle('open', isOpen);
  mobileMenu?.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  const cursorLight = document.querySelector('.cursor-light');
  window.addEventListener('pointermove', (event) => {
    if (!cursorLight) return;
    cursorLight.style.left = `${event.clientX}px`;
    cursorLight.style.top = `${event.clientY}px`;
  }, { passive: true });
}
