document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.card');
  const carouselNavs = document.querySelectorAll('.carousel-nav'); // Select all navs
  let currentCardIndices = {}; // Track card index per section

  sections.forEach(section => {
      currentCardIndices[section.id] = 0; // Initialize card index for each section
  });

  function showCard(sectionId, index) {
      cards.forEach(card => {
          if (card.parentElement.parentElement.parentElement.id === sectionId) {
              card.classList.remove('active');
              if (parseInt(card.getAttribute('data-index')) === index) {
                  card.classList.add('active');
              }
          }
      });
  }

  function setupCarousel(section) {
      const carouselNav = section.querySelector('.carousel-nav');
      const sectionCards = Array.from(section.querySelectorAll('.card'));
      const sectionId = section.id;

      sectionCards.forEach((card, index) => {
          card.setAttribute('data-index', index);
      });

      if (carouselNav) {
          const prevButton = carouselNav.querySelector('button[aria-label="Previous"]');
          const nextButton = carouselNav.querySelector('button[aria-label="Next"]');

          if (prevButton && nextButton) {
              prevButton.addEventListener('click', () => {
                  currentCardIndices[sectionId] = (currentCardIndices[sectionId] - 1 + sectionCards.length) % sectionCards.length;
                  showCard(sectionId, currentCardIndices[sectionId]);
              });

              nextButton.addEventListener('click', () => {
                  currentCardIndices[sectionId] = (currentCardIndices[sectionId] + 1) % sectionCards.length;
                  showCard(sectionId, currentCardIndices[sectionId]);
              });
          }

          // Keyboard Navigation
          document.addEventListener('keydown', (event) => {
              if (document.querySelector(`#${sectionId}.active`)) {
                  if (event.key === 'ArrowLeft') {
                      currentCardIndices[sectionId] = (currentCardIndices[sectionId] - 1 + sectionCards.length) % sectionCards.length;
                      showCard(sectionId, currentCardIndices[sectionId]);
                  } else if (event.key === 'ArrowRight') {
                      currentCardIndices[sectionId] = (currentCardIndices[sectionId] + 1) % sectionCards.length;
                      showCard(sectionId, currentCardIndices[sectionId]);
                  }
              }
          });

          // Touch Navigation
          let touchStartX = 0;
          let touchEndX = 0;

          section.querySelector('.carousel').addEventListener('touchstart', (event) => {
              touchStartX = event.touches[0].clientX;
          });

          section.querySelector('.carousel').addEventListener('touchend', (event) => {
              touchEndX = event.changedTouches[0].clientX;
              const swipeThreshold = 50;
              const deltaX = touchEndX - touchStartX;

              if (deltaX > swipeThreshold) {
                  currentCardIndices[sectionId] = (currentCardIndices[sectionId] - 1 + sectionCards.length) % sectionCards.length;
                  showCard(sectionId, currentCardIndices[sectionId]);
              } else if (deltaX < -swipeThreshold) {
                  currentCardIndices[sectionId] = (currentCardIndices[sectionId] + 1) % sectionCards.length;
                  showCard(sectionId, currentCardIndices[sectionId]);
              }
          });
      }
  }

  sections.forEach(setupCarousel); // Setup each carousel

  function handleIntersection(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          } else {
              entry.target.classList.remove('active');
          }
      });
  }

  const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
  });

  sections.forEach(section => {
      observer.observe(section);
  });
});