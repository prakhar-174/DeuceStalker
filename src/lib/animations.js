// Shared animation constants - "A Web-Slinger's Chronicle"
// Used by both Framer Motion and GSAP across all components

export const EASING = {
  bounce: [0.34, 1.56, 0.64, 1],   // overshoot - web strand tension
  smooth: [0.25, 0.1, 0.25, 1],    // standard ease-out
  snap: [0.16, 1, 0.3, 1],       // fast in, gentle out
};

export const DURATION = {
  fast: 0.2,   // micro-interactions (hover, focus)
  normal: 0.4,   // section element entrances
  slow: 0.8,   // section-level transitions
  loader: 2.5,   // full loader sequence
};

export const STAGGER = {
  letters: 0.08,  // per letter in heading animations
  cards: 0.15,  // per project card
  orbs: 0.08,  // per skill orb
};

// Framer Motion variant presets
export const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: DURATION.normal, ease: EASING.smooth },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.normal, ease: EASING.smooth },
};

export const cardDrop = {
  initial: { y: 80, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: DURATION.slow, ease: EASING.bounce },
};

export const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: DURATION.normal, ease: EASING.bounce },
};

// Container variants for staggered children
export const staggerContainer = (stagger = STAGGER.cards) => ({
  animate: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  },
});
