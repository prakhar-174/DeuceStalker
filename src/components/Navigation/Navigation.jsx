import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import styles from './Navigation.module.css';

const navLinks = [
  { label: 'Work', target: '#work' },
  { label: 'Skills', target: '#skills' },
  { label: 'Story', target: '#story' },
  { label: 'Contact', target: '#contact' },
];

const socialLinks = [
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/prakhar-tiwari1908/', label: 'LinkedIn' },
  { icon: FiTwitter, href: 'https://x.com/tPrakhar19', label: 'Twitter / X' },
  { icon: FiMail, href: 'mailto:prakhartiwari1931@gmail.com', label: 'Email' },
  { icon: FiGithub, href: 'https://github.com/prakhar-174/', label: 'GitHub' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scroll handler for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id], footer[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
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
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${mobileOpen ? styles.navOpen : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <button
            className={styles.logo}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            P<span className={styles.logoAccent}>.</span>
          </button>

          {/* Desktop Links */}
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.target}
                  className={`${styles.link} ${activeSection === link.target ? styles.activeLink : ''}`}
                  onClick={(e) => handleNavClick(e, link.target)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger Morphing Icon */}
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
      </nav>

      {/* Dimmed Backdrop */}
      <div 
        className={`${styles.backdrop} ${mobileOpen ? styles.open : ''}`} 
        onClick={() => setMobileOpen(false)}
      />

      {/* Side Panel */}
      <div className={`${styles.sidePanel} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.webLine} />
        
        <ul className={styles.panelLinks}>
          {navLinks.map((link, index) => (
            <li 
              key={link.label} 
              className={styles.navItem}
              style={{ transitionDelay: mobileOpen ? `${100 + index * 50}ms` : '0ms' }}
            >
              <a
                href={link.target}
                className={`${styles.navLink} ${activeSection === link.target ? styles.active : ''}`}
                onClick={(e) => handleNavClick(e, link.target)}
              >
                <span className={styles.navNum}>0{index + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div 
          className={styles.panelFooter} 
          style={{ 
            transitionDelay: mobileOpen ? `${100 + navLinks.length * 50 + 50}ms` : '0ms', 
            opacity: mobileOpen ? 1 : 0, 
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)' 
          }}
        >
          <p className={styles.panelName}>Prakhar Tiwari</p>
          <a href="mailto:prakhartiwari1931@gmail.com" className={styles.panelEmail}>
            prakhartiwari1931@gmail.com
          </a>
          <div className={styles.panelSocials}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.panelSocialIcon}
                aria-label={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
