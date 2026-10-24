import React, { useEffect, useRef, useState } from 'react';

interface DragonFlightProps {
  opacity?: number;
  speedMultiplier?: number;
}

export const DragonFlight: React.FC<DragonFlightProps> = ({
  opacity = 1,
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dragonTelemetry, setDragonTelemetry] = useState<{
    alt: number;
    distance: string;
    heading: number;
  }>({ alt: 3420, distance: 'Far Ridge', heading: 284 });

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

    // Orbital configuration around citadel (citadel is slightly right of center ~ 62% width, 38% height)
    let orbitAngle = 0;
    const orbitPeriod = 36; // seconds for complete 360 degree orbit
    let lastTime = performance.now();

    // Dragon ember breath particles
    const dragonEmbers: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }> = [];

    const drawDragon = (
      ctx: CanvasRenderingContext2D,
      screenX: number,
      screenY: number,
      scale: number,
      angle: number, // heading angle in radians
      bankAngle: number, // roll/bank
      flapPhase: number,
      depthFade: number,
      isOccluded: boolean
    ) => {
      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(angle);

      // Depth haze & atmospheric fog integration
      ctx.globalAlpha = Math.max(0.08, depthFade * opacity);

      // Shadow / silhouette gradient with subtle rim light
      const scaleX = scale;
      const scaleY = scale * (0.8 + 0.2 * Math.cos(bankAngle));

      ctx.scale(scaleX, scaleY);

      // Dragon color palette: Obsidian dark body, weathered charcoal wing membrane, faint rim light
      const bodyColor = depthFade > 0.6 ? '#14171C' : '#232932';
      const wingColor = depthFade > 0.6 ? 'rgba(21, 25, 30, 0.88)' : 'rgba(38, 44, 53, 0.92)';
      const rimHighlight = 'rgba(198, 164, 106, 0.35)'; // Antique gold subtle rim

      // Wing flap animation (articulated two-part wing with membrane curves)
      // flapAngle: -0.6 (high upstroke) to +0.8 (full downstroke)
      const flap = Math.sin(flapPhase);
      const wingSpread = 1.0 - 0.25 * Math.abs(flap);
      const wingElevation = flap * 0.7;

      // 1. Far Wing (rendered behind body)
      ctx.save();
      ctx.translate(10, -5);
      ctx.rotate(-wingElevation * 0.9 - bankAngle * 0.4);
      ctx.fillStyle = wingColor;
      ctx.strokeStyle = rimHighlight;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Wing arm bone
      ctx.bezierCurveTo(-20, -55 * wingSpread, -50, -85 * wingSpread, -95, -110 * wingSpread);
      // Wing finger 1
      ctx.bezierCurveTo(-80, -95 * wingSpread, -50, -75 * wingSpread, -40, -45 * wingSpread);
      // Wing finger 2
      ctx.bezierCurveTo(-25, -40 * wingSpread, -10, -25 * wingSpread, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // 2. Trailing Tail (articulated serpentine vertebrae)
      const tailSegments = 7;
      let prevTx = -20;
      let prevTy = 0;
      ctx.strokeStyle = bodyColor;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(prevTx, prevTy);

      for (let i = 1; i <= tailSegments; i++) {
        const segDist = 14;
        const wave = Math.sin(flapPhase * 0.8 - i * 0.6) * (2.5 + i * 1.2);
        prevTx -= segDist;
        prevTy += wave;
        ctx.lineTo(prevTx, prevTy);
      }
      ctx.stroke();

      // Tail spade fin
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.moveTo(prevTx, prevTy);
      ctx.lineTo(prevTx - 16, prevTy - 8);
      ctx.lineTo(prevTx - 22, prevTy);
      ctx.lineTo(prevTx - 16, prevTy + 8);
      ctx.closePath();
      ctx.fill();

      // 3. Main Torso / Body (powerful arched spine)
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.ellipse(0, 0, 32, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Spines along back
      ctx.fillStyle = '#2F3742';
      for (let s = -18; s <= 18; s += 7) {
        ctx.beginPath();
        ctx.moveTo(s, -10);
        ctx.lineTo(s + 3, -16);
        ctx.lineTo(s + 6, -10);
        ctx.closePath();
        ctx.fill();
      }

      // 4. Neck & Head with horns
      const neckWave = Math.sin(flapPhase * 0.7) * 2;
      ctx.beginPath();
      ctx.moveTo(25, -5);
      ctx.quadraticCurveTo(45, -10 + neckWave, 62, -4 + neckWave); // snout
      ctx.lineTo(60, 4 + neckWave);
      ctx.quadraticCurveTo(42, 6 + neckWave, 22, 5);
      ctx.closePath();
      ctx.fill();

      // Horns
      ctx.strokeStyle = '#424A53';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(50, -8 + neckWave);
      ctx.quadraticCurveTo(46, -20 + neckWave, 38, -26 + neckWave);
      ctx.stroke();

      // Glowing ember eye & maw
      const emberIntensity = 0.5 + 0.5 * Math.sin(flapPhase * 2);
      ctx.fillStyle = `rgba(224, 107, 56, ${0.8 * emberIntensity})`;
      ctx.beginPath();
      ctx.arc(54, -5 + neckWave, 2, 0, Math.PI * 2);
      ctx.fill();

      // 5. Near Wing (foreground side, larger and articulated)
      ctx.save();
      ctx.translate(8, 2);
      ctx.rotate(wingElevation * 1.1 + bankAngle * 0.5);
      ctx.fillStyle = wingColor;
      ctx.strokeStyle = rimHighlight;
      ctx.lineWidth = 1.8;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Main arm bone
      ctx.bezierCurveTo(15, 40 * wingSpread, 40, 75 * wingSpread, 75, 120 * wingSpread);
      // Outer claw finger
      ctx.bezierCurveTo(55, 95 * wingSpread, 35, 75 * wingSpread, 20, 50 * wingSpread);
      // Secondary finger
      ctx.bezierCurveTo(10, 40 * wingSpread, -5, 25 * wingSpread, -15, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    };

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update orbit position
      orbitAngle += ((Math.PI * 2) / orbitPeriod) * delta * speedMultiplier;
      if (orbitAngle > Math.PI * 2) orbitAngle -= Math.PI * 2;

      // Citadel center in screen coordinates
      const citadelX = width * 0.62;
      const citadelY = height * 0.38;

      // Elliptical 3D orbit
      const rx = width * 0.32; // Horizontal orbit radius
      const rz = 240; // Depth orbit radius
      const ry = height * 0.08; // Vertical banking altitude

      // Orbit 3D coordinates
      const wx = citadelX + Math.sin(orbitAngle) * rx;
      const wz = Math.cos(orbitAngle) * rz; // Positive = in front of citadel, negative = behind
      const wy = citadelY - 20 + Math.sin(orbitAngle * 2) * ry;

      // Velocity vector for heading calculation
      const vx = Math.cos(orbitAngle) * rx;
      const vz = -Math.sin(orbitAngle) * rz;
      const vy = Math.cos(orbitAngle * 2) * ry * 2;

      // Screen projected scale based on 3D depth
      // When wz is far (-rz), scale is ~0.45; when near (+rz), scale is ~1.15
      const depthFactor = (wz + rz) / (rz * 2); // 0 (far) to 1 (near)
      const scale = 0.45 + depthFactor * 0.65;
      const depthFade = 0.35 + depthFactor * 0.65;

      // Flight heading angle on screen
      const heading = Math.atan2(vy, vx);

      // Banking angle (roll during turn: banked inwards toward center)
      const bank = Math.sin(orbitAngle) * 0.45;

      // Flap cycle: flap frequency ~ 1.4 flaps per second
      const flapPhase = (time / 1000) * 8.5;

      // Check if partially occluded behind citadel core
      // Citadel tower occupies roughly x: [citadelX - 45, citadelX + 65], y: [citadelY - 140, citadelY + 60]
      const isInCitadelColumn = wx > citadelX - 60 && wx < citadelX + 80 && wy < citadelY + 40;
      const isBehindCitadel = wz < -30 && isInCitadelColumn;

      // Spawn subtle breath embers when near
      if (depthFactor > 0.6 && Math.random() < 0.35) {
        dragonEmbers.push({
          x: wx + Math.cos(heading) * 40 * scale,
          y: wy + Math.sin(heading) * 40 * scale,
          vx: (Math.random() - 0.5) * 25 - vx * 0.05,
          vy: Math.random() * 20 + 10,
          life: 0,
          maxLife: 1.2 + Math.random() * 0.8,
          size: 1.5 + Math.random() * 2,
          color: Math.random() > 0.4 ? 'rgba(198, 107, 56, ' : 'rgba(198, 164, 106, ',
        });
      }

      // Update & render dragon embers
      for (let i = dragonEmbers.length - 1; i >= 0; i--) {
        const ember = dragonEmbers[i];
        ember.life += delta;
        if (ember.life >= ember.maxLife) {
          dragonEmbers.splice(i, 1);
          continue;
        }
        ember.x += ember.vx * delta;
        ember.y += ember.vy * delta;
        const emberAlpha = (1 - ember.life / ember.maxLife) * 0.7;

        ctx.fillStyle = `${ember.color}${emberAlpha})`;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw dragon with occultation & fog integration
      if (!isBehindCitadel) {
        drawDragon(ctx, wx, wy, scale, heading, bank, flapPhase, depthFade, isBehindCitadel);
      } else {
        // Render ghosted / misty silhouette when cutting behind the massive stone tower
        drawDragon(ctx, wx, wy, scale, heading, bank, flapPhase, depthFade * 0.15, true);
      }

      // Update telemetry info periodically for immersive RPG aesthetic
      if (Math.floor(time / 400) % 3 === 0) {
        setDragonTelemetry({
          alt: Math.round(2800 + wy * 1.5),
          distance: wz > 0 ? 'Inner Spire' : 'Far Abyssal Wall',
          heading: Math.round(((heading * 180) / Math.PI + 360) % 360),
        });
      }

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [opacity, speedMultiplier]);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Subtle Dragon Telemetry badge on hover or inspect */}
      {isHovered && (
        <div className="absolute top-20 right-8 z-30 pointer-events-auto bg-[#090B0E]/80 border border-[#C6A46A]/30 px-3 py-2 rounded text-[11px] font-mono text-[#D7DCE0] backdrop-blur-sm transition-all duration-300">
          <div className="text-[#C6A46A] font-cinzel font-bold tracking-wider mb-1">
            WYRM OF ASHENVEIL
          </div>
          <div className="flex gap-4 text-[#B9B8B0]">
            <span>ALT: {dragonTelemetry.alt}m</span>
            <span>HDG: {dragonTelemetry.heading}°</span>
            <span>ZONE: {dragonTelemetry.distance}</span>
          </div>
        </div>
      )}
    </div>
  );
};
