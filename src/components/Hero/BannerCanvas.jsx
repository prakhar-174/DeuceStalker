import { useRef, useEffect } from 'react';
import styles from './Hero.module.css';

export default function BannerCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const bgImg = new Image();
    bgImg.src = '/banner.svg';

    let drawWidth, drawHeight, offsetX, offsetY;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBanner();
    };

    const drawBanner = () => {
      if (!bgImg.complete) return;
      ctx.globalCompositeOperation = 'source-over';

      const imgRatio = bgImg.width / bgImg.height;
      const canvasRatio = canvas.width / canvas.height;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgImg, offsetX, offsetY, drawWidth, drawHeight);
    };

    bgImg.onload = resize;
    window.addEventListener('resize', resize);

    // Throttle / Raf for smooth erasing
    let isDrawing = false;
    let mouseX = 0;
    let mouseY = 0;

    const renderErase = () => {
      if (isDrawing) {
        // Erase only in the center region (Spiderman character area)
        // Adjust the radius/bounding box as needed. We'll use a radius from center.
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Character is in the center. We'll allow erasing if mouse is within 400px of center.
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < window.innerWidth * 0.4) {
          ctx.globalCompositeOperation = 'destination-out';
          const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
          grad.addColorStop(0, 'rgba(0,0,0,1)');
          grad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 120, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(renderErase);
    };

    requestAnimationFrame(renderErase);

    const handleMouseMove = (e) => {
      isDrawing = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Reset opacity if it was animating
      canvas.style.transition = 'none';
      canvas.style.opacity = 1;
    };

    const handleMouseLeave = () => {
      isDrawing = false;
      // Smooth restore
      canvas.style.transition = 'opacity 0.8s ease';
      canvas.style.opacity = 0;

      setTimeout(() => {
        drawBanner();
        canvas.style.transition = 'opacity 0.4s ease';
        canvas.style.opacity = 1;
      }, 800);
    };

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className={styles.bannerContainer}>
      <img src="/banner_profile.svg" alt="Profile Background" className={styles.bannerProfile} />
      <canvas ref={canvasRef} className={styles.bannerCanvas} />
    </div>
  );
}
