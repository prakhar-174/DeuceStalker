import { useState } from 'react';
import {
  SiReact, SiJavascript, SiNodedotjs, SiTypescript,
  SiPython, SiMongodb, SiPostgresql, SiNextdotjs,
  SiTailwindcss, SiExpress, SiGit, SiDocker,
  SiFirebase, SiFigma, SiVercel, SiLinux,
} from 'react-icons/si';
import styles from './Skills.module.css';

const iconMap = {
  SiReact, SiJavascript, SiNodedotjs, SiTypescript,
  SiPython, SiMongodb, SiPostgresql, SiNextdotjs,
  SiTailwindcss, SiExpress, SiGit, SiDocker,
  SiFirebase, SiFigma, SiVercel, SiLinux,
};

export default function SkillOrb({ skill }) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[skill.icon];

  return (
    <div
      className={styles.orb}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`${styles.orbCircle} ${hovered ? styles.orbHovered : ''}`}>
        {Icon && <Icon size={24} />}
      </div>
      <span className={styles.orbLabel}>{skill.name}</span>

      {/* Tooltip */}
      {hovered && (
        <div className={styles.tooltip}>
          <strong>{skill.name}</strong>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${skill.proficiency}%` }}
            />
          </div>
          <span className={styles.tooltipMeta}>
            {skill.proficiency}% · {skill.years}yr{skill.years > 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
}
