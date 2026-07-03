import { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASING, STAGGER } from '../../lib/animations';
import styles from './Hero.module.css';

import BannerCanvas from './BannerCanvas';

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

  return (
    <section id="hero" className={styles.hero}>
      {/* Interactive Banner Background */}
      <BannerCanvas />

      {/* Floating Content Tags */}
      <div className={styles.floatingContainer}>
        {/* Eyebrow */}
        <motion.div
          className={`${styles.floatingTag} ${styles.tagTopLeft}`}
          initial={{ opacity: 0, x: -20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="text-eyebrow">{'< developer />'}</span>
        </motion.div>

        {/* Name */}
        <motion.div
          className={`${styles.floatingTag} ${styles.tagCenterRight}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className={styles.nameTag}>{NAME}</h1>
        </motion.div>

        {/* Alias */}
        <motion.div
          className={`${styles.floatingTag} ${styles.tagCenterLeft}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <span className={styles.aliasTag}>aka {ALIAS}</span>
        </motion.div>

        {/* Role tagline */}
        <motion.div
          className={`${styles.floatingTag} ${styles.tagBottomRight}`}
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <span className={styles.taglineTag}>
            Frontend Developer &nbsp;·&nbsp; Problem Solver &nbsp;·&nbsp; Web Craftsman
          </span>
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
