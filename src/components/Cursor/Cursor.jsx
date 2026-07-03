import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trail = useRef([]);
  const rafId = useRef(null);

  // Detect touch devices
  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Mouse tracking + lerp animation
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      // Dot follows exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }

      // Ring follows with lerp (80ms lag feel)
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }

      // Web trail - last 4 positions
      trail.current.push({ x: mouse.current.x, y: mouse.current.y, time: Date.now() });
      if (trail.current.length > 4) trail.current.shift();

      // Update trail dots
      trailRefs.current.forEach((ref, i) => {
        if (ref && trail.current[i]) {
          const age = Date.now() - trail.current[i].time;
          const opacity = Math.max(0, 0.15 - (age / 400) * 0.15);
          ref.style.transform = `translate(${trail.current[i].x - 3}px, ${trail.current[i].y - 3}px)`;
          ref.style.opacity = opacity;
        }
      });

      rafId.current = requestAnimationFrame(animate);
    };

    // Hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, [data-cursor-hover]');
      setIsHovering(!!target);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className={styles.cursorContainer}>
      {/* Trail dots */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className={styles.trail}
        />
      ))}

      {/* Main dot */}
      <div
        ref={dotRef}
        className={`${styles.dot} ${isHovering ? styles.dotHover : ''}`}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className={`${styles.ring} ${isHovering ? styles.ringHover : ''}`}
      />
    </div>
  );
}
