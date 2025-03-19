document.addEventListener('keydown', (e) => {
  const carousel = document.querySelector('.carousel');
  const cards = Array.from(carousel.querySelectorAll('.card'));
  const activeIndex = cards.findIndex(card => card.classList.contains('active'));

  if (e.key === 'ArrowRight') {
    const nextIndex = (activeIndex + 1) % cards.length;
    cards[activeIndex]?.classList.remove('active');
    cards[nextIndex]?.classList.add('active');
  } else if (e.key === 'ArrowLeft') {
    const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
    cards[activeIndex]?.classList.remove('active');
    cards[prevIndex]?.classList.add('active');
  }
});