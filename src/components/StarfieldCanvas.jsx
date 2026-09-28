import React, { useEffect, useRef } from 'react';

export default function StarfieldCanvas({ weatherType = 'rain', mousePos = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = 180;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      layer: Math.random() * 2 + 1, // depth for parallax
      hue: Math.random() > 0.8 ? (Math.random() > 0.5 ? 180 : 310) : 220, // cyan/magenta/blue tints
    }));

    // Generate zero-G floating atmospheric particles / droplets
    const particleCount = weatherType === 'rain' ? 45 : 25;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: weatherType === 'rain' ? Math.random() * 6 + 2.5 : Math.random() * 3 + 1,
      baseAlpha: Math.random() * 0.4 + 0.2,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      color: weatherType === 'rain' 
        ? 'rgba(0, 240, 255,' 
        : weatherType === 'storm' 
          ? 'rgba(255, 0, 122,' 
          : 'rgba(168, 85, 247,',
    }));

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation for parallax
      targetMouseX = (mousePos.x / (window.innerWidth || 1) - 0.5) * 40;
      targetMouseY = (mousePos.y / (window.innerHeight || 1) - 0.5) * 40;
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Draw faint cosmic nebula dust
      const grad1 = ctx.createRadialGradient(
        width * 0.3 + currentMouseX * 1.5,
        height * 0.4 + currentMouseY * 1.5,
        10,
        width * 0.3,
        height * 0.4,
        width * 0.5
      );
      grad1.addColorStop(0, 'rgba(121, 40, 202, 0.12)');
      grad1.addColorStop(0.6, 'rgba(0, 240, 255, 0.04)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 - currentMouseX,
        height * 0.7 - currentMouseY,
        20,
        width * 0.75,
        height * 0.7,
        width * 0.45
      );
      grad2.addColorStop(0, 'rgba(255, 0, 122, 0.08)');
      grad2.addColorStop(0.7, 'rgba(5, 5, 10, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw stars with parallax
      stars.forEach((star) => {
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
        const boundedAlpha = Math.max(0.1, Math.min(1, star.alpha));
        const px = star.x + currentMouseX * (star.layer * 0.3);
        const py = star.y + currentMouseY * (star.layer * 0.3);

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 80%, 75%, ${boundedAlpha})`;
        ctx.shadowBlur = star.size > 1.4 ? 6 : 0;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 70%, 0.8)`;
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Render floating Zero-G droplets / atmospheric spheres
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around screen edges like floating in zero gravity
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const currentAlpha = p.baseAlpha + Math.sin(p.pulse) * 0.15;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.5;

        // Floating spherical liquid bubble / droplet with specular highlight
        const bubbleGrad = ctx.createRadialGradient(
          p.x - currentRadius * 0.3,
          p.y - currentRadius * 0.3,
          currentRadius * 0.1,
          p.x,
          p.y,
          currentRadius
        );
        bubbleGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        bubbleGrad.addColorStop(0.3, `${p.color} ${Math.min(1, currentAlpha * 1.5)})`);
        bubbleGrad.addColorStop(0.85, `${p.color} ${Math.min(1, currentAlpha * 0.6)})`);
        bubbleGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = bubbleGrad;
        ctx.fill();

        // Inner refracted rim
        ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.8})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weatherType, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
