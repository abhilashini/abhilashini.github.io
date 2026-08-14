(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('bentoContainer');
        if (!container) return;

        const blocks = Array.from(container.querySelectorAll('.heuristic-block'));
        if (blocks.length === 0) return;

        // Inject the DOM element for the Expand Tooltip so we can use FontAwesome cleanly
        blocks.forEach(block => {
            if (!block.querySelector('.bento-expand-hint')) {
                const hint = document.createElement('div');
                hint.className = 'bento-expand-hint';
                hint.innerHTML = '<i class="fa-solid fa-up-right-and-down-left-from-center"></i><span>Expand</span>';
                block.appendChild(hint);
            }
        });

        /* ====================================================================
           1. DETERMINISTIC MAGAZINE OPTIMIZER & ORPHAN CENTERING
        ==================================================================== */
        
        const getActiveCols = () => {
            const w = window.innerWidth;
            if (w <= 500) return 1;
            if (w <= 800) return 2;
            if (w <= 1100) return 3;
            return 4;
        };

        const generateCacheKey = (items, cols) => {
            // Automatically busts cache if you add/remove/change items in Jekyll
            const classes = items.map(el => el.className.match(/layout-[0-9]x[0-9]/)?.[0] || '1x1').join('');
            return `bento_${items.length}_c${cols}_${classes}`; 
        };

        const applyLayoutOptimizer = () => {
            const cols = getActiveCols();
            
            blocks.forEach(b => b.classList.remove('orphan-centered'));

            if (cols === 1) {
                blocks.forEach(b => container.appendChild(b));
                return;
            }

            const cacheKey = generateCacheKey(blocks, cols);
            const cachedOrder = sessionStorage.getItem(cacheKey);
            let finalOrder = [];

            if (cachedOrder) {
                const order = JSON.parse(cachedOrder);
                order.forEach(index => {
                    const block = blocks.find(b => b.dataset.index == index);
                    if (block) {
                        finalOrder.push(block);
                        container.appendChild(block);
                    }
                });
            } else {
                const squares = blocks.filter(b => !b.className.match(/layout-2x2|layout-2x1|layout-1x2/));
                const wides = blocks.filter(b => b.classList.contains('layout-2x1'));
                const talls = blocks.filter(b => b.classList.contains('layout-1x2'));
                const larges = blocks.filter(b => b.classList.contains('layout-2x2'));

                let alignLeft = true; 

                while (squares.length > 0 || wides.length > 0 || talls.length > 0 || larges.length > 0) {
                    if (alignLeft) {
                        if (wides.length > 0) finalOrder.push(wides.shift());
                        if (talls.length > 0) finalOrder.push(talls.shift());
                        if (squares.length > 0) finalOrder.push(squares.shift());
                        if (squares.length > 0) finalOrder.push(squares.shift());
                    } else {
                        if (squares.length > 0) finalOrder.push(squares.shift());
                        if (squares.length > 0) finalOrder.push(squares.shift());
                        if (wides.length > 0) finalOrder.push(wides.shift());
                        if (larges.length > 0) finalOrder.push(larges.shift());
                    }
                    alignLeft = !alignLeft; 
                }

                finalOrder.forEach(b => container.appendChild(b));
                const indices = finalOrder.map(b => b.dataset.index);
                sessionStorage.setItem(cacheKey, JSON.stringify(indices));
            }

            // --- Robust Visual Orphan Detection ---
            requestAnimationFrame(() => {
                let maxBottom = 0;
                const rects = finalOrder.map(b => {
                    const r = b.getBoundingClientRect();
                    if (r.bottom > maxBottom) maxBottom = r.bottom;
                    return { block: b, bottom: r.bottom };
                });
                
                const bottomBlocks = rects.filter(r => Math.abs(r.bottom - maxBottom) < 10);
                
                if (bottomBlocks.length === 1) {
                    bottomBlocks[0].block.classList.add('orphan-centered');
                }
            });
        };

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(applyLayoutOptimizer, 250);
        });
        
        applyLayoutOptimizer();


        /* ====================================================================
           2. DYNAMIC CAROUSEL MODAL (Infinite Loop)
        ==================================================================== */
        
        // Controls are now bundled cleanly inside the container
        const modalHTML = `
            <div class="bento-modal" id="bentoModal" role="dialog" aria-modal="true">
                <button class="bento-modal-close" id="bentoClose" aria-label="Close">×</button>
                <div class="bento-modal-container">
                    <div class="bento-modal-inner" id="bentoModalInner"></div>
                    <div class="bento-modal-controls">
                        <button class="bento-nav-btn prev" id="bentoPrev" aria-label="Previous">
                            <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <span id="bentoCounter">1 / n</span>
                        <button class="bento-nav-btn next" id="bentoNext" aria-label="Next">
                            <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('bentoModal');
        const modalInner = document.getElementById('bentoModalInner');
        const closeBtn = document.getElementById('bentoClose');
        const prevBtn = document.getElementById('bentoPrev');
        const nextBtn = document.getElementById('bentoNext');
        const counter = document.getElementById('bentoCounter');

        let currentActiveBlocks = [];
        let currentVisualIndex = 0;

        const renderModalContent = () => {
            const block = currentActiveBlocks[currentVisualIndex];
            if (!block) return;

            modalInner.innerHTML = block.innerHTML;
            modalInner.className = 'bento-modal-inner';
            const typeClass = Array.from(block.classList).find(c => c.startsWith('type-'));
            if (typeClass) modalInner.classList.add(typeClass);

            // Hide the expand hint inside the modal view
            const hint = modalInner.querySelector('.bento-expand-hint');
            if (hint) hint.style.display = 'none';

            const clonedMedia = modalInner.querySelector('.heuristic-media');
            if (clonedMedia) clonedMedia.style.pointerEvents = 'none';

            counter.textContent = `${currentVisualIndex + 1} / ${currentActiveBlocks.length}`;
        };

        const openModal = (block) => {
            currentActiveBlocks = Array.from(container.querySelectorAll('.heuristic-block'));
            currentVisualIndex = currentActiveBlocks.indexOf(block);
            renderModalContent();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        container.addEventListener('click', (e) => {
            const block = e.target.closest('.heuristic-block');
            if (block) openModal(block);
        });

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('bento-modal-container')) closeModal();
        });

        prevBtn.addEventListener('click', () => {
            currentVisualIndex = (currentVisualIndex - 1 + currentActiveBlocks.length) % currentActiveBlocks.length;
            renderModalContent();
        });

        nextBtn.addEventListener('click', () => {
            currentVisualIndex = (currentVisualIndex + 1) % currentActiveBlocks.length;
            renderModalContent();
        });

        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') {
                currentVisualIndex = (currentVisualIndex - 1 + currentActiveBlocks.length) % currentActiveBlocks.length;
                renderModalContent();
            }
            if (e.key === 'ArrowRight') {
                currentVisualIndex = (currentVisualIndex + 1) % currentActiveBlocks.length;
                renderModalContent();
            }
        });
    });
})();