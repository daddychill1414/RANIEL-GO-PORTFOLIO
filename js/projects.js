/* =====================================================
   PROJECTS DATA + CARD RENDERER
   dev-portfolio/js/projects.js
   ===================================================== */

const PROJECTS = [
  {
    id: 'marci-metzger',
    title: 'Marci Metzger Redesign',
    category: 'Real Estate Platform',
    visual: 'proj-visual-marci',
    icon: '🏡',
    shortDesc: 'A full real estate website redesign for Pahrump\'s premier realtor, featuring animated property galleries, testimonials, and a responsive search widget.',
    fullDesc: `A complete redesign and rebuild of Marci Metzger's real estate website for The Ridge Realty Group. 
The site features an immersive hero slider with Ken Burns zoom animations, a smart property search widget, 
multi-step inquiry forms, animated testimonials section, and a polished gallery with pricing overlays. 
Deployed to Vercel with optimized images and fast load times.`,
    features: [
      'Ken Burns zoom hero slider with smooth transitions',
      'Property search widget with filtering',
      'Animated testimonials and gallery section',
      'Ripple click effects and scroll-triggered reveals',
      'Fully responsive across all screen sizes',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'CSS Animations', 'Vercel', 'IntersectionObserver'],
    liveUrl: 'https://marci-metzger-redesign.vercel.app/',
    githubUrl: '#',
  },
  {
    id: 'golden-whisk',
    title: 'Golden Whisk',
    category: 'Bakery E-Commerce',
    visual: 'proj-visual-whisk',
    icon: '🎂',
    shortDesc: 'A premium bakery website with interactive cake customizer, product showcase, and order system — "Baked with Passion, Shared with Love."',
    fullDesc: `Golden Whisk is a boutique bakery website for Gina Ygo's artisan cake business. The site features an 
interactive "Build Your Own Cake" configurator, signature product showcase with detailed descriptions, 
custom order form, a gallery of finest works, and Ken Burns hero animation. 
Built with a warm, elegant design system that matches the brand's premium identity.`,
    features: [
      'Interactive cake builder / configurator',
      'Signature product showcase grid',
      'Animated gallery with lightbox',
      'Custom order form with validation',
      'Parallax and Ken Burns hero animation',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel', 'CSS Grid', 'Flexbox'],
    liveUrl: 'https://goldenwhisk-flax.vercel.app/',
    githubUrl: '#',
  },
  {
    id: 'gameteract',
    title: 'Gameteract',
    category: 'Gaming Community Platform',
    visual: 'proj-visual-game',
    icon: '🎮',
    shortDesc: 'A full-stack gaming community platform with smart matchmaking, real-time chat, gaming circles, and player profiles. "Find Your Gaming Squad."',
    fullDesc: `Gameteract is a full-stack web app for connecting gamers with compatible teammates. The platform 
features an AI-inspired matchmaking algorithm, gaming circles (communities), real-time messaging, 
user profiles with stats and preferences, and privacy controls. Built with React and Firebase 
for real-time data sync and authentication. Currently supports 200+ active players and 50+ daily matches.`,
    features: [
      'Smart matchmaking algorithm based on playstyle',
      'Gaming circles — private & public communities',
      'Real-time chat and notifications',
      'Player profiles with stats and achievements',
      'Firebase authentication and Firestore',
    ],
    tech: ['React', 'Firebase', 'Firestore', 'Authentication', 'Real-time DB', 'Vercel', 'CSS Modules'],
    liveUrl: 'https://gameteract.vercel.app/',
    githubUrl: '#',
  },
  {
    id: 'marci-alt',
    title: 'Marci Metzger (Alt. Build)',
    category: 'Real Estate · Design Variant',
    visual: 'proj-visual-marci2',
    icon: '🏠',
    shortDesc: 'An alternative design iteration of the Marci Metzger real estate site, exploring a darker, more premium visual direction with enhanced feature sections.',
    fullDesc: `A second design iteration of the Marci Metzger real estate platform, exploring an alternate visual 
direction with richer dark tones, more detailed property galleries, and enhanced UX patterns. 
This variant experiments with different typography scales, alternative card layouts, 
and advanced CSS animations including multi-directional scroll reveals and staggered grid animations.`,
    features: [
      'Alternative dark/premium design aesthetic',
      'Enhanced property gallery with filters',
      'Multi-directional scroll reveal animations',
      'Staggered grid card animations',
      'Advanced CSS animation experiments',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel', 'IntersectionObserver', 'CSS Grid'],
    liveUrl: 'https://marcimetzgerredesign-pczjm68oj-a20-30518-9381s-projects.vercel.app/',
    githubUrl: '#',
  },
];

/* ── Render project cards ── */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => `
    <article
      class="project-card reveal reveal-scale reveal-delay-${Math.min(i + 1, 5)}"
      data-project-id="${p.id}"
      tabindex="0"
      role="article"
      aria-label="${p.title}"
    >
      <div class="project-card-img">
        <div class="project-card-img-inner ${p.visual}">
          <span class="proj-icon" aria-hidden="true">${p.icon}</span>
        </div>
        <div class="project-card-overlay" aria-hidden="true">
          <a
            href="${p.liveUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="overlay-btn overlay-btn-solid"
            onclick="event.stopPropagation()"
            aria-label="Open live demo of ${p.title}"
          >
            <span>↗</span> Live Demo
          </a>
          <button class="overlay-btn overlay-btn-outline" onclick="event.stopPropagation();openModal('${p.id}')">
            Details
          </button>
        </div>
      </div>
      <div class="project-card-body">
        <div class="project-card-label">
          <span class="project-category">${p.category}</span>
        </div>
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.shortDesc}</p>
        <div class="project-card-tech">
          ${p.tech.slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}
          ${p.tech.length > 4 ? `<span class="tag">+${p.tech.length - 4}</span>` : ''}
        </div>
        <div class="project-card-footer">
          <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" onclick="event.stopPropagation()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            Live Demo
          </a>
          <button class="project-link" onclick="openModal('${p.id}')" style="background:none;border:none;cursor:pointer;font-size:0.8rem;font-weight:600;display:inline-flex;align-items:center;gap:5px;color:var(--clr-text-muted)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            Details
          </button>
        </div>
      </div>
    </article>
  `).join('');

  /* Click to open modal on card */
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.projectId));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.projectId);
      }
    });
  });
}

