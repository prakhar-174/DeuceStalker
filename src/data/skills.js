// Skills data
// ring: 'inner' (core), 'middle' (secondary), 'outer' (tools)
export const skills = [
  // Inner ring - Core Skills
  { id: 'cplusplus', name: 'C++', ring: 'inner', proficiency: 85, years: 4, icon: 'SiCplusplus' },
  { id: 'javascript', name: 'JavaScript', ring: 'inner', proficiency: 90, years: 4, icon: 'SiJavascript' },
  { id: 'react', name: 'React', ring: 'inner', proficiency: 85, years: 3, icon: 'SiReact' },
  { id: 'python', name: 'Python', ring: 'inner', proficiency: 80, years: 3, icon: 'SiPython' },
  { id: 'typescript', name: 'TypeScript', ring: 'inner', proficiency: 75, years: 2, icon: 'SiTypescript' },

  // Middle ring - Secondary Skills
  { id: 'tailwind', name: 'Tailwind CSS', ring: 'middle', proficiency: 90, years: 3, icon: 'SiTailwindcss' },
  { id: 'shadcn', name: 'Shadcn/UI', ring: 'middle', proficiency: 80, years: 1, icon: 'SiRadixui' },
  { id: 'framer', name: 'Framer Motion', ring: 'middle', proficiency: 75, years: 1, icon: 'SiFramer' },
  { id: 'postgresql', name: 'PostgreSQL', ring: 'middle', proficiency: 70, years: 2, icon: 'SiPostgresql' },
  { id: 'sql', name: 'SQL', ring: 'middle', proficiency: 80, years: 3, icon: 'SiMysql' },
  { id: 'jwtauth', name: 'JWT Auth', ring: 'middle', proficiency: 80, years: 2, icon: 'SiJsonwebtokens' },

  // Outer ring - Tools & Technologies
  { id: 'git', name: 'Git', ring: 'outer', proficiency: 85, years: 4, icon: 'SiGit' },
  { id: 'github', name: 'GitHub', ring: 'outer', proficiency: 85, years: 4, icon: 'SiGithub' },
  { id: 'docker', name: 'Docker', ring: 'outer', proficiency: 65, years: 1, icon: 'SiDocker' },
  { id: 'vercel', name: 'Vercel', ring: 'outer', proficiency: 85, years: 2, icon: 'SiVercel' },
  { id: 'groq', name: 'Groq API', ring: 'outer', proficiency: 70, years: 1, icon: 'SiFastapi' },
];

export const ringLabels = {
  inner: 'Core',
  middle: 'Secondary',
  outer: 'Tools',
};
