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
  let activeCarousel = null;

  // Handle global keydown
  document.addEventListener('keydown', (e) => {
    if (!activeCarousel) return;

    const track = activeCarousel.querySelector('.carousel-track');
    const counter = activeCarousel.querySelector('.carousel-counter');
    const prevBtn = activeCarousel.querySelector('.carousel-prev');
    const nextBtn = activeCarousel.querySelector('.carousel-next');
    const totalSlides = track.children.length;

    let currentIndex = Math.round(track.scrollLeft / track.offsetWidth);

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      currentIndex = Math.max(0, currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
    } else {
      return;
    }

    track.scrollTo({
      left: track.children[currentIndex].offsetLeft,
      behavior: 'smooth'
    });
    counter.textContent = `${currentIndex + 1}/${totalSlides}`;
  });

  // Setup each carousel
  document.querySelectorAll('[id^="carousel-"]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const counter = carousel.querySelector('.carousel-counter');
    const totalSlides = track.children.length;
    let currentIndex = 0;

    const updateCounter = () => {
      counter.textContent = `${currentIndex + 1}/${totalSlides}`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === totalSlides - 1;
    };

    const goToSlide = (index) => {
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
      track.scrollTo({
        left: track.children[currentIndex].offsetLeft,
        behavior: 'smooth'
      });
      updateCounter();
    };

    // Activate this carousel
    const activate = () => {
      activeCarousel = carousel;
    };

    const deactivate = () => {
      if (activeCarousel === carousel) {
        activeCarousel = null;
      }
    };

    // Track hover and focus
    carousel.addEventListener('mouseenter', activate);
    carousel.addEventListener('mouseleave', deactivate);
    carousel.addEventListener('focusin', activate);
    carousel.addEventListener('focusout', deactivate);

    // Nav buttons
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Scroll tracking
    track.addEventListener('scroll', () => {
      const newIndex = Math.round(track.scrollLeft / track.offsetWidth);
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateCounter();
      }
    });

    updateCounter();
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