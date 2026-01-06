window.addEventListener('scroll', () => {
  const anchor = document.querySelector('.corner-anchor');
  if (anchor) {
    // Only move it once it's nearing the viewport
    const speed = 0.08; 
    const rect = anchor.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      const yOffset = window.pageYOffset * speed;
      anchor.style.transform = `translateY(${yOffset}px)`;
    }
  }
});