import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Navigation.module.css';

const navLinks = [
  { label: 'Work', target: '#work' },
  { label: 'Skills', target: '#skills' },
  { label: 'Story', target: '#story' },
  { label: 'Contact', target: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, target) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.inner}>
        {/* Logo / Initials */}
        <button
          className={styles.logo}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          P<span className={styles.logoAccent}>.</span>
        </button>

        {/* Desktop links */}
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.target}
                className={styles.link}
                onClick={(e) => handleNavClick(e, link.target)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className={styles.mobileMenu}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.target}
              className={styles.mobileLink}
              onClick={(e) => handleNavClick(e, link.target)}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
