import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audio';

export const StaticHeroCharacter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCodex, setShowCodex] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/src/assets/images/hero_overlooking_cutout_1792817042631.jpg';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const w = img.naturalWidth;
      const h = img.naturalHeight;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image pixel buffer
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Flood-fill BFS to key out the black background while preserving all dark armor details
      const visited = new Uint8Array(w * h);
      const queue: number[] = [];

      // Seed from outer borders
      // Top row, left border, right border
      for (let x = 0; x < w; x++) {
        // top edge
        const idxTop = x;
        const pTop = idxTop * 4;
        if (data[pTop] < 28 && data[pTop + 1] < 28 && data[pTop + 2] < 28) {
          queue.push(x, 0);
          visited[idxTop] = 1;
        }
      }
      for (let y = 0; y < h; y++) {
        // left edge
        const idxL = y * w;
        const pL = idxL * 4;
        if (data[pL] < 28 && data[pL + 1] < 28 && data[pL + 2] < 28) {
          queue.push(0, y);
          visited[idxL] = 1;
        }
        // right edge
        const idxR = y * w + (w - 1);
        const pR = idxR * 4;
        if (data[pR] < 28 && data[pR + 1] < 28 && data[pR + 2] < 28) {
          queue.push(w - 1, y);
          visited[idxR] = 1;
        }
      }

      // BFS traversal
      let head = 0;
      while (head < queue.length) {
        const cx = queue[head++];
        const cy = queue[head++];
        const cIdx = cy * w + cx;
        const p = cIdx * 4;

        // Calculate luminance
        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        // Smooth alpha edge falloff
        if (lum <= 10) {
          data[p + 3] = 0;
        } else if (lum < 32) {
          data[p + 3] = Math.round(((lum - 10) / 22) * 255);
        }

        // Check 4 neighbors
        const neighbors = [
          [cx - 1, cy],
          [cx + 1, cy],
          [cx, cy - 1],
          [cx, cy + 1],
        ];

        for (let i = 0; i < 4; i++) {
          const nx = neighbors[i][0];
          const ny = neighbors[i][1];
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nIdx = ny * w + nx;
            if (visited[nIdx] === 0) {
              const np = nIdx * 4;
              const nR = data[np];
              const nG = data[np + 1];
              const nB = data[np + 2];
              const nLum = 0.299 * nR + 0.587 * nG + 0.114 * nB;

              // Expand through dark background pixels
              if (nLum < 32) {
                visited[nIdx] = 1;
                queue.push(nx, ny);
              }
            }
          }
        }
      }

      // Write transparent buffer back to canvas
      ctx.putImageData(imgData, 0, 0);
      setIsLoaded(true);
    };
  }, []);

  return (
    <div className="absolute bottom-0 right-0 z-20 pointer-events-auto select-none">
      {/* Static Hero Cliff Container on the right side */}
      <div
        className="relative group cursor-pointer w-[65vw] sm:w-[46vw] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px] min-w-[280px]"
        onClick={() => {
          sound.playBladeShimmer();
          sound.triggerHaptic(20);
          setShowCodex(!showCodex);
        }}
      >
        {/* Soft atmospheric ground contact grounding */}
        <div className="absolute -bottom-2 inset-x-0 h-16 bg-gradient-to-t from-[#090B0E] via-[#090B0E]/60 to-transparent pointer-events-none z-30" />

        {/* 100% Static Transparent Canvas Render (No animations, No wind deformation, No movement) */}
        <canvas
          ref={canvasRef}
          className={`w-full h-auto max-h-[84vh] object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Static subtle codex tooltip toggle */}
        {showCodex && (
          <div className="absolute bottom-28 -left-8 sm:-left-24 z-40 bg-[#090B0E]/95 border border-[#C6A46A]/60 p-4 rounded-xs shadow-2xl backdrop-blur-md max-w-[260px] animate-in fade-in duration-200">
            <div className="text-[10px] font-mono tracking-widest text-[#C66B38] uppercase mb-0.5">
              WATCHPOINT PRECIPICE
            </div>
            <div className="font-cinzel text-sm sm:text-base font-bold text-[#D7DCE0] mb-1">
              The Exile at the Edge
            </div>
            <p className="text-[11px] leading-relaxed text-[#B9B8B0]">
              Standing resolute at the abyss, awaiting the destined alignment to descend upon Ashenveil.
            </p>
            <div className="mt-2 pt-2 border-t border-[#424A53]/40 flex items-center justify-between text-[10px] font-mono text-[#C6A46A]">
              <span>STANCE: GUARD</span>
              <span>BLADE: READY</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
