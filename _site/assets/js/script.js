(function () {
    'use strict';

    const getHeaderHeight = () => document.querySelector('.header')?.offsetHeight || 80;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && window.location.hash.startsWith('#img-')) {
            window.location.hash = '#_';
        }
    });

    document.addEventListener('copy', (e) => {
        const selection = document.getSelection().toString();
        if (selection) {
            e.clipboardData.setData('text/plain', selection + '\n\nRead more at: https://abhilashini.github.io/');
            e.preventDefault();
        }
    });

    document.querySelectorAll('.section').forEach(section => {
        const watermark = document.createElement('span');
        watermark.style.display = 'none';
        watermark.textContent = 'Original content by Abhilashini – https://abhilashini.github.io';
        section.appendChild(watermark);
    });

    const articleMain = document.querySelector('.article-main');
    if (articleMain && typeof mermaid !== 'undefined') {
        // Convert .language-mermaid blocks to .mermaid divs
        document.querySelectorAll('.language-mermaid').forEach(el => {
            const div = document.createElement('div');
            div.className = 'mermaid';
            div.textContent = el.textContent.trim();
            el.parentNode.replaceChild(div, el);
        });

        mermaid.initialize({
            startOnLoad: false,
            theme: 'neutral',
            flowchart: { nodeSpacing: 50, rankSpacing: 50, padding: 20 },
            themeCSS: `
                .node rect, .node circle, .node ellipse, .node polygon, .node path { fill: #FCFBF8 !important; stroke: #dcd9d3 !important; stroke-width: 1px !important; }
                .edgePath .path { stroke: #8a8a8a !important; stroke-width: 1.2px !important; }
                .node text, .label text { fill: #4A4A4A !important; font-family: "Work Sans", sans-serif !important; font-size: 13px !important; }
                .edgeLabel { background-color: #FCFBF8 !important; }
                .edgeLabel span, .edgeLabel p { background-color: #FCFBF8 !important; }
            `
        });
        mermaid.run();
    }

    const grid = document.querySelector('.grid');
    if (grid) {
        const cells = [...document.querySelectorAll('.grid .cell')];
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            grid.classList.remove('rigid');
        } else {
            setTimeout(() => grid.classList.remove('rigid'), 1600);
            setTimeout(() => {
                if (window.innerWidth <= 960) return;
                grid.classList.add('tracking');

                const onMouseMove = ({ clientX: mouseX, clientY: mouseY }) => {
                    cells.forEach((cell, idx) => {
                        const rect = cell.getBoundingClientRect();
                        const cellX = rect.left + rect.width / 2;
                        const cellY = rect.top + rect.height / 2;
                        const dx = mouseX - cellX;
                        const dy = mouseY - cellY;
                        const distance = Math.hypot(dx, dy) || 1;

                        let px = 0, py = 0;
                        if (distance < 220) {
                            const force = ((220 - distance) / 220) ** 1.5;
                            px = -(dx / distance) * force * 40;
                            py = -(dy / distance) * force * 40;
                        }
                        const depth = ((idx * 7) % 5) + 1;
                        px += ((mouseX / innerWidth) - 0.5) * depth * 8;
                        py += ((mouseY / innerHeight) - 0.5) * depth * 8;

                        cell.style.setProperty('--mx', `${px}px`);
                        cell.style.setProperty('--my', `${py}px`);
                    });
                };

                const onMouseLeave = () => {
                    cells.forEach(cell => {
                        cell.style.setProperty('--mx', '0px');
                        cell.style.setProperty('--my', '0px');
                    });
                };

                grid.addEventListener('mousemove', onMouseMove);
                grid.addEventListener('mouseleave', onMouseLeave);
            }, 3200);
        }
    }

    if (document.getElementById('filterPane')) {
        // Assume initLibraryFilters is defined globally (in another file)
        if (typeof initLibraryFilters === 'function') initLibraryFilters();
    }

    if (articleMain) {
        // --- TOC generation (if .has-toc present) ---
        const tocList = document.getElementById('tocList');
        const hasTocClass = document.querySelector('.has-toc');
        if (tocList && hasTocClass) {
            const headings = articleMain.querySelectorAll('h2');
            headings.forEach((h2, idx) => {
                if (!h2.id) h2.id = `section-${idx}`;
                const li = document.createElement('li');
                li.innerHTML = `<a href="#${h2.id}">${h2.textContent}</a>`;
                tocList.appendChild(li);
            });
        }

        const tocSidebar = document.querySelector('.toc-sidebar');
        const articleTitle = articleMain.querySelector('h1');
        if (tocSidebar && articleTitle) {
            const alignToc = () => {
                const rect = articleTitle.getBoundingClientRect();
                const targetTop = rect.top + window.scrollY;
                const headerHeight = getHeaderHeight();
                tocSidebar.style.top = `${Math.max(targetTop, headerHeight - 10)}px`;
            };
            alignToc();
            window.addEventListener('resize', alignToc);
            window.addEventListener('load', alignToc);
        }

        const tocLinks = document.querySelectorAll('.toc-list a');
        if (tocLinks.length) {
            const headerHeight = getHeaderHeight();
            tocLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        const offsetPos = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
                        window.scrollTo({ top: offsetPos, behavior: 'smooth' });
                        history.pushState(null, null, `#${targetId}`);
                    }
                });
            });
        }

        const progressBar = document.getElementById('progressBar');
        const siteHeader = document.querySelector('.header');
        if (progressBar) {
            const updateProgress = () => {
                const headerH = siteHeader ? siteHeader.offsetHeight : 0;
                progressBar.style.top = `${headerH}px`;
                const rect = articleMain.getBoundingClientRect();
                const scrollable = rect.height - window.innerHeight + headerH;
                let progress = 0;
                if (scrollable > 0) {
                    progress = Math.min(1, Math.max(0, -(rect.top - headerH) / scrollable));
                }
                progressBar.style.setProperty('--progress-width', `${progress * 100}%`);
            };
            updateProgress();
            window.addEventListener('scroll', updateProgress, { passive: true });
            window.addEventListener('resize', updateProgress);
        }
    }

    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        const pageContainer = document.getElementById('page');
        const scroller = (pageContainer && getComputedStyle(pageContainer).overflowY === 'auto') ? pageContainer : window;

        const updateBtn = () => {
            const scrollTop = scroller === window ? window.scrollY : scroller.scrollTop;
            backBtn.classList.toggle('visible', scrollTop > 400);
        };

        scroller.addEventListener('scroll', updateBtn, { passive: true });
        updateBtn();

        backBtn.addEventListener('click', () => {
            scroller.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const modalOverlay = document.getElementById('modalOverlay');
const modalContainer = document.querySelector('#modalOverlay .modal-container');
const modalContent = document.getElementById('modalContent');

const modalData = {
  work: {
    html: `
      <div class="work-timeline">
        <div class="work-item">
          <div class="work-year">2023–present</div>
          <h3 class="work-title">Senior Systems Designer</h3>
          <div class="work-company">Studio XYZ · Berlin</div>
          <p class="work-desc">Lead cross-disciplinary teams to design modular systems for cultural institutions. Develop design‑to‑code pipelines and research frameworks.</p>
        </div>
        <div class="work-item">
          <div class="work-year">2020–2023</div>
          <h3 class="work-title">Researcher & Designer</h3>
          <div class="work-company">Institute of Complexity · Amsterdam</div>
          <p class="work-desc">Investigated feedback loops in socio‑technical systems. Published three peer‑reviewed papers and co‑created interactive data visualisations.</p>
        </div>
        <div class="work-item">
          <div class="work-year">2018–2020</div>
          <h3 class="work-title">Junior Analyst</h3>
          <div class="work-company">Data Structures Lab · Remote</div>
          <p class="work-desc">Built internal tools for data cleaning and visualisation. Collaborated on open‑source documentation projects.</p>
        </div>
      </div>
    `
  },
  colophon: {
    html: `
      <div class="colophon-content">
        <p>This site is set in <strong class="colophon-highlight">Fraunces</strong> (serif) and <strong class="colophon-highlight">Work Sans</strong> (sans-serif). The colour palette draws from Bauhaus: <span style="color:var(--color-orange);">orange</span>, <span style="color:var(--color-yellow-ui);">yellow</span>, <span style="color:var(--color-teal);">teal</span>, <span style="color:var(--color-purple-ui);">purple</span>, and charcoal on a warm off‑white background.</p>
        <p>The homepage’s interactive grid is a playful nod to modular systems. Diagrams are rendered with <strong class="colophon-highlight">Mermaid.js</strong>. Icons by Font Awesome. No tracking, no cookies — just content.</p>
        <p>Built with <strong class="colophon-highlight">Jekyll</strong> and hosted on GitHub Pages. The source code is available in the repository.</p>
        <p>Thanks for stopping by. – Abhilashini</p>
      </div>
    `
  }
};

function openModal(type) {
  if (!modalData[type]) return;
  modalContent.innerHTML = modalData[type].html;
  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close button (assuming you have a .modal-close inside modal container)
const closeBtn = document.querySelector('.modal-close');
if (closeBtn) closeBtn.addEventListener('click', closeModal);

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
});

// Click outside
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Attach to your links (data-modal="work" and data-modal="colophon")
document.querySelectorAll('.social-links a[data-modal]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const modalType = link.getAttribute('data-modal');
    openModal(modalType);
  });
});
})();