document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('.section'));
  const carousels = document.querySelectorAll('.carousel');

  let activeSectionIndex = 0; // Initialize to the first section

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

  const navigateCarousel = (carousel, direction) => {
      if (!carousel) return;

      const cards = Array.from(carousel.querySelectorAll('.card'));
      let carouselIndex = cards.findIndex(card => card.classList.contains('active'));
      carouselIndex = (carouselIndex + direction + cards.length) % cards.length;
      showCard(carousel, carouselIndex);
  };

  const navigateSection = (direction) => {
      activeSectionIndex = (activeSectionIndex + direction + sections.length) % sections.length;
      showSection(activeSectionIndex);
      showCard(sections[activeSectionIndex].querySelector('.carousel'), 0);
  };

  document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
          navigateCarousel(sections[activeSectionIndex].querySelector('.carousel'), 1);
      } else if (e.key === 'ArrowLeft') {
          navigateCarousel(sections[activeSectionIndex].querySelector('.carousel'), -1);
      } else if (e.key === 'ArrowDown') {
          navigateSection(1);
      } else if (e.key === 'ArrowUp') {
          navigateSection(-1);
      }
  });

  // Initialize - first section active
  showSection(activeSectionIndex);
  showCard(sections[activeSectionIndex].querySelector('.carousel'), 0);

  // Add touch and click navigation for carousels
  carousels.forEach(carousel => {
      let touchStartX = 0;

      // Click navigation for arrows
      const prevButton = carousel.querySelector('button[aria-label="Previous"]');
      const nextButton = carousel.querySelector('button[aria-label="Next"]');

      if (prevButton) {
          prevButton.addEventListener('click', () => {
              navigateCarousel(carousel, -1);
              // Mark the current section active
              const currentSection = carousel.closest('.section');
              const currentSectionIndex = sections.indexOf(currentSection);
              showSection(currentSectionIndex);
              activeSectionIndex = currentSectionIndex;
          });
      }

      if (nextButton) {
          nextButton.addEventListener('click', () => {
              navigateCarousel(carousel, 1);
              // Mark the current section active
              const currentSection = carousel.closest('.section');
              const currentSectionIndex = sections.indexOf(currentSection);
              showSection(currentSectionIndex);
              activeSectionIndex = currentSectionIndex;
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
              navigateCarousel(carousel, deltaX > 0 ? 1 : -1);

              // Mark the current section active
              const currentSection = carousel.closest('.section');
              const currentSectionIndex = sections.indexOf(currentSection);
              showSection(currentSectionIndex);
              activeSectionIndex = currentSectionIndex;
          }
      });
  });
});