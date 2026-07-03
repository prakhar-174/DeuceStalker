# DeuceStalker Portfolio - Context & Progress

> Last Updated: July 3, 2025

## Project Overview
Spider-Man themed portfolio website - "A Web-Slinger's Chronicle". Single-page React app with 6 narrative chapters, cinematic loader, Three.js particle web, GSAP + Framer Motion animations, custom cursor, and contact form.

## Tech Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + CSS Modules
- **Animation**: Framer Motion + GSAP (ScrollTrigger)
- **3D**: Three.js + @react-three/fiber + @react-three/drei
- **Icons**: react-icons (Simple Icons set)
- **Tilt**: react-parallax-tilt
- **Scroll Detection**: react-intersection-observer
- **Contact**: EmailJS (scaffolded, not configured)
- **Utilities**: clsx

## What's Done ✅

### Phase 2 - Foundation
- [x] Google Fonts loaded (Bebas Neue, Space Grotesk, Inter, JetBrains Mono)
- [x] Design system in `index.css` (CSS variables, typography scale, glass morphism, scrollbar, reduced motion)
- [x] Animation constants in `src/lib/animations.js`
- [x] Data files: `projects.js`, `skills.js`, `timeline.js`
- [x] Hooks: `useCountUp.js`, `useMousePosition.js`
- [x] EmailJS scaffold: `src/lib/emailjs.js` + `.env.example`
- [x] SEO meta tags in `index.html`

### Phase 3 - Loader (Chapter 00)
- [x] 7-step loader sequence (black screen → web thread → Spidey drop → sway → typewriter → dots → exit)
- [x] Skip logic (click/keypress)
- [x] localStorage return-visit mini-loader
- [x] CSS Module animations (sway, typewriter cursor, pulse dots, thread draw)

### Phase 4 - All Content Sections
- [x] **Navigation** - fixed nav, P. logo, chapter links, transparent→blur on scroll, mobile hamburger
- [x] **Hero (Chapter 01)** - "PRAKHAR" letter animation, "aka DeuceStalker", role tagline, CTA buttons, scroll indicator
- [x] **Work (Chapter 02)** - filter bar, asymmetric grid, glass project cards with tilt, tech tags, hover glow
- [x] **Skills (Chapter 03)** - SVG spider web (8 spokes, 4 rings), GSAP stroke-dashoffset draw, skill orbs with tooltips
- [x] **Story (Chapter 04)** - narrative text, animated stat counters, vertical timeline with GSAP line draw
- [x] **Contact (Chapter 05)** - signal headline, 3-field form, focus underline, social links, footer

### Phase 5 - Three.js Hero Canvas
- [x] Lazy-loaded WebCanvas via React.lazy + Suspense
- [x] 100 nodes (50 on mobile), distance-based strand connections
- [x] Slow camera orbit, mouse attraction
- [x] Performance: capped pixel ratio 1.5, demand frameloop, no antialias, proper disposal, visibility-based pausing

### Phase 6 & 7 - Animations
- [x] Framer Motion: letter swing-in, card drop, section fade-in, social link bounce
- [x] GSAP: SVG web draw (spokes then rings), timeline line draw, orb pop-in

### Phase 8 - Custom Cursor
- [x] Dot (8px, exact follow) + Ring (32px, lerp follow)
- [x] Interactive hover scaling
- [x] 4-position web trail
- [x] Hidden on mobile (pointer: coarse)

### Phase 9 - Contact Form
- [x] Form with validation scaffolded
- [x] EmailJS integration scaffolded (simulates success when unconfigured)
- [x] Spider-Man success state on submit

### Build Verification
- [x] Production build passes (`npm run build`)
- [x] All sections render correctly in browser
- [x] No JavaScript errors (only THREE.Clock deprecation warnings)

## What's Remaining / To Customize 📋

### Must Do (Before Going Live)
- [x] Replace placeholder project data in `src/data/projects.js` with real projects
- [ ] Add real project screenshots to `public/images/projects/`
- [x] Update story text in `Story.jsx` with your actual narrative
- [x] Update timeline milestones in `src/data/timeline.js`
- [x] Update skills proficiency/years in `src/data/skills.js`
- [ ] Add real social links in `Contact.jsx` (GitHub, LinkedIn, X URLs)
- [ ] Configure EmailJS: create account, get credentials, add to `.env`
- [ ] Replace "YOUR NAME" references if any remain

### Nice to Have
- [ ] Add a favicon (custom Spider-Man themed)
- [ ] Add og:image meta tag (screenshot of hero)
- [ ] Cross-browser test (Chrome, Firefox, Safari)
- [ ] Mobile test on real device
- [ ] Lighthouse audit (target 90+ performance)
- [ ] Deploy to Vercel

## File Structure
```
src/
├── components/
│   ├── Loader/        - Loader.jsx, Loader.module.css
│   ├── Navigation/    - Navigation.jsx, Navigation.module.css
│   ├── Cursor/        - Cursor.jsx, Cursor.module.css
│   ├── Hero/          - Hero.jsx, Hero.module.css, WebCanvas.jsx
│   ├── Work/          - Work.jsx, ProjectCard.jsx, Work.module.css
│   ├── Skills/        - Skills.jsx, SkillOrb.jsx, Skills.module.css
│   ├── Story/         - Story.jsx, Timeline.jsx, Story.module.css
│   └── Contact/       - Contact.jsx, ContactForm.jsx, Contact.module.css
├── data/              - projects.js, skills.js, timeline.js
├── hooks/             - useCountUp.js, useMousePosition.js
├── lib/               - animations.js, emailjs.js
├── App.jsx            - Root component (loader state, lazy loading)
├── main.jsx           - Vite entry point
└── index.css          - Design system (variables, typography, utilities)
```

## Three.js Performance Optimizations
1. **Lazy loaded** via `React.lazy()` - doesn't block initial render
2. **Capped pixel ratio** at 1.5 - saves ~50% GPU on retina displays
3. **Demand frameloop** - only renders when `invalidate()` is called
4. **No antialias** - saves GPU bandwidth
5. **BufferGeometry** - no GC pressure from object creation
6. **Single draw call** for lines (LineSegments, not individual Line objects)
7. **Visibility check** - pauses when tab is hidden
8. **Reduced nodes on mobile** - 50 instead of 100
9. **Proper disposal** - geometry + material disposed on unmount
10. **No depth/stencil** - disabled for transparent overlay
