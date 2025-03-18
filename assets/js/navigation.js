document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('section'));
    let currentIndex = 0;
  
    function focusSection(index) {
      sections.forEach((section, i) => {
        section.setAttribute('tabindex', i === index ? '0' : '-1');
        if (i === index) section.focus();
      });
      currentIndex = index;
    }
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        focusSection(Math.min(currentIndex + 1, sections.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusSection(Math.max(currentIndex - 1, 0));
      }
    });
  
    focusSection(0); // Initialize first section
  });