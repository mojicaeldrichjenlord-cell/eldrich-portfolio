// Andrhea portfolio — accessible mobile menu and two-side brochure previews.
const toggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#primary-nav');

function closeMenu() {
  nav?.classList.remove('is-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open menu');
}
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();

// Show designed fallbacks until the actual uploaded JPGs have loaded.
document.querySelectorAll('.asset-image').forEach(img => {
  const sync = () => {
    const loaded = img.complete && img.naturalWidth > 0;
    img.classList.toggle('loaded', loaded);
    const btn = img.closest('.work-card')?.querySelector('[data-brochure-index]');
    if (btn) {
      btn.disabled = !loaded;
      btn.title = loaded ? 'Open full-size brochure' : 'Upload this brochure image to enable preview';
    }
  };
  img.addEventListener('load', sync);
  img.addEventListener('error', sync);
  sync();
});

// Display the selected front or back of the academic brochure.
const modal = document.querySelector('#brochure-dialog');
const fullImage = document.querySelector('#full-brochure');
const modalTitle = document.querySelector('#brochure-dialog-title');
document.querySelectorAll('[data-brochure-index]').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.work-card');
    const image = card?.querySelector('.brochure-img');
    if (!image?.naturalWidth || !modal?.showModal) return;
    fullImage.src = image.src;
    fullImage.alt = image.alt;
    modalTitle.textContent = button.dataset.brochureIndex === '0'
      ? 'DAVAO TOUR PACKAGE · FRONT SIDE'
      : 'SECRET PARADISE · BACK SIDE';
    modal.showModal();
  });
});
document.querySelector('#close-brochure')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', e => { if (e.target === modal) modal.close(); });
