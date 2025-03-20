document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('.section'));
  const carousels = document.querySelectorAll('.carousel');

  let activeSectionIndex = 0;
  let activeCarouselIndex = 0;

  const showSection = (index) => {
    sections.forEach((section, i) => {
      section.classList.toggle('active', i === index);
    });
  };

const showCard = (carousel, index) => {
  const cards = Array.from(carousel.querySelectorAll('.card'));
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
};

// Define the navigateCarousel function
function navigateCarousel(carousel, direction) {
  const cards = Array.from(carousel.querySelectorAll('.card'));
  const activeIndex = cards.findIndex(card => card.classList.contains('active'));

  if (direction === 1) {
    // Next card
    const nextIndex = (activeIndex + 1) % cards.length;
    cards[activeIndex].classList.remove('active');
    cards[nextIndex].classList.add('active');
  } else if (direction === -1) {
    // Previous card
    const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
    cards[activeIndex].classList.remove('active');
    cards[prevIndex].classList.add('active');
  }
}

// Add touch swipe detection
document.querySelectorAll('.carousel').forEach(carousel => {
  let touchStartX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 50) { // Minimum swipe distance
      if (deltaX > 0) navigateCarousel(carousel, 1); // Swipe left → next
      else navigateCarousel(carousel, -1); // Swipe right → previous
    }
  });
});