import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { milestones } from '../../data/timeline';
import { EASING } from '../../lib/animations';
import styles from './Story.module.css';

export default function Timeline({ inView }) {
  const lineRef = useRef(null);

  // GSAP line drawing
  useEffect(() => {
    if (!inView || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    });

    return () => ctx.revert();
  }, [inView]);

  return (
    <div className={styles.timeline}>
      {/* Animated vertical line */}
      <svg className={styles.timelineLine} viewBox="0 0 2 400" preserveAspectRatio="none">
        <line
          ref={lineRef}
          x1="1" y1="0" x2="1" y2="400"
          stroke="rgba(220, 38, 38, 0.4)"
          strokeWidth="2"
          strokeDasharray="400"
          strokeDashoffset="400"
        />
      </svg>

      {/* Milestones */}
      <div className={styles.milestones}>
        {milestones.map((milestone, i) => (
          <motion.div
            key={milestone.year}
            className={styles.milestone}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.5 + i * 0.2,
              duration: 0.5,
              ease: EASING.snap,
            }}
          >
            <div className={styles.milestoneDot} />
            <div className={styles.milestoneContent}>
              <span className={styles.milestoneYear}>{milestone.year}</span>
              <h4 className={styles.milestoneTitle}>{milestone.title}</h4>
              <p className={styles.milestoneDesc}>{milestone.description}</p>
              {milestone.aside && (
                <p className={styles.milestoneAside}>{milestone.aside}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
