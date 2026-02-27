/* =====================================================
   APP INIT — Typing Effect, Dark Mode, Scroll Top
   dev-portfolio/js/app.js
   ===================================================== */

(function () {
    'use strict';

    /* ══════════════════════════════════════════════════
       TYPING EFFECT
       ══════════════════════════════════════════════════ */

    const PHRASES = [
        'Full-Stack Web Apps',
        'Mobile Apps with React Native',
        'Clean, Responsive UIs',
        'REST APIs & Firebase',
        'Real-World Deployments',
    ];

    const typingEl = document.getElementById('typing-text');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimer;

    function type() {
        if (!typingEl) return;

        const current = PHRASES[phraseIndex];

        if (isDeleting) {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 85;

        if (!isDeleting && charIndex === current.length) {
            speed = 1800; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % PHRASES.length;
            speed = 400; // Pause before next word
        }

        typingTimer = setTimeout(type, speed);
    }

    /* ══════════════════════════════════════════════════
       DARK / LIGHT MODE TOGGLE
       ══════════════════════════════════════════════════ */

    const toggleBtn = document.getElementById('themeToggle');
    const html = document.documentElement;

    function getTheme() {
        return localStorage.getItem('portfolio-theme') || 'light';
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        updateToggleIcon(theme);
    }

    function updateToggleIcon(theme) {
        if (!toggleBtn) return;
        toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        toggleBtn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        toggleBtn.setAttribute('aria-label', toggleBtn.title);
    }

    function toggleTheme() {
        const current = html.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    }

    /* ══════════════════════════════════════════════════
       SMOOTH SCROLL FOR ALL ANCHOR LINKS
       ══════════════════════════════════════════════════ */

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                const target = document.querySelector(link.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                const navH = document.getElementById('navbar')?.offsetHeight || 70;
                const top = target.getBoundingClientRect().top + window.scrollY - navH;
                window.scrollTo({ top, behavior: 'smooth' });
            });
        });
    }

    /* ══════════════════════════════════════════════════
       SCROLL-TO-TOP
       ══════════════════════════════════════════════════ */

    function initScrollTop() {
        document.querySelector('.scroll-top')?.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ══════════════════════════════════════════════════
       HERO PARALLAX (mouse move — desktop only)
       ══════════════════════════════════════════════════ */

    function initParallax() {
        const hero = document.querySelector('.hero');
        const blobs = document.querySelectorAll('.hero-blob');

        if (!hero || window.innerWidth < 1024) return;

        hero.addEventListener('mousemove', e => {
            const { width, height } = hero.getBoundingClientRect();
            const cx = (e.clientX / width - 0.5) * 2; // -1 to 1
            const cy = (e.clientY / height - 0.5) * 2; // -1 to 1

            blobs.forEach((blob, i) => {
                const strength = (i + 1) * 10;
                blob.style.transform = `translate(${cx * strength}px, ${cy * strength}px)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            blobs.forEach(blob => {
                blob.style.transform = '';
            });
        });
    }

    /* ══════════════════════════════════════════════════
       COUNTER ANIMATION (hero stats)
       ══════════════════════════════════════════════════ */

    function animateCounter(el, target, duration = 1000) {
        const start = performance.now();
        const from = 0;

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const value = Math.round(from + eased * (target - from));
            el.textContent = value + '+';
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    function initCounters() {
        const stats = [
            { selector: '.hero-stat-value', targets: [4, 3, 10] }
        ];

        const elements = document.querySelectorAll('.hero-stat-value');
        if (!elements.length) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const values = [4, 5, 15];
                    elements.forEach((el, i) => {
                        setTimeout(() => animateCounter(el, values[i]), i * 200);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        if (elements[0]) observer.observe(elements[0]);
    }

    /* ══════════════════════════════════════════════════
       INIT
       ══════════════════════════════════════════════════ */

    document.addEventListener('DOMContentLoaded', () => {
        // Theme
        setTheme(getTheme());
        toggleBtn?.addEventListener('click', toggleTheme);

        // Typing
        setTimeout(type, 800);

        // Features
        initSmoothScroll();
        initScrollTop();
        initParallax();
        initCounters();
    });

})();
