document.addEventListener('DOMContentLoaded', function () {
    // 1. Navigation & UI Logic
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape" && window.location.hash.startsWith('#img-')) {
            window.location.hash = '#_';
        }
    });

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. Content Protection Logic
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

    // 3. Optimized Mermaid Loading
    const mermaidBlocks = document.querySelectorAll('.language-mermaid');
    if (mermaidBlocks.length > 0) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
        script.async = true;

        script.onload = function () {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'base',
                themeVariables: {
                    // Match these to your CSS variables for geometry calculations
                    fontFamily: 'var(--font-main)',
                    fontSize: '16px',
                    primaryColor: 'rgba(0, 85, 170, 0.04)',
                    edgeLabelBackground: '#FFD700',
                    lineColor: '#000000',
                    tertiaryColor: 'rgba(0, 85, 170, 0.04)'
                },
                flowchart: {
                    htmlLabels: true,
                    useMaxWidth: false,
                    padding: 30 // Critical for box-size calculation
                }
            });

            mermaidBlocks.forEach((block, i) => {
                const container = document.createElement('div');
                container.className = 'mermaid';
                container.id = `mermaid-diag-${i}`;
                container.textContent = block.innerText; // Use textContent for safety
                block.parentElement.replaceWith(container);
            });

            mermaid.run();
        };
        document.head.appendChild(script);
    }
});