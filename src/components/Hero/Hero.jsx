import { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASING, STAGGER } from '../../lib/animations';
import styles from './Hero.module.css';

// Lazy load Three.js canvas for performance
const WebCanvas = lazy(() => import('./WebCanvas'));

const NAME = 'PRAKHAR';
const ALIAS = 'DeuceStalker';

const letterVariants = {
  initial: { y: -40, opacity: 0, rotateZ: -8 },
  animate: (i) => ({
    y: 0,
    opacity: 1,
    rotateZ: 0,
    transition: {
      delay: i * STAGGER.letters,
      duration: 0.6,
      ease: EASING.bounce,
    },
  }),
};

export default function Hero() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Three.js Background */}
      <div className={styles.canvasWrap}>
        <Suspense fallback={null}>
          <WebCanvas />
        </Suspense>
      </div>

      {/* Foreground content */}
      <div className={styles.content}>
        {/* Eyebrow */}
        <motion.p
          className="text-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {'< developer />'}
        </motion.p>

        {/* Name - letter-by-letter animation */}
        <h1 className={styles.name}>
          {NAME.split('').map((letter, i) => (
            <motion.span
              key={i}
              className={styles.letter}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              custom={i}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Alias */}
        <motion.p
          className={styles.alias}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: NAME.length * STAGGER.letters + 0.3, duration: 0.5, ease: EASING.smooth }}
        >
          aka {ALIAS}
        </motion.p>

        {/* Role tagline */}
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: NAME.length * STAGGER.letters + 0.5, duration: 0.6 }}
        >
          Full Stack Developer &nbsp;·&nbsp; Problem Solver &nbsp;·&nbsp; Web Craftsman
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: NAME.length * STAGGER.letters + 0.8, duration: 0.5, ease: EASING.smooth }}
        >
          <button
            className={styles.btnPrimary}
            onClick={() => scrollTo('#work')}
          >
            View My Work
          </button>
          <button
            className={styles.btnOutline}
            onClick={() => scrollTo('#contact')}
          >
            Let's Talk
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ opacity: showScroll ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
        <span>scroll to enter</span>
      </motion.div>
    </section>
  );
}
