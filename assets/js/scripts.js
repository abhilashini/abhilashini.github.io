document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const sectionTitles = document.querySelectorAll('.section-title');
  const doodles = document.querySelectorAll('.doodle');
  const cards = document.querySelectorAll('.card');
  const carouselNav = document.querySelector('.carousel-nav');
  let currentCardIndex = 0;

  function showCard(index) {
      cards.forEach((card, i) => {
          card.classList.remove('active');
          if (i === index) {
              card.classList.add('active');
          }
      });
  }

  function nextCard() {
      currentCardIndex = (currentCardIndex + 1) % cards.length;
      showCard(currentCardIndex);
  }

  function prevCard() {
      currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
      showCard(currentCardIndex);
  }

  if (carouselNav) {
      const prevButton = document.createElement('button');
      prevButton.textContent = '❮';
      prevButton.addEventListener('click', prevCard);

      const nextButton = document.createElement('button');
      nextButton.textContent = '❯';
      nextButton.addEventListener('click', nextCard);

      carouselNav.appendChild(prevButton);
      carouselNav.appendChild(nextButton);

      // Keyboard Navigation
      document.addEventListener('keydown', function(event) {
          if (event.key === 'ArrowLeft') {
              prevCard();
          } else if (event.key === 'ArrowRight') {
              nextCard();
          }
      });
  }

  function handleIntersection(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target); // Unobserve after making active
          } else {
              entry.target.classList.remove('active'); // Remove active when not in view.
          }
      });
  }

  const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
  });

  sections.forEach(section => {
      observer.observe(section);
  });

  // Touch Navigation
  let touchStartX = 0;
  let touchEndX = 0;

  function handleTouchStart(event) {
      touchStartX = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
      touchEndX = event.changedTouches[0].clientX;
      handleSwipeGesture();
  }

  function handleSwipeGesture() {
      const swipeThreshold = 50; // Adjust threshold as needed
      const deltaX = touchEndX - touchStartX;

      if (deltaX > swipeThreshold) {
          prevCard(); // Swipe right
      } else if (deltaX < -swipeThreshold) {
          nextCard(); // Swipe left
      }
  }

  const carousel = document.querySelector('.carousel');
  if (carousel) {
      carousel.addEventListener('touchstart', handleTouchStart);
      carousel.addEventListener('touchend', handleTouchEnd);
  }
});