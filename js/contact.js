/* =====================================================
   CONTACT FORM — Validation + Toast
   dev-portfolio/js/contact.js
   ===================================================== */

(function () {
    'use strict';

    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmitBtn');
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMsg = document.getElementById('toastMsg');

    /* ── Validators ── */
    const rules = {
        contactName: { test: v => v.trim().length >= 2, msg: 'Please enter your name.' },
        contactEmail: { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email.' },
        contactSubject: { test: v => v.trim().length >= 3, msg: 'Please enter a subject.' },
        contactMessage: { test: v => v.trim().length >= 20, msg: 'Message must be at least 20 characters.' },
    };

    function validateField(id) {
        const input = document.getElementById(id);
        const group = input?.closest('.form-group');
        if (!input || !group) return true;

        const valid = rules[id].test(input.value);
        group.classList.toggle('error', !valid);
        group.classList.toggle('success', valid);

        const errSpan = group.querySelector('.form-error-msg');
        if (errSpan) errSpan.textContent = rules[id].msg;

        return valid;
    }

    /* ── Real-time validation on blur ── */
    Object.keys(rules).forEach(id => {
        const el = document.getElementById(id);
        el?.addEventListener('blur', () => validateField(id));
        el?.addEventListener('input', () => {
            const group = el.closest('.form-group');
            if (group?.classList.contains('error')) validateField(id);
        });
    });

    /* ── Toast ── */
    let toastTimeout;

    function showToast(icon, message, duration = 4000) {
        clearTimeout(toastTimeout);
        toastIcon.textContent = icon;
        toastMsg.textContent = message;
        toast.classList.add('show');
        toastTimeout = setTimeout(() => toast.classList.remove('show'), duration);
    }

    /* ── Submit ── */
    form?.addEventListener('submit', async e => {
        e.preventDefault();

        const ids = Object.keys(rules);
        const allValid = ids.map(validateField).every(Boolean);

        if (!allValid) {
            showToast('⚠️', 'Please fix the errors above before submitting.');
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
            firstError?.focus();
            return;
        }

        /* Simulate sending */
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="animation:spin 1s linear infinite">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
      Sending…
    `;

        // Inject spinner keyframe once
        if (!document.getElementById('spin-kf')) {
            const style = document.createElement('style');
            style.id = 'spin-kf';
            style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        }

        await new Promise(r => setTimeout(r, 1500)); // simulate network delay

        form.reset();
        ids.forEach(id => {
            const group = document.getElementById(id)?.closest('.form-group');
            group?.classList.remove('error', 'success');
        });

        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg>`;

        showToast('✅', 'Message sent! I\'ll get back to you soon.', 5000);
    });

})();
