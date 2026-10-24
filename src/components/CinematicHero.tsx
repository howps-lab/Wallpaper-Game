import React, { useState, useEffect } from 'react';
import { ArrowDown, Flame, Compass } from 'lucide-react';
import { AtmosphericParticles } from './AtmosphericParticles';
import { StaticHeroCharacter } from './StaticHeroCharacter';
import { sound } from '../utils/audio';

interface CinematicHeroProps {
  onEnterRealm: () => void;
  isHighContrast: boolean;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onEnterRealm,
  isHighContrast,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#090B0E] select-none">
      {/* Layer 1: Citadel Mountain Background with Camera Drift & Parallax */}
      <div
        className="absolute -inset-4 sm:-inset-8 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${-mousePos.x * 10}px, ${-mousePos.y * 6}px, 0) scale(1.05)`,
        }}
      >
        <img
          src="/src/assets/images/hero_citadel_peaks_1792815042898.jpg"
          alt="Colossal Gothic Citadel perched upon jagged mountain peaks amidst stormy clouds"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center ${
            isHighContrast ? 'contrast-125 brightness-105' : 'contrast-110 brightness-95'
          }`}
        />

        {/* Volumetric mist rolls over the valleys */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090B0E]/60 via-transparent to-[#090B0E]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E] via-[#090B0E]/30 to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#090B0E]/90 to-transparent pointer-events-none" />
      </div>

      {/* Layer 3: Drifting Ash & Fire Ember Flakes */}
      <AtmosphericParticles density={isHighContrast ? 'high' : 'normal'} />

      {/* Layer 4: Volumetric Rolling Fog Wisps */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-[120%] h-64 bg-gradient-to-t from-[#090B0E] via-[#15191E]/30 to-transparent animate-mist-slow blur-2xl" />
      </div>

      {/* Layer 5: Static Hero with removed background on the right cliff edge */}
      <StaticHeroCharacter />

      {/* Layer 6: Main Hero Content (Editorial Typography, Tagline, Primary CTA) */}
      <div className="relative z-30 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-12 pointer-events-none">
        {/* Upper Left: Main Game Title & Narrative Intro */}
        <div className="max-w-2xl pt-6 sm:pt-12 md:pt-16 pointer-events-auto">
          {/* Subtle Realm Indicator Badge */}
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#C6A46A] uppercase mb-3 font-cinzel">
            <span className="w-6 h-[1px] bg-[#C6A46A]" />
            <span>DARK FANTASY ACTION RPG</span>
            <span className="w-2 h-[1px] bg-[#C6A46A]" />
          </div>

          {/* Epic Main Title */}
          <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D7DCE0] to-[#8C939D] drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]">
            ASHENVEIL
          </h1>

          {/* Gold Inlay Accent Line */}
          <div className="w-28 sm:w-36 h-[2px] bg-gradient-to-r from-[#C6A46A] via-[#E2C799] to-transparent mt-3 mb-5" />

          {/* Tagline */}
          <p className="font-cinzel text-base sm:text-lg md:text-xl font-bold tracking-[0.1em] text-[#C6A46A] uppercase mb-4 leading-snug drop-shadow-md">
            A kingdom lost to shadow. A legend reborn in ash.
          </p>

          {/* Editorial Story Intro */}
          <p className="text-sm sm:text-base text-[#B9B8B0] leading-relaxed max-w-xl mb-8 font-normal drop-shadow-lg text-balance">
            Beyond the shattered gates of an ancient realm, a forgotten power stirs. Journey
            through a land consumed by ancient curses, fallen kingdoms, and dragons that have
            outlived their gods.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
            <button
              onClick={() => {
                sound.playBell(240, 3.5);
                sound.playBladeShimmer();
                sound.triggerHaptic(35);
                onEnterRealm();
              }}
              className="relative group px-7 sm:px-9 py-3.5 sm:py-4 bg-transparent hover:bg-[#C6A46A]/10 active:bg-[#C6A46A]/20 border border-[#C6A46A] text-[#D7DCE0] font-cinzel font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-xs transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,164,106,0.35)] hover:border-[#E2C799] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] backdrop-blur-[2px]"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Flame className="w-4 h-4 text-[#C6A46A] transition-transform group-hover:scale-125" />
                ENTER THE REALM
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A46A]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </button>

            <a
              href="#world"
              onClick={() => sound.triggerHaptic(15)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-cinzel font-semibold tracking-[0.18em] text-[#D7DCE0] hover:text-[#C6A46A] py-3.5 px-2 transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A46A]"
            >
              <Compass className="w-4 h-4 text-[#C6A46A] transition-transform group-hover:rotate-45" />
              <span>DISCOVER THE WORLD</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Centered Scroll Down Prompt */}
        <div className="w-full flex items-center justify-center sm:justify-start pt-4 border-t border-[#424A53]/25">
          <a
            href="#world"
            onClick={() => sound.triggerHaptic(15)}
            className="group flex items-center gap-3 text-[11px] font-cinzel font-bold tracking-[0.25em] text-[#D7DCE0] hover:text-[#C6A46A] transition-colors pointer-events-auto"
          >
            <span>DESCEND INTO THE DARK</span>
            <div className="w-7 h-7 rounded-full border border-[#424A53] group-hover:border-[#C6A46A] flex items-center justify-center transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-[#C66B38] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
