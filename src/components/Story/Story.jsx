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
                My journey into tech began with a drive to solve real-world problems. What started as curiosity quickly evolved into a passion for building systems that make a tangible impact.
              </p>
              <p>
                Through intense hackathons and late-night coding sessions, I honed my ability to rapidly prototype and architect full-stack solutions. Winning my first hackathon wasn't just a milestone, it was the spark that pushed me to think bigger.
              </p>
              <p>
                Today, I focus on innovating at the intersection of AI, education, and agriculture. From qualifying GATE in CS/IT to filing multiple patents for platforms like SkillForge and AgriConnect, I believe in building technology that scales and empowers users.
              </p>
              <p>
                Every project I take on is an opportunity to push the boundaries of what's possible. I don't just write code; I engineer solutions.
                <span className={styles.accent}> Innovation is my domain. </span>
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
