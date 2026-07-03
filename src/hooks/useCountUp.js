import { useState, useEffect, useCallback } from 'react';

/**
 * Animates a number from 0 to `end` over `duration` ms
 * using requestAnimationFrame for smooth counting.
 * Only starts when `shouldStart` is true.
 */
export function useCountUp(end, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    if (!shouldStart) return;

    let startTime = null;
    let rafId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out quad for natural deceleration
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, shouldStart]);

  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  return count;
}
