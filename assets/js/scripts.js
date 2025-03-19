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

  const navigateCarousel = (direction) => {
    const activeCarousel = sections[activeSectionIndex].querySelector('.carousel');
    if (!activeCarousel) return;

    const cards = Array.from(activeCarousel.querySelectorAll('.card'));
    activeCarouselIndex = (activeCarouselIndex + direction + cards.length) % cards.length;
    showCard(activeCarousel, activeCarouselIndex);
  };

  const navigateSection = (direction) => {
    activeSectionIndex = (activeSectionIndex + direction + sections.length) % sections.length;
    showSection(activeSectionIndex);
    activeCarouselIndex = 0; // Reset carousel index when switching sections
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      navigateCarousel(1); // Next card
    } else if (e.key === 'ArrowLeft') {
      navigateCarousel(-1); // Previous card
    } else if (e.key === 'ArrowDown') {
      navigateSection(1); // Next section
    } else if (e.key === 'ArrowUp') {
      navigateSection(-1); // Previous section
    }
  });

  // Initialize
  showSection(activeSectionIndex);
  showCard(sections[activeSectionIndex].querySelector('.carousel'), activeCarouselIndex);
});