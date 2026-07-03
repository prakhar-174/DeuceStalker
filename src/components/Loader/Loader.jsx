import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';
const DIALOGUE_LINES = [
  "Hey there, Developer.",
  "Loading the web... (pun intended)",
];
const TYPE_SPEED = 60;
const PAUSE_BETWEEN_LINES = 400;
export default function Loader({ onComplete }) {
  const [step, setStep] = useState(0);
  const [dialogueText, setDialogueText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [isSkippable, setIsSkippable] = useState(false);
  const skipRef = useRef(false);
  const hasVisited = useRef(false);
  // Check for return visit
  useEffect(() => {
    hasVisited.current = localStorage.getItem('deucestalker_visited') === 'true';
  }, []);
  // Mini-loader for return visits
  const runMiniLoader = useCallback(() => {
    setStep(3); // Jump to character visible
    setTimeout(() => {
      triggerExit();
    }, 800);
  }, []);
  // Main loader sequence
  useEffect(() => {
    if (hasVisited.current) {
      runMiniLoader();
      return;
    }
    const timers = [];
    // Step 1: Black screen (200ms)
    timers.push(setTimeout(() => setStep(1), 200));
    // Step 2: Web thread drops (600ms)
    timers.push(setTimeout(() => setStep(2), 800));
    // Step 3: Spider-Man drops in (800ms)
    timers.push(setTimeout(() => setStep(3), 1600));
    // Step 4: Character settles, becomes skippable
    timers.push(setTimeout(() => {
      setStep(4);
      setIsSkippable(true);
    }, 2400));
    // Step 5: Start dialogue
    timers.push(setTimeout(() => setStep(5), 2800));
    return () => timers.forEach(clearTimeout);
  }, [runMiniLoader]);
  // Typewriter effect
  useEffect(() => {
    if (step < 5 || currentLine >= DIALOGUE_LINES.length) return;
    const line = DIALOGUE_LINES[currentLine];
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (skipRef.current) {
        clearInterval(typeInterval);
        return;
      }
      charIndex++;
      setDialogueText(line.substring(0, charIndex));
      if (charIndex >= line.length) {
        clearInterval(typeInterval);
        if (currentLine < DIALOGUE_LINES.length - 1) {
          setTimeout(() => {
            setDialogueText('');
            setCurrentLine(prev => prev + 1);
          }, PAUSE_BETWEEN_LINES);
        } else {
          // All lines done — show dots
          setTimeout(() => setShowDots(true), PAUSE_BETWEEN_LINES);
          // Auto-exit after dots
          setTimeout(() => triggerExit(), 2000);
        }
      }
    }, TYPE_SPEED);
    return () => clearInterval(typeInterval);
  }, [step, currentLine]);
  const triggerExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    skipRef.current = true;
    localStorage.setItem('deucestalker_visited', 'true');
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [exiting, onComplete]);
  // Skip handler
  useEffect(() => {
    if (!isSkippable) return;
    const handleSkip = () => triggerExit();
    window.addEventListener('click', handleSkip);
    window.addEventListener('keydown', handleSkip);
    return () => {
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [isSkippable, triggerExit]);
  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          className={styles.loader}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Web thread */}
          {step >= 1 && (
            <svg
              className={styles.webThread}
              viewBox="0 0 4 500"
              preserveAspectRatio="none"
            >
              <path
                d="M2 0 Q3 125 2 250 Q1 375 2 500"
                fill="none"
                stroke="rgba(241, 245, 249, 0.5)"
                strokeWidth="1.5"
                className={step >= 1 ? styles.threadDraw : ''}
              />
            </svg>
          )}
          {/* Spider-Man character */}
          {step >= 2 && (
            <motion.div
              className={styles.character}
              initial={{ y: -300, opacity: 0 }}
              animate={{
                y: step >= 3 ? 0 : -300,
                opacity: step >= 2 ? 1 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <div className={`${styles.characterInner} ${step >= 4 ? styles.sway : ''} ${hasVisited.current ? styles.thumbsUp : ''}`}>
                <img
                  src="/spiderman.png"
                  alt="Spider-Man"
                  className={styles.spideyImg}
                  width="120"
                  height="120"
                />
              </div>
            </motion.div>
          )}
          {/* Dialogue */}
          {step >= 5 && !hasVisited.current && (
            <motion.div
              className={styles.dialogue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className={styles.typewriter}>
                {dialogueText}
                <span className={styles.cursor}>|</span>
              </p>
            </motion.div>
          )}
          {/* Loading dots */}
          {showDots && (
            <div className={styles.dots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          )}
          {/* Skip hint */}
          {isSkippable && !hasVisited.current && (
            <motion.p
              className={styles.skipHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              click anywhere to skip
            </motion.p>
          )}
        </motion.div>
      ) : (
        /* Exit animation — swing off */
        <motion.div
          className={styles.loader}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.character}>
            <div className={styles.characterInner}>
              <img
                src="/spiderman.png"
                alt=""
                className={styles.spideyImg}
                width="120"
                height="120"
              />
            </div>
          </div>
          {/* Exit web strand — shoots to top-right */}
          <svg className={styles.exitWeb} viewBox="0 0 200 200">
            <line
              x1="100" y1="100"
              x2="200" y2="0"
              stroke="rgba(241, 245, 249, 0.4)"
              strokeWidth="1"
              className={styles.exitStrand}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}