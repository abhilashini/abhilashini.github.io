document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const cards = Array.from(carousel.querySelectorAll('.card'));
    const prevButton = carousel.querySelector('.carousel-nav button:first-child');
    const nextButton = carousel.querySelector('.carousel-nav button:last-child');
    let activeIndex = 0;

    const showCard = (index) => {
      cards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });
    };

    prevButton.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      showCard(activeIndex);
    });

    nextButton.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % cards.length;
      showCard(activeIndex);
    });

    // Show the first card initially
    showCard(activeIndex);
  });
});