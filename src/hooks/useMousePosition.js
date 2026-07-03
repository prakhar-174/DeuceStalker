import { useState, useEffect, useRef } from 'react';

/**
 * Tracks mouse position with optional lerp smoothing.
 * Returns { x, y } for cursor position.
 * Only active on non-touch devices.
 */
export function useMousePosition(smooth = false, lerpFactor = 0.15) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };

      if (!smooth) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (smooth) {
      const animate = () => {
        current.current.x += (target.current.x - current.current.x) * lerpFactor;
        current.current.y += (target.current.y - current.current.y) * lerpFactor;
        setPosition({
          x: Math.round(current.current.x * 10) / 10,
          y: Math.round(current.current.y * 10) / 10,
        });
        rafId.current = requestAnimationFrame(animate);
      };
      rafId.current = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [smooth, lerpFactor]);

  return position;
}
