/* =====================================================
   SCROLL REVEAL ANIMATIONS
   dev-portfolio/js/animations.js
   ===================================================== */

(function () {
    'use strict';

    const REVEAL_OPTIONS = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after reveal (one-time animation)
                observer.unobserve(entry.target);
            }
        });
    }, REVEAL_OPTIONS);

    function initReveal() {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    /* Observe dynamically added cards after projects render */
    const mutationObserver = new MutationObserver(() => {
        document.querySelectorAll('.reveal:not([data-observed])').forEach(el => {
            el.setAttribute('data-observed', 'true');
            observer.observe(el);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        initReveal();

        const projectGrid = document.getElementById('projectsGrid');
        if (projectGrid) {
            mutationObserver.observe(projectGrid, { childList: true, subtree: true });
        }
    });
})();
