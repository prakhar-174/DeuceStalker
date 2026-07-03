# Portfolio Website Blueprint
### "A Web-Slinger's Chronicle" - Complete Project Ideology & Build Guide

---

## Table of Contents

1. [Project Ideology & Concept](#1-project-ideology--concept)
2. [Loader - Chapter 00](#2-loader--chapter-00)
3. [Chapter 01 - The Hero](#3-chapter-01--the-hero)
4. [Chapter 02 - The Work](#4-chapter-02--the-work)
5. [Chapter 03 - The Skills](#5-chapter-03--the-skills)
6. [Chapter 04 - The Story](#6-chapter-04--the-story)
7. [Chapter 05 - The Contact](#7-chapter-05--the-contact)
8. [Animation System](#8-animation-system)
9. [Color System](#9-color-system)
10. [Typography](#10-typography)
11. [Tech Stack](#11-tech-stack)
12. [Folder Structure](#12-folder-structure)
13. [Build Order](#13-build-order)
14. [Performance Rules](#14-performance-rules)

---

## 1. Project Ideology & Concept

### Core Philosophy

This portfolio is not a resume. It is a **story**. The visitor is not browsing a website - they are being taken on a guided journey by a character who represents the developer's personality. The Spider-Man motif is not a skin or a theme; it is the **narrative vehicle** that makes this portfolio impossible to forget.

The central idea is: **every great developer has a story of becoming**. Spider-Man is the world's most famous self-taught hero who built his own tools from scratch, solved problems under pressure, and always showed up. That is who you are as a developer. The portfolio says this without saying it.

### What Makes This Different

Most portfolios fall into one of three traps:
- **The Resume Clone** - a vertical scroll of skills, experience, and contact info
- **The Template Port** - a Framer or Webflow template with swapped text and colors
- **The Overbuilt Showcase** - technically impressive but confusing to navigate

This portfolio avoids all three by leading with **character and story** before credentials. The visitor feels something before they read anything. The loader creates an emotional first impression. The chapter-based structure creates curiosity. The animations feel earned and purposeful, not decorative.

### Narrative Structure

The portfolio is a **single-page application** divided into six named chapters. Each chapter is a logical act in the story of who you are:

```
Chapter 00  →  Entry / First impression    (Loader)
Chapter 01  →  Who am I                    (Hero)
Chapter 02  →  What I have built           (Work)
Chapter 03  →  What I know                 (Skills)
Chapter 04  →  How I got here              (Story / About)
Chapter 05  →  How to reach me             (Contact)
```

The chapter naming is intentional - it signals to the visitor that this is a **designed experience**, not an accident.

### Tone

- Confident, not arrogant
- Playful, not childish
- Technical, not jargon-heavy
- Personal, not oversharing

Copy (all text) should feel like it was written by a human who is good at their craft and knows it, without bragging. Slightly comic-book dramatic is allowed and encouraged.

---

## 2. Loader - Chapter 00

### Purpose

The loader is the **single most important moment** in the portfolio. It runs before anything else. It sets the emotional tone. If it is good, the visitor is already invested before they see a single project.

### What Happens - Step by Step

**Step 1 - Black screen**
The page opens to a pure black background `#0a0a0a`. Nothing else is visible. Duration: `200ms`.

**Step 2 - Web thread drops**
A single SVG web thread animates from the top-center of the viewport downward. It sways slightly as it falls, simulating real physics. The thread is thin, silver-white, with slight opacity variation to look hand-drawn. Duration: `600ms`.

**Step 3 - Spider-Man drops in**
The Spider-Man character (from the uploaded chibi image) slides down the web thread from the top, decelerating as it reaches the vertical center of the screen. The character hangs upside down - head at the bottom, feet tangled in the web at the top. The entrance easing is `cubic-bezier(0.34, 1.56, 0.64, 1)` - a slight overshoot bounce on landing. Duration: `800ms`.

**Step 4 - Character settles**
A subtle gentle sway animation begins - the character swings ±4 degrees on the web thread. This runs as a looping CSS animation. It makes the character feel alive rather than frozen. Duration: looping at `2s per cycle`.

**Step 5 - Dialogue appears**
A text line appears below/beside the character in typewriter style:

```
"Hey there, Developer."
```

Each character types in at `60ms` intervals. After the full line appears, pause `400ms`, then a second line:

```
"Loading the web... (pun intended)"
```

**Step 6 - Progress indicator**
Three small red circular dots pulse in sequence beneath the dialogue text. This is a loading state indicator. Once the main page content is fully loaded and ready, this stops.

**Step 7 - Exit**
Spider-Man shoots a web upward (a new thread appears from his wrist, shoots toward the top-right corner of the screen), grabs it, and swings off-screen to the right. The black background fades out simultaneously over `500ms`, revealing the Hero section beneath.

### Skip Logic

- Any click or keypress after Step 4 begins triggers immediate exit
- Once skipped, store `hasVisited = true` in `localStorage`
- On return visits: a **mini loader** runs instead - Spider-Man drops in for `0.8s`, gives a thumbs up gesture (CSS class toggle), and exits immediately. Total duration `1.2s`, not skippable.

### Implementation Notes (React)

```jsx
// Component: src/components/Loader/Loader.jsx
// Uses: Framer Motion for character animation, custom SVG for web thread
// State: loaderDone (boolean) → when true, unmount Loader and mount main content
// The character image is the uploaded PNG with transparent background
// Web thread is an inline SVG path animated with stroke-dashoffset technique
```

### Assets Required

- Spider-Man PNG with transparent background (already have - the uploaded chibi image)
- Web thread SVG (build inline - single curved path)
- Typewriter sound (optional, off by default, toggle in corner)

---

## 3. Chapter 01 - The Hero

### Purpose

The first thing the visitor sees after the loader exits. This must answer one question in under three seconds: **who is this person and what do they do?**

### Layout

Full viewport height (`100vh`). Content is vertically and horizontally centered. The background is a **Three.js canvas** that fills the entire section behind all other elements.

### Three.js Background - Web Strand Canvas

This is the most technically complex visual element outside the loader.

**What it renders:**
- A network of nodes (small glowing dots) connected by thin lines, resembling a spider web at macro scale
- The web is three-dimensional - nodes are positioned in 3D space and the camera orbits very slowly, giving the illusion of depth
- On mouse move, nearby web strands are attracted toward the cursor slightly, as if the web is responding to touch
- Color: nodes are `#dc2626` (red) with low opacity `0.6`. Strand lines are `rgba(255,255,255,0.08)`.

**Three.js setup specifics:**
```js
// Scene: WebGLRenderer, transparent background
// Camera: PerspectiveCamera, FOV 75, positioned at z: 300
// Geometry: BufferGeometry with ~120 random points in a 600x600x200 box
// Lines: LineSegments connecting points within distance threshold of 120 units
// Animation: camera.position rotates on Y axis at 0.0003 rad/frame
// Mouse: raycaster to find nearby vertices, displace them ±8 units toward mouse
// Resize: window resize listener updates camera aspect and renderer size
```

**Performance note:** Cap at 60fps using `THREE.Clock`. If `devicePixelRatio > 1.5`, set renderer pixel ratio to `1.5` maximum to protect mobile performance.

### Foreground Content

Layered above the Three.js canvas using `position: relative; z-index: 10`.

**Line 1 - Eyebrow label**
Small uppercase text, letter-spaced, muted color:
```
< developer />
```
Font: Space Grotesk, 13px, `#64748b`, letter-spacing 4px.

**Line 2 - Your name**
Large display text. This is the only element using Bebas Neue.
```
YOUR NAME
```
Font: Bebas Neue, responsive size (`clamp(64px, 10vw, 120px)`), color `#f1f5f9`.

Each letter animates in individually - they swing down from 40px above and bounce slightly on landing, staggered at `80ms` per letter. Uses Framer Motion `motion.span` with `initial={{ y: -40, opacity: 0 }}` and `animate={{ y: 0, opacity: 1 }}`.

**Line 3 - Role tagline**
```
Full Stack Developer  ·  Problem Solver  ·  Web Craftsman
```
Font: Space Grotesk, 18px, `#94a3b8`. Fades in after name animation completes, `500ms` delay.

**CTA Buttons**
Two buttons side by side, `margin-top: 48px`:

- **View My Work** - filled button, background `#dc2626`, text white, on click smooth-scrolls to Chapter 02
- **Let's Talk** - outlined button, border `#dc2626`, text `#dc2626`, on click smooth-scrolls to Chapter 05

Both buttons have a hover effect: a thin web thread shoots out from the right edge of the button toward the cursor (CSS clip-path animation, no JS needed).

**Scroll indicator**
At the bottom of the Hero section, a small animated element:
```
↓  scroll to enter
```
Text is `#64748b`, the arrow bounces on Y axis in a loop. On scroll past 100px from top, this element fades out.

### Navigation

A fixed navigation bar appears after the loader exits. It is minimal:
- Left: your initials in red (acts as home/scroll-to-top button)
- Right: Chapter labels as anchor links (`Work`, `Skills`, `Story`, `Contact`)

Navigation background is `transparent` when at top of page, transitions to `rgba(10,10,10,0.85)` with `backdrop-filter: blur(12px)` on scroll. The transition takes `300ms`.

---

## 4. Chapter 02 - The Work

### Purpose

Showcase your best projects. Not all projects - your **best** ones. Quality over quantity. Three to six projects maximum.

### Layout

**Section header:**
```
CHAPTER 02
The Work.
```
"CHAPTER 02" in Space Grotesk, 11px, `#dc2626`, letter-spaced. "The Work." in Bebas Neue, 56px, `#f1f5f9`.

Projects displayed in an **asymmetric grid**. Not a uniform 3-column grid - this looks like a magazine layout:
- Row 1: one large card (spans 2 columns) + one small card (spans 1 column)
- Row 2: one small card + one large card
- This alternating pattern continues

If you have an odd number of projects, the last card is centered and medium-width.

### Project Card Anatomy

Each card is a dark glass panel:
```css
background: rgba(30, 30, 46, 0.7);
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 16px;
backdrop-filter: blur(8px);
```

Inside each card:
- **Project screenshot** - top portion, 16:9 ratio, `object-fit: cover`
- **Tech tag row** - small pills for the technologies used (React, Node, etc.), color `#1d4ed8` background at low opacity
- **Project title** - Space Grotesk, 20px, `#f1f5f9`
- **One-line description** - Inter, 14px, `#94a3b8`
- **Two links** - Live Site (opens new tab) and GitHub (opens new tab), both icon + text

### Card Hover State

On hover, three things happen simultaneously:
1. Card tilts 4 degrees on the axis opposite to cursor position (Vanilla Tilt.js - `ReactParallaxTilt` package in React)
2. The screenshot slides up slightly revealing a second image or a short description paragraph beneath
3. A thin red border glow appears: `box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.4)`

### Card Entrance Animation

Cards are not visible on page load. When the visitor scrolls to the Work section, cards animate in using Framer Motion and `useInView`:

Each card starts in state:
```js
initial={{ y: 80, opacity: 0 }}
```
And animates to:
```js
animate={{ y: 0, opacity: 1 }}
```
With stagger: each card's animation starts `150ms` after the previous one.

The cards should feel like they are **hanging on invisible web strands** and being lowered into position. Achieve this by using a custom easing: `[0.34, 1.56, 0.64, 1]` - the overshoot bounce simulates the web strand tension releasing.

### Filter Bar

Above the project grid, a horizontal filter bar:
```
All   |   React   |   Node.js   |   Full Stack   |   Open Source
```
Clicking a filter fades out non-matching cards and re-flows the grid. Active filter has `background: #dc2626`, inactive are outlined. This uses React state - no external library needed.

---

## 5. Chapter 03 - The Skills

### Purpose

Show what you know without it looking like a boring list of logos. This section should feel like your skills are **caught in your web** - because they are.

### Layout

**Section header** follows the same pattern as Chapter 02 (chapter number + title).

The skills are displayed as **circular orbs** positioned at the intersection points of an SVG spider web. The web is drawn first (animated), then the orbs appear on the nodes.

### SVG Web Construction

The web is a custom SVG that fills the section:
- Central point in the middle of the SVG
- 8 radial spokes radiating outward
- 4 concentric rings connecting the spokes
- The rings are slightly irregular (not perfect circles) to look organic

**Web draw animation:**
Using `stroke-dashoffset` technique. On section enter:
1. All path `stroke-dashoffset` values start equal to `stroke-dasharray` (invisible)
2. Animate to `0` over `1200ms` using `ease-in-out`
3. Spokes draw first (0–600ms), rings draw second (400–1200ms, overlapping with spokes)

**GSAP implementation:**
```js
gsap.to('.spoke-path', {
  strokeDashoffset: 0,
  duration: 0.6,
  stagger: 0.05,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '#skills', start: 'top 60%' }
});
gsap.to('.ring-path', {
  strokeDashoffset: 0,
  duration: 0.8,
  stagger: 0.1,
  delay: 0.4,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '#skills', start: 'top 60%' }
});
```

### Skill Orbs

Each orb sits at an intersection of spoke and ring. An orb is:
- Circle, diameter `56px` on desktop, `40px` on mobile
- Background: `rgba(30, 30, 46, 0.9)`, border `1px solid rgba(220, 38, 38, 0.3)`
- Inside: technology logo (SVG icon from `react-icons` or `simple-icons`)
- Below the circle: technology name in Space Grotesk, 11px, `#94a3b8`

**Orb entrance:** After the web finishes drawing, orbs pop in with `scale: 0 → 1` using spring animation, staggered by 80ms each.

**Orb hover:** A red ring pulses outward from the orb (CSS `box-shadow` animation). A tooltip appears above showing:
```
React
████████░░  80%
4 years experience
```

### Skill Groupings

Organise orbs into clusters on the web. Use proximity on the SVG to group:
- **Inner ring** - Core skills (your strongest 4)
- **Middle ring** - Secondary skills
- **Outer ring** - Tools and technologies

Label each cluster with a small floating text label near the cluster center.

---

## 6. Chapter 04 - The Story

### Purpose

This is the most personal section. It answers: **how did you get here, and why should the visitor trust you?** This is not a LinkedIn bio. It is a short, honest, slightly dramatic account of your developer origin story.

### Layout

Two-column layout on desktop, single column on mobile.

**Left column (60% width) - Story text**

A short narrative, 3 to 5 paragraphs. Written in first person. Example structure (replace with your actual story):

> Paragraph 1: Where you started and what sparked the interest
> Paragraph 2: The moment you decided to take it seriously
> Paragraph 3: What kind of problems you love solving
> Paragraph 4: What you are working toward

Below the text, a set of 3 to 4 **stat cards** in a small grid:
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   2+ Years  │  │ 15+ Projects│  │  5+ Clients │
│  Experience │  │   Shipped   │  │    Served   │
└─────────────┘  └─────────────┘  └─────────────┘
```
Numbers animate from 0 to final value when the section enters the viewport (`useCountUp` hook or manual `requestAnimationFrame` counter).

**Right column (40% width) - Timeline**

A vertical timeline of your journey:
- A single vertical line drawn by GSAP `stroke-dashoffset` on scroll enter
- Each milestone is a node on the line with a small dot marker
- Clicking a node expands a brief detail popup

Example milestone format:
```
● 2022
  Started learning HTML & CSS
  "Thought it was just making things pretty."

● 2023
  First JavaScript project
  "A to-do app. Because of course."

● 2024
  First freelance client
  "Got paid to write code. Still surreal."

● 2025
  [Your current milestone]
```

The voice in the timeline can be playful - short, honest asides in quotes. This humanises you.

### Photo (Optional but Recommended)

If including a photo, place it between the two columns or at the top of the left column:
- Black-and-white filter applied via CSS `filter: grayscale(100%)`
- On hover, color appears: `filter: grayscale(0%)` transitioning over `400ms`
- A thin red border frame around the photo
- Shape: rectangular with `border-radius: 8px`, not circular

---

## 7. Chapter 05 - The Contact

### Purpose

Make it easy and inviting to reach out. The section must feel like the final act - a call to action that is confident, not desperate.

### Layout

Dark panel, centered content, full viewport height.

**Headline:**
```
Your signal has been received.
```
Bebas Neue, large. This is playful and memorable.

**Subtext:**
```
Whether you have a project in mind, a question to ask,
or just want to say hello - I am listening.
```
Inter, 16px, `#94a3b8`.

### Contact Form

Three fields only. No more:
1. **Name** - single line text input
2. **Email** - email input with inline validation
3. **Message** - textarea, minimum 4 rows

**Submit button:**
```
Send It  →
```
On click: form submits via **Resend** (API route in Next.js) or **EmailJS** (client-side, no backend needed). On success, the form slides out and is replaced by:

A small Spider-Man chibi appears (same PNG as loader) giving a thumbs up, and text:
```
"Message received. I'll get back to you faster than a web swing."
```

**Input focus animation:**
On focus, a thin red underline draws in from left to right (CSS `::after` pseudo-element with `width: 0 → 100%` transition).

### Social Links

Below the form, four icon links in a horizontal row:
- GitHub
- LinkedIn
- Twitter / X
- Email (mailto link)

Each icon is from `react-icons`. On hover, the icon bounces up 6px and a small web strand appears beneath it connecting to the next icon. This connecting strand is a simple SVG line that scales in from `scaleX: 0` to `scaleX: 1`.

### Footer

Minimal single-line footer below the contact section:
```
Built with React, Three.js & too much coffee  ·  © 2025 Your Name
```
Font: Inter, 12px, `#475569`.

---

## 8. Animation System

### Philosophy

Every animation must serve a purpose. There are three allowed purposes:

1. **Orient** - tell the visitor where they are or where something came from
2. **Delight** - create a moment of unexpected joy
3. **Feedback** - confirm that an interaction worked

If an animation does not serve one of these three purposes, remove it.

### Global Animation Variables

Define these as JavaScript constants in a shared file `src/lib/animations.js`:

```js
export const EASING = {
  bounce:   [0.34, 1.56, 0.64, 1],   // overshoot - web strand tension
  smooth:   [0.25, 0.1, 0.25, 1],    // standard ease-out
  snap:     [0.16, 1, 0.3, 1],       // fast in, gentle out
};

export const DURATION = {
  fast:     0.2,   // micro-interactions (hover, focus)
  normal:   0.4,   // section element entrances
  slow:     0.8,   // section-level transitions
  loader:   2.5,   // full loader sequence
};

export const STAGGER = {
  letters:  0.08,  // per letter in heading animations
  cards:    0.15,  // per project card
  orbs:     0.08,  // per skill orb
};
```

### Scroll-Triggered Animations (GSAP ScrollTrigger)

GSAP is used alongside Framer Motion. The division of responsibility is:
- **Framer Motion** - component-level enter/exit animations, hover states, layout animations
- **GSAP ScrollTrigger** - section-level pinning, SVG path drawing, parallax

GSAP ScrollTrigger setup in each section component:
```js
useEffect(() => {
  const ctx = gsap.context(() => {
    // all GSAP animations here
  }, sectionRef);

  return () => ctx.revert(); // cleanup on unmount
}, []);
```

Always use `gsap.context()` for cleanup. Never leave dangling ScrollTrigger instances.

### Custom Cursor

A custom cursor replaces the default on desktop (never on mobile - mobile has no cursor):

```jsx
// Component: src/components/Cursor/Cursor.jsx
// Two elements:
//   1. Cursor dot - 8px circle, follows mouse exactly with no lag
//   2. Cursor ring - 32px circle, follows mouse with 80ms lag (lerp)
// On hover of interactive element (button, link, card):
//   - Dot scales to 0
//   - Ring scales to 56px and changes fill to rgba(220,38,38,0.1)
// Web trail:
//   - Last 4 cursor positions stored in state array
//   - Each position renders a fading dot (opacity 0.15 → 0, duration 400ms)
```

### Reduced Motion

Wrap all animation logic in a reduced motion check:

```js
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

If `true`, skip all entrance animations and set all elements to their final state immediately. The page must be fully usable without motion.

---

## 9. Color System

### Base Palette

| Name      | Hex       | Role                                           |
|-----------|-----------|------------------------------------------------|
| Void      | `#0a0a0a` | Page background, loader background             |
| Panel     | `#1e1e2e` | Card surfaces, navigation background           |
| Web Red   | `#dc2626` | Primary accent - active states, highlights, CTA|
| Suit Blue | `#1d4ed8` | Secondary accent - links, tech tags, code      |
| Paper     | `#f1f5f9` | Primary text on dark backgrounds               |
| Silver    | `#94a3b8` | Secondary text, descriptions, captions         |
| Muted     | `#475569` | Placeholder text, footer, decorative text      |

### Usage Rules

- **Never** use Web Red on Panel background without sufficient contrast check
- **Never** use more than two accent colors on a single card
- All interactive elements that are primary actions use Web Red
- All links and secondary interactive elements use Suit Blue
- Text follows a strict hierarchy: Paper → Silver → Muted (most important → least important)

### Opacity Variants (for glass morphism surfaces)

```css
/* Card background */
background: rgba(30, 30, 46, 0.7);

/* Web strand lines */
stroke: rgba(255, 255, 255, 0.08);

/* Hover glow */
box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.4);

/* Backdrop blur surfaces (nav, modals) */
background: rgba(10, 10, 10, 0.85);
backdrop-filter: blur(12px);
```

---

## 10. Typography

### Font Stack

| Font          | Source         | Weights Used | Usage                              |
|---------------|----------------|--------------|------------------------------------|
| Bebas Neue    | Google Fonts   | 400 (only)   | Chapter headings, hero name, large display text |
| Space Grotesk | Google Fonts   | 400, 500, 700| Subheadings, labels, navigation, UI elements |
| Inter         | Google Fonts   | 400, 500     | Body copy, descriptions, paragraphs |
| JetBrains Mono| Google Fonts   | 400          | Code snippets, tech tags, terminal-style text |

### Scale

| Label        | Font          | Size (desktop) | Size (mobile) | Color     |
|--------------|---------------|----------------|---------------|-----------|
| Hero Name    | Bebas Neue    | clamp(64px, 10vw, 120px) | 56px | `#f1f5f9` |
| Chapter Heading | Bebas Neue | 56px           | 36px          | `#f1f5f9` |
| Chapter Number | Space Grotesk | 11px, spaced  | 11px         | `#dc2626` |
| Section Sub  | Space Grotesk | 18px           | 16px          | `#94a3b8` |
| Card Title   | Space Grotesk | 20px           | 18px          | `#f1f5f9` |
| Body Copy    | Inter         | 16px           | 15px          | `#94a3b8` |
| Captions / Labels | Inter   | 13px           | 12px          | `#475569` |
| Code / Tags  | JetBrains Mono| 13px           | 12px          | `#1d4ed8` |

### Line Height

- Display text (Bebas Neue): `line-height: 1.0` - tight, cinematic
- Subheadings (Space Grotesk): `line-height: 1.3`
- Body copy (Inter): `line-height: 1.7` - comfortable reading
- Code (JetBrains Mono): `line-height: 1.6`

### Loading Fonts

In `index.html` (or Next.js `_document.js`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500&family=JetBrains+Mono&display=swap" rel="stylesheet" />
```

---

## 11. Tech Stack

### Core Framework

| Technology       | Version  | Purpose                                              |
|------------------|----------|------------------------------------------------------|
| React            | 18+      | UI framework - component architecture                |
| Vite             | 5+       | Build tool - faster than CRA, simpler than Next.js for a static portfolio |

> **Note on Next.js vs Vite:** Since this is a static portfolio with no server-side data needs, Vite + React is recommended for simplicity. Use Next.js only if you plan to add a blog, CMS, or API routes (like for the contact form backend).

### Animation

| Library              | Purpose                                              |
|----------------------|------------------------------------------------------|
| Framer Motion        | Component animations, page transitions, hover states |
| GSAP + ScrollTrigger | Scroll-based animations, SVG path drawing, pinning   |
| @gsap/react          | React wrapper for GSAP to handle cleanup properly    |

Install:
```bash
npm install framer-motion gsap @gsap/react
```

### 3D Graphics

| Library       | Purpose                                              |
|---------------|------------------------------------------------------|
| Three.js      | WebGL renderer for the hero web-strand canvas        |
| @react-three/fiber | React renderer for Three.js - cleaner component syntax |
| @react-three/drei  | Helpers for Three.js (OrbitControls, etc.)          |

Install:
```bash
npm install three @react-three/fiber @react-three/drei
```

### Styling

| Technology       | Purpose                                              |
|------------------|------------------------------------------------------|
| Tailwind CSS     | Utility classes for layout and spacing               |
| CSS Modules      | Component-scoped styles for complex animations       |

> Use Tailwind for layout, spacing, and responsive design. Use CSS Modules (`.module.css` files) for complex animation keyframes and pseudo-elements that Tailwind cannot express cleanly.

### UI Utilities

| Library              | Purpose                                              |
|----------------------|------------------------------------------------------|
| react-icons          | Technology logos for skill orbs, social links        |
| react-parallax-tilt  | Card tilt effect on hover for project cards          |
| react-intersection-observer | Trigger animations when sections enter viewport |
| clsx                 | Conditional className utility                        |

Install:
```bash
npm install react-icons react-parallax-tilt react-intersection-observer clsx
```

### Contact Form

| Option A (No backend) | EmailJS - client-side email sending, free tier, no server needed |
|-----------------------|------------------------------------------------------------------|
| Option B (With backend) | Resend - email API, requires a Next.js API route or serverless function |

Recommended: **EmailJS** for simplicity since there is no backend in this project.

```bash
npm install @emailjs/browser
```

### Development Tools

| Tool             | Purpose                                              |
|------------------|------------------------------------------------------|
| ESLint           | Code quality - use `eslint-config-react-app`         |
| Prettier         | Code formatting - consistent style                   |
| Husky + lint-staged | Pre-commit hooks - auto-format before every commit |

---

## 12. Folder Structure

```
portfolio/
│
├── public/
│   ├── images/
│   │   ├── spiderman-chibi.png       ← the loader character image
│   │   └── projects/
│   │       ├── project-1.jpg
│   │       └── project-2.jpg
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Loader/
│   │   │   ├── Loader.jsx             ← full loader sequence
│   │   │   └── Loader.module.css      ← sway animation, typewriter
│   │   │
│   │   ├── Navigation/
│   │   │   ├── Navigation.jsx
│   │   │   └── Navigation.module.css
│   │   │
│   │   ├── Cursor/
│   │   │   ├── Cursor.jsx             ← custom cursor + web trail
│   │   │   └── Cursor.module.css
│   │   │
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   ├── WebCanvas.jsx          ← Three.js canvas component
│   │   │   └── Hero.module.css
│   │   │
│   │   ├── Work/
│   │   │   ├── Work.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── Work.module.css
│   │   │
│   │   ├── Skills/
│   │   │   ├── Skills.jsx
│   │   │   ├── WebSVG.jsx             ← animated spider web SVG
│   │   │   ├── SkillOrb.jsx
│   │   │   └── Skills.module.css
│   │   │
│   │   ├── Story/
│   │   │   ├── Story.jsx
│   │   │   ├── Timeline.jsx
│   │   │   └── Story.module.css
│   │   │
│   │   └── Contact/
│   │       ├── Contact.jsx
│   │       ├── ContactForm.jsx
│   │       └── Contact.module.css
│   │
│   ├── data/
│   │   ├── projects.js               ← project data array
│   │   ├── skills.js                 ← skills data array
│   │   └── timeline.js               ← timeline milestones
│   │
│   ├── lib/
│   │   ├── animations.js             ← shared animation constants
│   │   └── emailjs.js                ← email service config
│   │
│   ├── hooks/
│   │   ├── useMousePosition.js       ← cursor position tracker
│   │   └── useCountUp.js             ← stat counter animation
│   │
│   ├── styles/
│   │   └── global.css                ← CSS variables, resets, fonts
│   │
│   ├── App.jsx                       ← root component, loader state
│   └── main.jsx                      ← Vite entry point
│
├── .env                              ← EmailJS keys (never commit)
├── .gitignore
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 13. Build Order

Follow this order strictly. Do not skip ahead. Each phase produces something testable before moving to the next.

### Phase 1 - Design (Before Writing Code)

1. Open Figma (or Penpot if you prefer open source)
2. Create frames for: Loader, Hero, Work, Skills, Story, Contact
3. Apply the color system and typography from this document
4. Design the desktop version first, then mobile
5. Do not start coding until you are happy with the visual design for at least 3 sections
6. The loader is the most important frame - spend extra time here

**Deliverable:** Figma file with 6 desktop frames + 6 mobile frames

### Phase 2 - Project Scaffold

```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm install
npm install framer-motion gsap @gsap/react three @react-three/fiber @react-three/drei react-icons react-parallax-tilt react-intersection-observer clsx @emailjs/browser
npx tailwindcss init -p
```

Set up:
- `tailwind.config.js` with content paths
- `global.css` with CSS variables for all colors and fonts
- Import Google Fonts in `index.html`
- Basic folder structure from Section 12

**Deliverable:** A running `npm run dev` with a blank dark page

### Phase 3 - Loader Component

Build the loader completely before anything else. This is the most important component and it should be perfected in isolation.

Order within this phase:
1. Static layout - character image centered on black background
2. Web thread SVG - draw animation using `stroke-dashoffset`
3. Character drop - Framer Motion entrance animation
4. Sway loop - CSS animation in `Loader.module.css`
5. Typewriter dialogue - character-by-character using `useEffect` and `setTimeout`
6. Three loading dots - CSS pulse animation
7. Exit animation - swing off screen + fade out
8. Skip logic - click handler + `localStorage`
9. Return visit mini-loader - conditional render based on `localStorage`

**Deliverable:** Loader that plays completely from start to exit, skippable, with return visit handling

### Phase 4 - Static Content Sections

Build all sections in plain HTML and Tailwind with zero animations. Get the content and layout right before adding motion.

Order: Navigation → Hero → Work → Skills → Story → Contact → Footer

Use placeholder content. Do not wait for real project screenshots or final copy. Placeholder text and colored rectangles are fine at this stage.

**Deliverable:** Full page that scrolls through all 6 sections, looks correct visually, fully responsive

### Phase 5 - Three.js Hero Canvas

Add the Three.js web strand background to the Hero section:

1. Create `WebCanvas.jsx` using `@react-three/fiber`
2. Build the node-and-strand geometry
3. Add slow camera orbit
4. Add mouse interaction (strand attraction)
5. Add performance safeguard (pixel ratio cap, frame rate cap)

**Deliverable:** Hero section with live 3D web strand background

### Phase 6 - Framer Motion Layer

Add Framer Motion animations to each section in order:

1. Navigation - fade in on loader exit
2. Hero - letter swing-in for name, fade for tagline and CTAs
3. Work - card hang-and-drop entrance, hover tilt (react-parallax-tilt)
4. Story - paragraph stagger, stat counter
5. Contact - panel swing-in, form field focus effects

**Deliverable:** All Framer Motion animations working

### Phase 7 - GSAP Layer

Add GSAP ScrollTrigger animations:

1. Skills section - web SVG strand drawing
2. Skills section - orb pop-in after web draws
3. Story section - timeline strand drawing, milestone thwip-in
4. Global - scroll progress indicator (optional thin red line at top of page)

**Deliverable:** All GSAP scroll animations working

### Phase 8 - Custom Cursor

Build the cursor component:
1. Two-element cursor (dot + ring)
2. Lerp follow for the ring
3. Hover state changes
4. Web trail

**Deliverable:** Custom cursor working on desktop, hidden on mobile

### Phase 9 - Contact Form

1. Set up EmailJS account and template
2. Add `.env` file with service ID, template ID, public key
3. Wire up `ContactForm.jsx`
4. Test submission → email received
5. Build success state (thumbs-up Spidey)

**Deliverable:** Working contact form that sends real emails

### Phase 10 - Polish

- Cross-browser test (Chrome, Firefox, Safari)
- Mobile test on real device
- Check `prefers-reduced-motion`
- Lighthouse audit - target 90+ performance, 100 accessibility
- Fix any layout issues at breakpoints: 375px, 768px, 1024px, 1440px
- Add `<meta>` tags for SEO and social sharing
- Add `og:image` (a screenshot of your hero section works fine)

### Phase 11 - Deploy

```bash
npm run build
```

Deploy to **Vercel**:
1. Push to GitHub
2. Import repository in Vercel dashboard
3. Add environment variables (EmailJS keys) in Vercel project settings
4. Connect custom domain if you have one
5. Enable Vercel Analytics (free) to see visitor data

**Deliverable:** Live URL that you can share

---

## 14. Performance Rules

These rules must not be broken. A beautiful portfolio that loads in 4 seconds is a portfolio that gets closed.

### Targets

| Metric                  | Target    |
|-------------------------|-----------|
| Lighthouse Performance  | 90+       |
| First Contentful Paint  | < 1.5s    |
| Largest Contentful Paint| < 2.5s    |
| Cumulative Layout Shift | < 0.1     |
| Total bundle size       | < 500KB gzipped |

### Rules

**Images**
- All project screenshots: convert to `.webp` format, compress to under 150KB each
- Spider-Man PNG: already have it, optimize with `imagemin` or `squoosh.app` before using
- Use `loading="lazy"` on all images except the loader character image

**Three.js**
- Cap `renderer.setPixelRatio` at `Math.min(window.devicePixelRatio, 1.5)`
- Dispose of geometry and materials on component unmount: `geometry.dispose()`, `material.dispose()`
- Use `requestAnimationFrame` inside the Three.js loop - never `setInterval`

**GSAP**
- Always revert contexts on unmount: `ctx.revert()`
- Kill ScrollTrigger instances that are no longer needed
- Do not animate `width`, `height`, or `top/left` - only animate `transform` and `opacity` for GPU compositing

**Framer Motion**
- Use `will-change: transform` on elements that animate frequently
- Avoid animating too many elements simultaneously - stagger them so the browser works in sequence

**Fonts**
- Use `font-display: swap` - already set by Google Fonts
- Preconnect to Google Fonts in `<head>` - already covered in Section 10
- Only load the exact weights you use - do not load all weights

**Code Splitting**
- Heavy components (Three.js canvas, GSAP sections) should be lazy loaded:
```jsx
const WebCanvas = React.lazy(() => import('./WebCanvas'));
const Skills = React.lazy(() => import('../Skills/Skills'));
```

---

*End of Blueprint - "A Web-Slinger's Chronicle"*

*Last updated: July 2025*