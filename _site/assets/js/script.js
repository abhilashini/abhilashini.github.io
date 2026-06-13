document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape" && window.location.hash.startsWith('#img-')) {
            window.location.hash = '#_';
        }
    });

    document.addEventListener('copy', (e) => {
        const selection = document.getSelection().toString();
        const pagelink = '\n\nRead more at: https://abhilashini.github.io/';
        e.clipboardData.setData('text/plain', selection + pagelink);
        e.preventDefault();
    });

    document.querySelectorAll('.section').forEach(section => {
        const hiddenTag = document.createElement('span');
        hiddenTag.style.display = 'none';
        hiddenTag.textContent = 'Original content by Abhilashini – https://abhilashini.github.io';
        section.appendChild(hiddenTag);
    });

    // --- Mermaid diagram conversion & rendering (article pages only) ---
    if (document.querySelector('.article-main')) {
        // convert .language-mermaid blocks to pure .mermaid divs
        document.querySelectorAll('.language-mermaid').forEach(function (el) {
            var div = document.createElement('div');
            div.className = 'mermaid';
            div.textContent = el.textContent.trim();
            el.parentNode.replaceChild(div, el);
        });

        if (typeof mermaid !== 'undefined') {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'neutral',
                flowchart: {
                    nodeSpacing: 50,  // Forces consistent horizontal space between nodes
                    rankSpacing: 50,  // Forces consistent vertical space between levels
                    padding: 20       // Gives the entire SVG breathing room
                },
                // Keep your existing themeCSS exactly as it is below:
                themeCSS: '.node rect, .node circle, .node ellipse, .node polygon, .node path { fill: #FCFBF8 !important; stroke: #dcd9d3 !important; stroke-width: 1px !important; } .edgePath .path { stroke: #8a8a8a !important; stroke-width: 1.2px !important; } .node text, .label text { fill: #4A4A4A !important; font-family: "Work Sans", sans-serif !important; font-size: 13px !important; } .edgeLabel { background-color: #FCFBF8 !important; } .edgeLabel span, .edgeLabel p { background-color: #FCFBF8 !important; }',
            });
            mermaid.run();
        }
    }

    const grid = document.querySelector('.grid');
    const cells = [...document.querySelectorAll('.grid .cell')];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        grid.classList.remove('rigid');
        return;
    }

    setTimeout(() => grid.classList.remove('rigid'), 1600);
    setTimeout(enableTracking, 3200);

    function enableTracking() {
        if (window.innerWidth <= 960) return;

        grid.classList.add('tracking');

        grid.addEventListener('mousemove', ({ clientX: mouseX, clientY: mouseY }) => {
            cells.forEach((cell, index) => {
                const rect = cell.getBoundingClientRect();
                const cellX = rect.left + rect.width / 2;
                const cellY = rect.top + rect.height / 2;

                const dx = mouseX - cellX;
                const dy = mouseY - cellY;

                const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);

                let px = 0;
                let py = 0;

                if (distance < 220) {
                    const force = ((220 - distance) / 220) ** 1.5;
                    px = -(dx / distance) * force * 40;
                    py = -(dy / distance) * force * 40;
                }

                const depth = ((index * 7) % 5) + 1;

                px += ((mouseX / innerWidth) - 0.5) * depth * 8;
                py += ((mouseY / innerHeight) - 0.5) * depth * 8;

                cell.style.setProperty('--mx', `${px}px`);
                cell.style.setProperty('--my', `${py}px`);
            });
        });

        grid.addEventListener('mouseleave', () => {
            cells.forEach(cell => {
                cell.style.setProperty('--mx', '0px');
                cell.style.setProperty('--my', '0px');
            });
        });
    }

    if (document.getElementById('filterPane')) initLibraryFilters();

    const bentoContainer = document.getElementById('page');
    const bentoScrollBtn = document.getElementById('bentoBackToTop');

    if (bentoContainer && bentoScrollBtn) {
        // Since #page is now the element scrolling, we listen directly to its offsets
        bentoContainer.addEventListener('scroll', function () {
            if (bentoContainer.scrollTop > 400) {
                bentoScrollBtn.classList.add('visible');
            } else {
                bentoScrollBtn.classList.remove('visible');
            }
        });

        // Smoothly transitions the container back to zero layout height
        bentoScrollBtn.addEventListener('click', function () {
            bentoContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});