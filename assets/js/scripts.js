// Initialize carousels
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const items = carousel.querySelectorAll('.carousel-item');
  const progress = carousel.querySelector('.carousel-progress');
  let currentIndex = 0;
  
  progress.style.setProperty('--total-items', items.length);
  progress.style.setProperty('--current-index', currentIndex);

  // Handle arrow keys
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      currentIndex = Math.min(currentIndex + 1, items.length - 1);
    } else if (e.key === 'ArrowLeft') {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
    items[currentIndex].focus();
    progress.style.setProperty('--current-index', currentIndex);
  });
});

// Section observer for active state
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const title = document.querySelector(`[data-section="${entry.target.id}"]`);
    if (entry.isIntersecting) {
      title.classList.add('active');
    } else {
      title.classList.remove('active');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});