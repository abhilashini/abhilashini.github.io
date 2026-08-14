(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('bentoContainer');
        const modal = document.getElementById('bentoModal');
        if (!container || !modal) return;

        const blocks = Array.from(container.querySelectorAll('.heuristic-block'));
        if (!blocks.length) return;

        blocks.forEach(block => {
            if (!block.querySelector('.bento-expand-hint')) {
                block.insertAdjacentHTML('beforeend', '<div class="bento-expand-hint"><span>Expand</span><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>');
            }
        });

        const getActiveCols = () => window.innerWidth <= 500 ? 1 : window.innerWidth <= 800 ? 2 : window.innerWidth <= 1100 ? 3 : 4;
        const getCacheKey = (cols) => `bento_${blocks.length}_c${cols}_` + blocks.map(b => b.className.match(/layout-[1-2]x[1-2]/)?.[0] || '1x1').join('');

        const applyLayout = () => {
            const cols = getActiveCols();
            blocks.forEach(b => b.classList.remove('orphan-centered'));

            if (cols === 1) {
                blocks.forEach(b => container.appendChild(b));
                return;
            }

            const key = getCacheKey(cols);
            const cached = sessionStorage.getItem(key);
            let finalOrder = [];

            if (cached) {
                JSON.parse(cached).forEach(idx => {
                    const block = blocks.find(b => b.dataset.index == idx);
                    if (block) {
                        finalOrder.push(block);
                        container.appendChild(block);
                    }
                });
            } else {
                const sq = blocks.filter(b => !b.className.match(/layout-[1-2]x[1-2]/));
                const w = blocks.filter(b => b.classList.contains('layout-2x1'));
                const t = blocks.filter(b => b.classList.contains('layout-1x2'));
                const l = blocks.filter(b => b.classList.contains('layout-2x2'));
                let left = true; 

                while (sq.length || w.length || t.length || l.length) {
                    if (left) {
                        if (w.length) finalOrder.push(w.shift());
                        if (t.length) finalOrder.push(t.shift());
                        if (sq.length) finalOrder.push(sq.shift());
                        if (sq.length) finalOrder.push(sq.shift());
                    } else {
                        if (sq.length) finalOrder.push(sq.shift());
                        if (sq.length) finalOrder.push(sq.shift());
                        if (w.length) finalOrder.push(w.shift());
                        if (l.length) finalOrder.push(l.shift());
                    }
                    left = !left; 
                }

                finalOrder.forEach(b => container.appendChild(b));
                sessionStorage.setItem(key, JSON.stringify(finalOrder.map(b => b.dataset.index)));
            }

            requestAnimationFrame(() => {
                const rects = finalOrder.map(b => ({ block: b, bottom: b.getBoundingClientRect().bottom }));
                const maxBottom = Math.max(...rects.map(r => r.bottom));
                const bottomBlocks = rects.filter(r => Math.abs(r.bottom - maxBottom) < 10);
                
                if (bottomBlocks.length === 1) {
                    bottomBlocks[0].block.classList.add('orphan-centered');
                }
            });
        };

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(applyLayout, 250);
        });
        
        applyLayout();

        const inner = document.getElementById('bentoModalInner');
        const counter = document.getElementById('bentoCounter');
        let activeBlocks = [], currentIndex = 0, touchStartX = 0;

        const renderModal = () => {
            const block = activeBlocks[currentIndex];
            if (!block) return;

            inner.innerHTML = block.innerHTML;
            inner.className = 'bento-modal-inner ' + (Array.from(block.classList).find(c => c.startsWith('type-')) || '');
            
            const hint = inner.querySelector('.bento-expand-hint');
            if (hint) hint.remove();

            const media = inner.querySelector('.heuristic-media');
            if (media) media.style.pointerEvents = 'none';

            counter.textContent = `${currentIndex + 1} / ${activeBlocks.length}`;
        };

        const toggleModal = (show, block = null) => {
            if (show && block) {
                activeBlocks = Array.from(container.querySelectorAll('.heuristic-block'));
                currentIndex = activeBlocks.indexOf(block);
                renderModal();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            } else {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        const navigate = (dir) => {
            currentIndex = (currentIndex + dir + activeBlocks.length) % activeBlocks.length;
            renderModal();
        };

        container.addEventListener('click', e => {
            const block = e.target.closest('.heuristic-block');
            if (block) toggleModal(true, block);
        });

        document.getElementById('bentoClose').addEventListener('click', () => toggleModal(false));
        
        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.classList.contains('bento-modal-container')) toggleModal(false);
        });

        document.getElementById('bentoPrev').addEventListener('click', () => navigate(-1));
        document.getElementById('bentoNext').addEventListener('click', () => navigate(1));

        document.addEventListener('keydown', e => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') toggleModal(false);
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });

        modal.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modal.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 50) navigate(diff > 0 ? -1 : 1);
        }, { passive: true });
    });
})();