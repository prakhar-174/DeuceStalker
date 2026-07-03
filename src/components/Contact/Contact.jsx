import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactForm from './ContactForm';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { EASING } from '../../lib/animations';
import styles from './Contact.module.css';

const socialLinks = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiTwitter, href: '#', label: 'Twitter / X' },
  { icon: FiMail, href: 'mailto:hello@deucestalker.dev', label: 'Email' },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="contact" className={styles.contact}>
      <div className="section-wrapper" ref={ref}>
        {/* Chapter header */}
        <div className="chapter-header">
          <p className="text-chapter-number">CHAPTER 05</p>
          <h2 className="text-chapter-title">The Contact.</h2>
        </div>

        <div className={styles.layout}>
          {/* Headline */}
          <motion.div
            className={styles.headline}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASING.smooth }}
          >
            <h3 className={styles.signalText}>
              Your signal has been received.
            </h3>
            <p className={styles.subtext}>
              Whether you have a project in mind, a question to ask,
              or just want to say hello - I am listening.
            </p>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASING.smooth }}
          >
            <ContactForm />
          </motion.div>

          {/* Social Links */}
          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Built with React, Three.js & too much coffee &nbsp;·&nbsp; © {new Date().getFullYear()} Prakhar
        </p>
      </footer>
    </section>
  );
}
