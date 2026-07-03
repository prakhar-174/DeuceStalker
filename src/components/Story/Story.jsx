import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Timeline from './Timeline';
import { stats } from '../../data/timeline';
import { useCountUp } from '../../hooks/useCountUp';
import { EASING } from '../../lib/animations';
import styles from './Story.module.css';

function StatCard({ stat, shouldAnimate }) {
  const count = useCountUp(stat.value, 2000, shouldAnimate);

  return (
    <div className={styles.statCard}>
      <span className={styles.statValue}>
        {count}{stat.suffix}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

export default function Story() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="story" className={styles.story}>
      <div className="section-wrapper" ref={ref}>
        {/* Chapter header */}
        <div className="chapter-header">
          <p className="text-chapter-number">CHAPTER 04</p>
          <h2 className="text-chapter-title">The Story.</h2>
        </div>

        <div className={styles.layout}>
          {/* Left column - Story text + Stats */}
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASING.smooth }}
          >
            <div className={styles.storyText}>
              <p>
                It started with curiosity - the kind that makes you inspect every
                website you visit. I was fascinated by how lines of code could become
                something people <em>use</em>, something people <em>feel</em>.
              </p>
              <p>
                I taught myself HTML in a weekend, wrote my first CSS layout that
                didn't break (mostly), and fell into the rabbit hole of JavaScript.
                The more I built, the more I realized: this wasn't just about code.
                It was about solving problems for real people.
              </p>
              <p>
                Now I build full-stack applications that are fast, accessible, and
                impossible to forget. I care about the craft - the animations that
                feel right, the architecture that scales, and the details that most
                people never notice but always feel.
              </p>
              <p>
                I'm currently working on projects that push the boundaries of what
                the web can do. Every line of code is a step forward.
                <span className={styles.accent}> The web is my domain. </span>
              </p>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} shouldAnimate={inView} />
              ))}
            </div>
          </motion.div>

          {/* Right column - Timeline */}
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASING.smooth }}
          >
            <Timeline inView={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
