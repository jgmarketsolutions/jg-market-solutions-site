// JG Market Solutions — shared page behavior (2026-09-01 multi-page build).

// Scroll reveal — every .fade-up animates in once; nothing ever stays hidden
// (2.5s safety in case IntersectionObserver misses).
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
setTimeout(() => document.querySelectorAll('.fade-up:not(.visible)').forEach((el) => el.classList.add('visible')), 2500);

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Lightbox (any page with .lightbox + zoomable imgs)
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  const open = (src, alt) => { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.classList.add('open'); };
  const close = () => lightbox.classList.remove('open');
  document.querySelectorAll('.story-gallery img, .result-gallery img').forEach((img) => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });
  const x = document.getElementById('lightbox-close');
  if (x) x.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// Active nav link
const here = location.pathname.replace(/\/$/, '') || '/';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((a) => {
  const href = (a.getAttribute('href') || '').replace(/\/$/, '');
  if ((here === '/' && (href === '/' || href === 'index.html')) || (href && here.endsWith(href) && href !== '/')) {
    a.classList.add('active');
  }
});

// Footer year
document.querySelectorAll('.js-year').forEach((el) => { el.textContent = new Date().getFullYear(); });
