document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('.section'));
  const carousels = document.querySelectorAll('.carousel');

  let activeSectionIndex = 0; // Initialize to the first section

  const showSection = (index) => {
    sections.forEach((section, i) => {
      section.classList.toggle('active', i === index);
    });
  };

  // Hover-based section activation (applies to all sections, not just carousel ones)
  sections.forEach((section, index) => {
    section.addEventListener('mouseenter', () => {
      if (index !== activeSectionIndex) {
        showSection(index);
        activeSectionIndex = index;
      }
    });
    section.addEventListener('touchstart', () => {
      if (index !== activeSectionIndex) {
        showSection(index);
        activeSectionIndex = index;
      }
    });
  });

  document.addEventListener('copy', (e) => {
    const selection = document.getSelection().toString();
    const pagelink = '\n\nRead more at: https://abhilashini.github.io/';
    const copytext = selection + pagelink;

    e.clipboardData.setData('text/plain', copytext);
    e.preventDefault();
  });

  document.addEventListener('contextmenu', event => event.preventDefault());

  document.body.style.userSelect = "none";

  document.querySelectorAll('.section').forEach(section => {
    const hiddenTag = document.createElement('span');
    hiddenTag.style.display = 'none';
    hiddenTag.textContent = 'Original content by Abhilashini – https://abhilashini.github.io';
    section.appendChild(hiddenTag);
  });


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

    // Hover-based section activation
    carousel.addEventListener('mouseenter', () => {
      const currentSection = carousel.closest('.section');
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex !== -1 && currentSectionIndex !== activeSectionIndex) {
        showSection(currentSectionIndex);
        activeSectionIndex = currentSectionIndex;
      }
    });

  });
});

// ADDED FOR TAILWIND CSS
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all carousels
  document.querySelectorAll('.carousel-container').forEach(carousel => {
    const carouselId = carousel.id;
    const contentEl = carousel.querySelector('.carousel-content');
    const dots = carousel.querySelectorAll('.dot');
    const items = carousel.querySelectorAll('.carousel-item');
    const sectionColor = carousel.dataset.sectionColor;
    const originalContent = contentEl.innerHTML;

    let currentIndex = 0;
    let isAnimating = false;

    // Navigation function
    function navigateTo(newIndex) {
      if (isAnimating) return;

      // Handle infinite loop
      const totalItems = dots.length;
      if (newIndex >= totalItems) newIndex = 0;
      if (newIndex < 0) newIndex = totalItems - 1;

      isAnimating = true;

      // Parallax exit animation
      contentEl.style.transform = 'translateY(10px)';
      contentEl.style.opacity = '0';

      setTimeout(() => {
        // Update content
        if (newIndex === 0) {
          contentEl.innerHTML = originalContent;
        } else {
          const itemIndex = newIndex - 1;
          if (items[itemIndex]) {
            contentEl.innerHTML = items[itemIndex].innerHTML;
          }
        }

        // Parallax enter animation (before making visible)
        contentEl.style.transform = 'translateY(-10px)';
        contentEl.style.opacity = '0';

        // Force reflow to enable transition
        void contentEl.offsetHeight;

        // Animate in
        contentEl.style.transform = 'translateY(0)';
        contentEl.style.opacity = '1';

        // Update dots
        dots.forEach((dot, i) => {
          dot.style.backgroundColor = i === newIndex ? sectionColor : 'rgba(209,213,219,0.5)';
          dot.style.transform = i === newIndex ? 'scale(1.5)' : 'scale(1)';
        });

        currentIndex = newIndex;
        isAnimating = false;
      }, 150);
    }

    // Dot click handlers
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(dot.dataset.index);
        navigateTo(index);
      });
    });

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        navigateTo(currentIndex + (e.key === 'ArrowDown' ? 1 : -1));
      }
    });

    // Wheel navigation
    carousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      navigateTo(currentIndex + (e.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    // Touch navigation
    let touchStartY = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > 10) {
        navigateTo(currentIndex + (deltaY > 10 ? 1 : -1));
      }
    }, { passive: false });

    // Make carousel focusable
    carousel.tabIndex = 0;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.section-toggle-link');
  const sections = document.querySelectorAll('.section-block');
  const headings = document.querySelectorAll('h2.section-heading');

  function showSection(sectionId, clickedLink) {
    sections.forEach(section => {
      const isTarget = section.dataset.section === sectionId;
      section.classList.toggle('hidden', !isTarget);
      section.classList.toggle('section-visible', isTarget); // NEW: triggers fade-in
    });

    links.forEach(link => {
      link.classList.remove('active');
      const mark = link.querySelector('mark.highlight');
      mark?.classList.remove('active');
    });

    clickedLink.classList.add('active');
    const clickedMark = clickedLink.querySelector('mark.highlight');
    clickedMark?.classList.add('active');

    const linkColor = clickedLink.getAttribute('data-color');
    headings.forEach(h => {
      h.classList.toggle('highlight-active', h.getAttribute('data-color') === linkColor);
    });
  }

  // Set up click handlers
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      showSection(targetId, link);
    });
  });

  // Initial load
  const defaultLink = document.querySelector('.section-toggle-link[href="#focus"]');
  if (defaultLink) {
    showSection('focus', defaultLink);
  }
});
