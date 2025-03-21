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
      if (!carousel) return;
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
      showCard(sections[activeSectionIndex].querySelector('.carousel'), activeCarouselIndex);
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

  // Add touch and click navigation for carousels
  carousels.forEach(carousel => {
      let touchStartX = 0;

      // Click navigation for arrows
      const prevButton = carousel.querySelector('button[aria-label="Previous"]');
      const nextButton = carousel.querySelector('button[aria-label="Next"]');

      if (prevButton) {
          prevButton.addEventListener('click', () => {
              navigateCarousel(-1);
          });
      }

      if (nextButton) {
          nextButton.addEventListener('click', () => {
              navigateCarousel(1);
          });
      }

      // Touch swipe detection
      carousel.addEventListener('touchstart', (e) => {
          touchStartX = e.touches[0].clientX;
      });

      carousel.addEventListener('touchend', (e) => {
          const touchEndX = e.changedTouches[0].clientX;
          const deltaX = touchStartX - touchEndX;
          if (Math.abs(deltaX) > 50) { // Minimum swipe distance
              if (deltaX > 0) navigateCarousel(1); // Swipe left → next
              else navigateCarousel(-1); // Swipe right → previous
          }
      });
  });
});