/* =====================================================
   NAVBAR — Sticky, Active Links, Mobile Drawer
   dev-portfolio/js/nav.js
   ===================================================== */

(function () {
    'use strict';

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('navHamburger');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const drawerLinks = document.querySelectorAll('.nav-drawer-link');
    const sections = document.querySelectorAll('section[id]');

    /* ── Scroll: sticky style ── */
    function onScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    }

    /* ── Active section detection ── */
    function updateActiveLink() {
        let currentId = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === currentId);
        });
    }

    /* ── Mobile drawer ── */
    function openDrawer() {
        hamburger.classList.add('open');
        mobileDrawer.classList.add('open');
        mobileOverlay.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        hamburger.classList.remove('open');
        mobileDrawer.classList.remove('open');
        mobileOverlay.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ── Init ── */
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    hamburger?.addEventListener('click', () => {
        hamburger.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    mobileOverlay?.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* Close drawer on Escape */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
            closeDrawer();
        }
    });

})();
