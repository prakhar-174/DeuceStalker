import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import { projects, filters } from '../../data/projects';
import { EASING, STAGGER } from '../../lib/animations';
import styles from './Work.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.cards,
    },
  },
};

const cardVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASING.bounce,
    },
  },
};

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter) || p.category === activeFilter);

  return (
    <section id="work" className={styles.work}>
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
        <motion.div
          ref={ref}
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`${styles.gridItem} ${index % 3 === 0 ? styles.large : styles.small}`}
              variants={cardVariants}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
