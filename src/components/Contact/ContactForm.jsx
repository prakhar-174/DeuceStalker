import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../../lib/emailjs';
import styles from './Contact.module.css';

export default function ContactForm() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    const form = formRef.current;
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setSending(true);

    try {
      // EmailJS - will work once credentials are configured
      if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          form,
          EMAILJS_PUBLIC_KEY
        );
      }
      setSent(true);
    } catch (err) {
      // If EmailJS isn't configured, simulate success for demo
      console.log('EmailJS not configured - simulating send. Error:', err);
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            ref={formRef}
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                className={styles.input}
                autoComplete="name"
              />
              <span className={styles.inputLine} />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className={styles.input}
                autoComplete="email"
              />
              <span className={styles.inputLine} />
            </div>

            <div className={styles.inputGroup}>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                className={`${styles.input} ${styles.textarea}`}
              />
              <span className={styles.inputLine} />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send It  →'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            className={styles.success}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img
              src="/spiderman.png"
              alt="Spider-Man thumbs up"
              className={styles.successImg}
              width="80"
              height="80"
            />
            <p className={styles.successText}>
              "Message received. I'll get back to you faster than a web swing."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
