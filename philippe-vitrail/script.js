const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const box = document.querySelector('.lightbox');
const boxImage = box.querySelector('img');
const boxTitle = box.querySelector('p');
document.querySelectorAll('.work-card').forEach(card => card.addEventListener('click', () => {
  boxImage.src = card.dataset.image;
  boxImage.alt = card.dataset.title;
  boxTitle.textContent = card.dataset.title;
  box.showModal();
}));
box.querySelector('.lightbox-close').addEventListener('click', () => box.close());
box.addEventListener('click', event => { if (event.target === box) box.close(); });

// Filter gallery cards locally so each category displays its own artwork.
document.querySelectorAll('.archive-links').forEach(group => {
  const buttons = group.querySelectorAll('[data-filter]');
  const section = group.closest('.gallery');
  if (!section) return;
  const cards = section.querySelectorAll('.work-card');
  const empty = section.querySelector('.gallery-empty');
  buttons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible++;
    });
    empty.hidden = visible > 0;
    section.scrollIntoView({behavior: 'smooth', block: 'start'});
  }));
});
