import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

interface HeroCharacterProps {
  mouseX: number;
  mouseY: number;
}

export const AnimatedHeroCharacter: React.FC<HeroCharacterProps> = ({ mouseX, mouseY }) => {
  const [isGustActive, setIsGustActive] = useState(false);
  const [showCodex, setShowCodex] = useState(false);

  // Periodic wind gusts
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGustActive(true);
      setTimeout(() => setIsGustActive(false), 2400);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  // Subtle parallax offset responding to mouse
  const parallaxX = mouseX * 8;
  const parallaxY = mouseY * 5;

  return (
    <div
      className="absolute bottom-0 right-0 z-20 pointer-events-auto select-none transition-transform duration-700 ease-out"
      style={{
        transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
      }}
    >
      {/* Dynamic SVG Filter for wind-driven fabric ripple */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="heroWindDeform" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.032"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="9s"
                values="0.012 0.032; 0.016 0.045; 0.013 0.030; 0.012 0.032"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isGustActive ? 9 : 4}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Hero Cliff Container */}
      <div
        className="relative group cursor-pointer w-[75vw] sm:w-[48vw] md:w-[38vw] lg:w-[32vw] xl:w-[28vw] max-w-[520px] min-w-[260px]"
        onClick={() => {
          sound.playBladeShimmer();
          sound.triggerHaptic(20);
          setShowCodex(!showCodex);
        }}
      >
        {/* Soft atmospheric mist blending at the bottom cliff base */}
        <div className="absolute -bottom-4 inset-x-0 h-28 bg-gradient-to-t from-[#090B0E] via-[#090B0E]/80 to-transparent pointer-events-none z-30" />
        
        {/* Soft edge feathering gradient on the left so the cliff and sky merge seamlessly into the citadel valley */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#090B0E]/90 via-[#090B0E]/40 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#090B0E]/60 via-transparent to-transparent pointer-events-none z-30" />

        {/* Hero Figure Render with Smooth Edge Masking & Subtle Wind Movement */}
        <div
          className="relative overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 15%, black 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 90%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 15%, black 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 90%, transparent 100%)',
            maskComposite: 'intersect',
          }}
        >
          <div
            className="transition-transform duration-500 group-hover:scale-[1.015]"
            style={{ filter: 'url(#heroWindDeform)' }}
          >
            <img
              src="/assets/aistudio/hero_overlooking_citadel_dd1e248e.png"
              alt="Lone Hero standing at the edge of a cliff overlooking the ancient citadel of Ashenveil"
              referrerPolicy="no-referrer"
              className={`w-full h-auto max-h-[82vh] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all duration-1000 ${
                isGustActive ? 'animate-cloak-primary' : 'animate-cloak-secondary'
              }`}
            />
          </div>

          {/* Golden dusk rim light accent along the greatsword & armor edge */}
          <div
            className={`absolute top-[15%] right-[10%] w-2 h-44 bg-gradient-to-b from-[#E2C799] via-transparent to-transparent opacity-0 blur-[1px] transition-opacity duration-700 pointer-events-none ${
              isGustActive ? 'opacity-60' : 'group-hover:opacity-35'
            }`}
          />
        </div>

        {/* Interactive Codex Tooltip on Hover/Click */}
        <div
          className={`absolute bottom-32 -left-16 sm:-left-32 z-40 bg-[#090B0E]/95 border border-[#C6A46A]/50 p-3 sm:p-4 rounded-xs shadow-2xl backdrop-blur-md max-w-[240px] sm:max-w-[270px] transition-all duration-300 pointer-events-none ${
            showCodex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
        >
          <div className="text-[10px] font-mono tracking-widest text-[#C66B38] uppercase mb-0.5">
            EXILE WATCHPOINT
          </div>
          <div className="font-cinzel text-sm sm:text-base font-bold text-[#D7DCE0] mb-1">
            Overlooking the Spire
          </div>
          <p className="text-[11px] leading-relaxed text-[#B9B8B0]">
            Surveying the shattered gates across the chasm. The pilgrimage to rekindle the primal hearth begins from this precipice.
          </p>
          <div className="mt-2 pt-2 border-t border-[#424A53]/40 flex items-center justify-between text-[10px] font-mono text-[#C6A46A]">
            <span>ALTITUDE: 3,420M</span>
            <span>BLADE: READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
