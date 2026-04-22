/* ── TYPEWRITER ── */
const typeTarget = document.getElementById('typeTarget');
const phrases = [
    'Graphic Designer',
    'Software Engineer',
    'UI/UX Designer',
    'Brand Creator',
    'Web Developer'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeWrite() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
        typeTarget.textContent = phrase.slice(0, ++charIdx);
        if (charIdx === phrase.length) {
            deleting = true;
            setTimeout(typeWrite, 1800);
            return;
        }
    } else {
        typeTarget.textContent = phrase.slice(0, --charIdx);
        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
        }
    }
    setTimeout(typeWrite, deleting ? 55 : 90);
}
typeWrite();

/* ── MOBILE MENU ── */
const menuIcon = document.querySelector('.menu-icon');
const navlist  = document.querySelector('.navlist');
const overlay  = document.querySelector('.overlay');

function toggleMenu() {
    menuIcon.classList.toggle('active');
    navlist.classList.toggle('open');
    document.body.classList.toggle('menu-open');
}
menuIcon.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
navlist.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (navlist.classList.contains('open')) toggleMenu();
}));

/* ── ACTIVE NAV ON SCROLL ── */
const sections = document.querySelectorAll('section[id], .home[id]');
const navLinks = document.querySelectorAll('.navlist a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}, { passive: true });

/* ── ABOUT TABS ── */
document.querySelectorAll('.about-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.about-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.about-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById('tab-' + btn.dataset.tab);
        if (panel) panel.classList.add('active');
    });
});

/* ── HOME PROJECT LIST — pull from portfolio cards ── */
document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('homeProjectList');
    const cards = document.querySelectorAll('#portfolioGallery .pbox');

    const cards2026 = [...cards].filter(c => c.dataset.year === '2026');
    const cards2025 = [...cards].filter(c => c.dataset.year === '2025');

    const max = 5;
    const slots2025 = max - cards2026.length;
    const selected = [...cards2026, ...cards2025.slice(0, slots2025)];

    selected.forEach(card => {
        const name = card.querySelector('.pbox-name')?.textContent.trim();
        const cat  = card.querySelector('.pbox-cat')?.textContent.trim();
        const year = card.dataset.year || '2026';

        if (!name) return;

        list.innerHTML += `
            <div class="home-project">
                <div class="home-proj-name">${name}</div>
                <div class="home-proj-meta">${cat} · ${year}</div>
            </div>`;
    });
});

/* ── PORTFOLIO FILTER ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.pbox').forEach(box => {
            if (filter === 'all' || box.dataset.cat === filter) {  // ← changed this line
                box.classList.remove('hidden');
            } else {
                box.classList.add('hidden');
            }
        });
    });
});

/* ── SIMPLELIGHTBOX ── */
if (typeof SimpleLightbox !== 'undefined') {
    new SimpleLightbox('.gallery-item', {
        captionsData: 'alt',
        captionDelay: 250
    });
}

/* ── SWIPER ── */
if (typeof Swiper !== 'undefined') {
    new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            600:  { slidesPerView: 2 },
            900:  { slidesPerView: 3 }
        }
    });
}

/* ── TOOL BAR ANIMATION ── */
const toolItems = document.querySelectorAll('.tool-item');

const toolObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const fill = e.target.querySelector('.tool-fill');
            const pct = e.target.querySelector('.tool-pct');
            if (fill && pct) {
                fill.style.width = pct.textContent.trim();
                fill.classList.add('animated');
            }
            toolObs.unobserve(e.target);
        }
    });
}, { threshold: .3 });

toolItems.forEach(item => toolObs.observe(item));

/* ── SKILL CIRCLE ANIMATION ── */
const scFills = document.querySelectorAll('.sc-fill');
const scObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('animated');
            scObs.unobserve(e.target);
        }
    });
}, { threshold: .3 });
scFills.forEach(f => scObs.observe(f));

/* ── PBOX CAROUSEL ── */
document.querySelectorAll('.pbox-carousel').forEach(carousel => {
    const slides = carousel.querySelector('.pbox-slides');
    const dots = carousel.querySelectorAll('.pbox-dot');
    let current = 0;
    const total = dots.length;

    function goTo(index) {
        current = (index + total) % total;
        slides.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[current].classList.add('active');
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    setInterval(() => goTo(current + 1), 3000);
});

/* ── SCROLL REVEAL ── */
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '24px',
        duration: 700,
        delay: 80,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        reset: false
    });
    sr.reveal('.section-head', { delay: 0 });
    sr.reveal('.service-card', { interval: 80 });
    sr.reveal('.pbox', { interval: 40 });
    sr.reveal('.about-photo-col', { origin: 'left' });
    sr.reveal('.about-content', { origin: 'right', delay: 120 });
    sr.reveal('.contact-card', { origin: 'left' });
    sr.reveal('.contact-form-wrap', { delay: 80 });
    sr.reveal('.skills-wrap', { origin: 'right', delay: 120 });
    sr.reveal('.home-left', { origin: 'left', delay: 0 });
    sr.reveal('.home-right', { origin: 'right', delay: 100 });
    sr.reveal('.recent-card', { interval: 100 });
}

/* ── SCROLL TO TOP ── */
const scrollTop = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    scrollTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });
scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── HEADER shadow on scroll ── */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 10
        ? 'rgba(196,120,154,0.15)'
        : '';
}, { passive: true });

