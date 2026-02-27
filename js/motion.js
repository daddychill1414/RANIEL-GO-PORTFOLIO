/* =====================================================
   LIVE MOTION JS — Particles, Cursor Glow, Card Tilt
   dev-portfolio/js/motion.js
   ===================================================== */

(function () {
    'use strict';

    /* ══════════════════════════════════════════════════
       PARTICLE FIELD
       ══════════════════════════════════════════════════ */

    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animId;
    let W, H;

    const PARTICLE_COUNT = 60;

    function getAccent() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark
            ? { r: 96, g: 165, b: 250 }  // sky blue
            : { r: 79, g: 70, b: 229 }; // indigo
    }

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.45 + 0.08,
        };
    }

    function initParticles() {
        particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    }

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        const { r, g, b } = getAccent();

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    const lineAlpha = (1 - dist / 140) * 0.12;
                    ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw dots
        particles.forEach(p => {
            ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function updateParticles() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
        });
    }

    function tick() {
        updateParticles();
        drawParticles();
        animId = requestAnimationFrame(tick);
    }

    /* ══════════════════════════════════════════════════
       CURSOR GLOW
       ══════════════════════════════════════════════════ */

    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = -999, mouseY = -999;
    let glowX = -999, glowY = -999;

    function updateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        if (cursorGlow) {
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
        }
        requestAnimationFrame(updateGlow);
    }

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /* ══════════════════════════════════════════════════
       3D CARD TILT
       ══════════════════════════════════════════════════ */

    function initCardTilt() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);
                const tiltX = (-dy * 6).toFixed(2);
                const tiltY = (dx * 6).toFixed(2);
                card.style.setProperty('--tilt-x', `${tiltX}deg`);
                card.style.setProperty('--tilt-y', `${tiltY}deg`);
                card.classList.add('tilted');
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
                card.classList.remove('tilted');
            });
        });
    }

    /* Re-init tilt when projects are injected */
    const projectGrid = document.getElementById('projectsGrid');
    if (projectGrid) {
        new MutationObserver(() => initCardTilt())
            .observe(projectGrid, { childList: true });
    }

    /* ══════════════════════════════════════════════════
       MAGNETIC BUTTON RIPPLE
       ══════════════════════════════════════════════════ */

    function initRipple() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 2;
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');
                ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;

                btn.classList.add('btn-magnetic');
                btn.appendChild(ripple);

                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    }

    /* ══════════════════════════════════════════════════
       INIT
       ══════════════════════════════════════════════════ */

    document.addEventListener('DOMContentLoaded', () => {
        resize();
        initParticles();
        tick();
        updateGlow();
        initRipple();
        initCardTilt();
    });

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    /* Re-init ripple on theme toggle (new buttons state) */
    document.getElementById('themeToggle')?.addEventListener('click', () => {
        setTimeout(initRipple, 50);
    });

})();
