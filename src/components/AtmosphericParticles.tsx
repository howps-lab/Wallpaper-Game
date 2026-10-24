import React, { useEffect, useRef } from 'react';

interface ParticleProps {
  density?: 'low' | 'normal' | 'high';
}

export const AtmosphericParticles: React.FC<ParticleProps> = ({ density = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = density === 'low' ? 45 : density === 'high' ? 120 : 80;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      fadeSpeed: number;
      type: 'ember' | 'ash' | 'spark';
      oscillation: number;
      oscSpeed: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const isEmber = Math.random() < 0.35;
      const isSpark = !isEmber && Math.random() < 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isEmber ? Math.random() * 2.8 + 1 : isSpark ? Math.random() * 1.5 + 0.8 : Math.random() * 2.2 + 0.6,
        speedX: (Math.random() * 0.8 + 0.3) * (isEmber ? 1.2 : 0.8), // Wind blowing from left to right
        speedY: isEmber ? -(Math.random() * 1.2 + 0.4) : (Math.random() * 0.7 + 0.2), // Embers rise, ash falls gently
        opacity: Math.random() * 0.8,
        maxOpacity: isEmber ? Math.random() * 0.5 + 0.4 : Math.random() * 0.35 + 0.15,
        fadeSpeed: Math.random() * 0.015 + 0.005,
        type: isEmber ? 'ember' : isSpark ? 'spark' : 'ash',
        oscillation: Math.random() * Math.PI * 2,
        oscSpeed: Math.random() * 0.04 + 0.02,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Subtle global wind turbulence
      const globalWind = Math.sin(time * 0.0008) * 0.6;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.oscillation += p.oscSpeed;
        const turbulenceX = Math.cos(p.oscillation) * 0.5 + globalWind;

        p.x += (p.speedX + turbulenceX) * 60 * delta;
        p.y += p.speedY * 60 * delta;

        // Wrap around boundaries
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Pulse opacity
        p.opacity += p.fadeSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        ctx.save();
        if (p.type === 'ember') {
          // Glowing warm ember
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          gradient.addColorStop(0, `rgba(255, 175, 75, ${p.opacity})`);
          gradient.addColorStop(0.4, `rgba(198, 107, 56, ${p.opacity * 0.8})`);
          gradient.addColorStop(1, 'rgba(198, 107, 56, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Hot white-gold center
          ctx.fillStyle = `rgba(255, 235, 190, ${p.opacity * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'spark') {
          // Sharp gold spark
          ctx.fillStyle = `rgba(198, 164, 106, ${p.opacity * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Drifting grey/silver ash flake
          ctx.fillStyle = `rgba(185, 184, 176, ${p.opacity * 0.5})`;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 1.5, p.size * 0.8, p.oscillation, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-15 w-full h-full block" />;
};
