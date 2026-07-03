import Tilt from 'react-parallax-tilt';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import styles from './Work.module.css';

export default function ProjectCard({ project }) {
  const { title, description, tags, liveUrl, githubUrl } = project;

  return (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor="#dc2626"
      glareBorderRadius="16px"
      scale={1.01}
      transitionSpeed={400}
    >
      <div className={styles.card}>
        {/* Project image placeholder - gradient */}
        <div className={styles.cardImage}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>{'</>'}</span>
          </div>
        </div>

        {/* Content */}
        <div className={styles.cardContent}>
          {/* Tech tags */}
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className={styles.cardTitle}>{title}</h3>

          {/* Description */}
          <p className={styles.cardDesc}>{description}</p>

          {/* Links */}
          <div className={styles.cardLinks}>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              <FiExternalLink size={14} />
              Live Site
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              <FiGithub size={14} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
