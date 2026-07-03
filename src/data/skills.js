// Skills data - replace with your actual skills
// ring: 'inner' (core), 'middle' (secondary), 'outer' (tools)
export const skills = [
  // Inner ring - Core Skills
  { id: 'react', name: 'React', ring: 'inner', proficiency: 85, years: 3, icon: 'SiReact' },
  { id: 'javascript', name: 'JavaScript', ring: 'inner', proficiency: 90, years: 4, icon: 'SiJavascript' },
  { id: 'nodejs', name: 'Node.js', ring: 'inner', proficiency: 80, years: 3, icon: 'SiNodedotjs' },
  { id: 'typescript', name: 'TypeScript', ring: 'inner', proficiency: 75, years: 2, icon: 'SiTypescript' },

  // Middle ring - Secondary Skills
  { id: 'python', name: 'Python', ring: 'middle', proficiency: 70, years: 3, icon: 'SiPython' },
  { id: 'mongodb', name: 'MongoDB', ring: 'middle', proficiency: 72, years: 2, icon: 'SiMongodb' },
  { id: 'postgresql', name: 'PostgreSQL', ring: 'middle', proficiency: 65, years: 2, icon: 'SiPostgresql' },
  { id: 'nextjs', name: 'Next.js', ring: 'middle', proficiency: 70, years: 2, icon: 'SiNextdotjs' },
  { id: 'tailwind', name: 'Tailwind', ring: 'middle', proficiency: 85, years: 2, icon: 'SiTailwindcss' },
  { id: 'express', name: 'Express', ring: 'middle', proficiency: 78, years: 3, icon: 'SiExpress' },

  // Outer ring - Tools & Technologies
  { id: 'git', name: 'Git', ring: 'outer', proficiency: 85, years: 4, icon: 'SiGit' },
  { id: 'docker', name: 'Docker', ring: 'outer', proficiency: 55, years: 1, icon: 'SiDocker' },
  { id: 'firebase', name: 'Firebase', ring: 'outer', proficiency: 65, years: 2, icon: 'SiFirebase' },
  { id: 'figma', name: 'Figma', ring: 'outer', proficiency: 60, years: 2, icon: 'SiFigma' },
  { id: 'vercel', name: 'Vercel', ring: 'outer', proficiency: 60, years: 2, icon: 'SiVercel' },
  { id: 'linux', name: 'Linux', ring: 'outer', proficiency: 70, years: 3, icon: 'SiLinux' },
];

export const ringLabels = {
  inner: 'Core',
  middle: 'Secondary',
  outer: 'Tools',
};
