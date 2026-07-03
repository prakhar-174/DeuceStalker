import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import styles from './Contact.module.css';

const quickLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Story', href: '#story' },
  { label: 'Back to Top', href: '#hero' },
];

const socialLinks = [
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiTwitter, href: '#', label: 'Twitter / X' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiGithub, href: '#', label: 'GitHub' },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const scrollTo = (href, e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className={styles.contactFooter} ref={ref}>
      <div className={styles.footerInner}>
        {/* Left Column - Brand */}
        <motion.div 
          className={styles.brandCol}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.logo}>
            <span className={styles.logoWhite}>Deuce</span>
            <span className={styles.logoRed}>Stalker</span>
          </div>
          <p className={styles.brandDesc}>
            A passionate Frontend Developer and Web Craftsman focused on building innovative, performant, and beautifully designed web experiences.
          </p>
        </motion.div>

        {/* Middle Column - Quick Links */}
        <motion.div 
          className={styles.linksCol}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linksList}>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={(e) => scrollTo(link.href, e)} className={styles.footerLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column - Stay Updated */}
        <motion.div 
          className={styles.infoCol}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className={styles.colTitle}>Stay Updated</h4>
          <p className={styles.infoText}>
            Ghaziabad, Uttar Pradesh, India
          </p>
          <p className={styles.infoText}>
            hello@deucestalker.dev
          </p>
          <div className={styles.socialIcons}>
            {socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconBtn}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Prakhar (DeuceStalker). All rights reserved.</p>
      </div>
    </footer>
  );
}
