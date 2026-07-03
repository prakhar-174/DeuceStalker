import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillOrb from './SkillOrb';
import { skills, ringLabels } from '../../data/skills';
import { EASING, STAGGER } from '../../lib/animations';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

// Position orbs on a spider web pattern
function getOrbPositions(skillsList, centerX, centerY, radius) {
  const rings = { inner: [], middle: [], outer: [] };
  skillsList.forEach(s => rings[s.ring].push(s));

  const positions = [];
  const ringRadii = { inner: radius * 0.3, middle: radius * 0.6, outer: radius * 0.9 };

  Object.entries(rings).forEach(([ring, ringSkills]) => {
    const r = ringRadii[ring];
    ringSkills.forEach((skill, i) => {
      const angle = (i / ringSkills.length) * Math.PI * 2 - Math.PI / 2;
      positions.push({
        ...skill,
        x: centerX + Math.cos(angle) * r,
        y: centerY + Math.sin(angle) * r,
      });
    });
  });

  return positions;
}

export default function Skills() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const [webDrawn, setWebDrawn] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  // SVG dimensions
  const svgSize = 600;
  const center = svgSize / 2;
  const orbPositions = getOrbPositions(skills, center, center, center - 40);

  // GSAP web drawing animation
  useEffect(() => {
    if (!inView || !svgRef.current) return;

    const ctx = gsap.context(() => {
      // Animate spokes
      gsap.to('.spoke-path', {
        strokeDashoffset: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.inOut',
        onComplete: () => {
          // Animate rings after spokes
          gsap.to('.ring-path', {
            strokeDashoffset: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.inOut',
            onComplete: () => setWebDrawn(true),
          });
        },
      });
    }, svgRef);

    return () => ctx.revert();
  }, [inView]);

  // Generate SVG web paths
  const spokes = 8;
  const rings = 4;
  const maxRadius = center - 40;

  const spokePaths = Array.from({ length: spokes }, (_, i) => {
    const angle = (i / spokes) * Math.PI * 2;
    const x = center + Math.cos(angle) * maxRadius;
    const y = center + Math.sin(angle) * maxRadius;
    return `M${center},${center} L${x},${y}`;
  });

  const ringPaths = Array.from({ length: rings }, (_, i) => {
    const r = maxRadius * ((i + 1) / rings);
    const points = Array.from({ length: spokes }, (_, j) => {
      const angle = (j / spokes) * Math.PI * 2;
      // Slight irregularity for organic feel
      const wobble = r + (Math.sin(j * 3.7 + i * 2.1) * 6);
      const x = center + Math.cos(angle) * wobble;
      const y = center + Math.sin(angle) * wobble;
      return `${x},${y}`;
    });
    return `M${points[0]} L${points.slice(1).join(' L')} Z`;
  });

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <div className="section-wrapper" ref={ref}>
        {/* Chapter header */}
        <div className="chapter-header">
          <p className="text-chapter-number">CHAPTER 03</p>
          <h2 className="text-chapter-title">The Skills.</h2>
        </div>

        {/* Web + Orbs container */}
        <div className={styles.webContainer}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className={styles.webSvg}
          >
            {/* Spokes */}
            {spokePaths.map((d, i) => {
              const len = maxRadius;
              return (
                <path
                  key={`spoke-${i}`}
                  className="spoke-path"
                  d={d}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                  strokeDasharray={len}
                  strokeDashoffset={len}
                />
              );
            })}

            {/* Rings */}
            {ringPaths.map((d, i) => {
              // Approximate ring circumference
              const r = maxRadius * ((i + 1) / rings);
              const circumference = 2 * Math.PI * r;
              return (
                <path
                  key={`ring-${i}`}
                  className="ring-path"
                  d={d}
                  fill="none"
                  stroke="rgba(220, 38, 38, 0.12)"
                  strokeWidth="1"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference}
                />
              );
            })}
          </svg>

          {/* Skill Orbs */}
          {webDrawn && orbPositions.map((skill, i) => (
            <motion.div
              key={skill.id}
              className={styles.orbWrapper}
              style={{
                left: `${(skill.x / svgSize) * 100}%`,
                top: `${(skill.y / svgSize) * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: i * STAGGER.orbs,
                duration: 0.4,
                ease: EASING.bounce,
              }}
            >
              <SkillOrb skill={skill} />
            </motion.div>
          ))}

          {/* Ring labels */}
          {webDrawn && (
            <>
              <span className={styles.ringLabel} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -120%)' }}>
                Core
              </span>
              <span className={styles.ringLabel} style={{ top: '22%', left: '50%', transform: 'translateX(-50%)' }}>
                Secondary
              </span>
              <span className={styles.ringLabel} style={{ top: '5%', left: '50%', transform: 'translateX(-50%)' }}>
                Tools
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