/* ── Modal ── */
function openModal(id) {
  const p = PROJECTS.find(p => p.id === id);
  if (!p) return;

  const overlay  = document.getElementById('modalOverlay');
  const category = document.getElementById('modalCategory');
  const title    = document.getElementById('modalTitle');
  const visual   = document.getElementById('modalVisual');
  const desc     = document.getElementById('modalDesc');
  const features = document.getElementById('modalFeatures');
  const tech     = document.getElementById('modalTech');
  const actions  = document.getElementById('modalActions');

  category.textContent = p.category;
  title.textContent    = p.title;

  visual.className = `modal-visual ${p.visual}`;
  visual.innerHTML = `<span style="font-size:5rem;filter:drop-shadow(0 4px 16px rgba(0,0,0,0.4))">${p.icon}</span>`;

  desc.textContent = p.fullDesc;

  features.innerHTML = p.features.map(f => `
    <div class="modal-feature">
      <div class="modal-feature-icon" aria-hidden="true">✓</div>
      <span>${f}</span>
    </div>
  `).join('');

  tech.innerHTML = p.tech.map(t => `<span class="tag">${t}</span>`).join('');

  actions.innerHTML = `
    <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
      View Live Demo
    </a>
    <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
      GitHub
    </a>
  `;

  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Focus trap
  setTimeout(() => {
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.focus();
  }, 100);
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  document.getElementById('modalClose')?.addEventListener('click', closeModal);

  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
