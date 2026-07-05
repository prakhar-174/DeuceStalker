import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import { projects, filters } from '../../data/projects';
import styles from './Work.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter) || p.category === activeFilter);

  // Setup GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  const getGridClass = (project) => {
    if (activeFilter !== 'All') return styles.defaultSpan;
    if (project.title === 'AarogyaAI') return styles.span7;
    if (project.title === 'MediSlot') return styles.span5;
    if (project.title === 'SkillForge') return `${styles.span6} ${styles.orderLast}`;
    if (project.title === 'AgriConnect') return styles.span3;
    if (project.title === 'TechBridge') return styles.span3;
    return styles.defaultSpan;
  };

  return (
    <section id="work" className={styles.work} ref={containerRef}>
      <div className="section-wrapper">
        {/* Chapter header */}
        <div className="chapter-header">
          <p className="text-chapter-number">CHAPTER 02</p>
          <h2 className="text-chapter-title">The Work.</h2>
        </div>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`${styles.gridItem} ${getGridClass(project)}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