// ── PROJECT CAROUSEL ──────────────────────────────────────────────

const PROJECTS = [

    {
        tag: 'Frontend · Design',
        title: 'Personal Portfolio',
        desc: 'Built this responsive portfolio from scratch — scroll-snapped pages, custom CSS animations, a 3D project carousel, and a cohesive pink-denim brand identity.',
        pills: [{ label: 'HTML/CSS', color: 'blue' }, { label: 'JavaScript', color: 'blue' }, { label: 'UI/UX', color: 'pink' }],
    },
    {
        tag: 'QA · Testing',
        title: 'System Validation Suite',
        desc: 'Wrote and executed comprehensive test cases for a POS and inventory management system, producing detailed UAT reports that cut post-launch defects significantly.',
        pills: [{ label: 'UAT', color: 'pink' }, { label: 'QA Testing', color: 'blue' }, { label: 'Documentation', color: 'pink' }],
    },
    {
        tag: 'UI/UX · Web',
        title: 'Multi-Client Kiosk System',
        desc: 'Designed and developed a full-stack kiosk platform serving multiple clients, covering everything from UI prototyping in Figma to PHP/MySQL backend integration and on-site deployment.',
        pills: [{ label: 'Figma', color: 'pink' }, { label: 'PHP', color: 'blue' }, { label: 'MySQL', color: 'blue' }],
    },
    {
        tag: 'Branding · Print',
        title: 'Brand Identity Design',
        desc: 'Created cohesive visual brand packages — logos, color palettes, typography systems, and print-ready collateral — for several small businesses using Canva and Photoshop.',
        pills: [{ label: 'Canva', color: 'pink' }, { label: 'Photoshop', color: 'blue' }, { label: 'Branding', color: 'pink' }],
    },
    {
        tag: 'Technical Support',
        title: 'POS Rollout & Training',
        desc: 'Led on-site configuration of POS terminals and PSC software across multiple client locations, conducted end-user training sessions, and handled OS reimaging for deployment.',
        pills: [{ label: 'POS Systems', color: 'blue' }, { label: 'Client Training', color: 'pink' }, { label: 'IT Support', color: 'blue' }],
    },
];

const MAX_VIS = 3;

(function () {
    const scene   = document.getElementById('carouselScene');
    const dotsEl  = document.getElementById('p6Dots');
    const prevBtn = document.getElementById('p6Prev');
    const nextBtn = document.getElementById('p6Next');

    if (!scene || !dotsEl) return; // safety check

    let active = Math.floor(PROJECTS.length / 2);

    // ── Build cards ──────────────────────────────────────────────────────────
    const containers = PROJECTS.map((proj) => {
        const wrap = document.createElement('div');
        wrap.className = 'p6-card-container';

        const card = document.createElement('div');
        card.className = 'p6-card';

        card.innerHTML = `
            <span class="p6-card-tag">${proj.tag}</span>
            <h2>${proj.title}</h2>
            <p>${proj.desc}</p>
            <div class="p6-card-pills">
                ${proj.pills.map(p => `<span class="p6-pill ${p.color}">${p.label}</span>`).join('')}
            </div>
        `;

        wrap.appendChild(card);
        scene.appendChild(wrap);
        return wrap;
    });

    // ── Build dots ───────────────────────────────────────────────────────────
    const dots = PROJECTS.map((_, i) => {
        const d = document.createElement('button');
        d.className = 'p6-dot';
        d.setAttribute('aria-label', `Go to project ${i + 1}`);
        d.addEventListener('click', () => setActive(i));
        dotsEl.appendChild(d);
        return d;
    });

    // ── Render ───────────────────────────────────────────────────────────────
    function render() {
        containers.forEach((wrap, i) => {
            const offset    = (active - i) / 3;
            const absOffset = Math.abs(active - i) / 3;
            const direction = Math.sign(active - i);
            const isActive  = i === active ? 1 : 0;
            const hidden    = Math.abs(active - i) > MAX_VIS;

            wrap.style.setProperty('--offset',     offset);
            wrap.style.setProperty('--abs-offset', absOffset);
            wrap.style.setProperty('--direction',  direction);
            wrap.style.setProperty('--active',     isActive);
            wrap.style.opacity       = Math.abs(active - i) >= MAX_VIS ? '0' : '1';
            wrap.style.display       = hidden ? 'none' : 'block';
            wrap.style.pointerEvents = isActive ? 'auto' : 'none';
        });

        dots.forEach((d, i) => d.classList.toggle('active', i === active));

        prevBtn.style.display = active > 0                   ? 'flex' : 'none';
        nextBtn.style.display = active < PROJECTS.length - 1 ? 'flex' : 'none';
    }

    function setActive(i) {
        active = Math.max(0, Math.min(PROJECTS.length - 1, i));
        render();
    }

    prevBtn.addEventListener('click', () => setActive(active - 1));
    nextBtn.addEventListener('click', () => setActive(active + 1));

    // Keyboard navigation when portfolio section is in view
    document.addEventListener('keydown', e => {
        const section = document.getElementById('portfolio');
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
            if (e.key === 'ArrowLeft')  setActive(active - 1);
            if (e.key === 'ArrowRight') setActive(active + 1);
        }
    });

    render();
})();