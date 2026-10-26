import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { ASSETS } from '../utils/assets';

export const StaticHeroCharacter: React.FC = () => {
  const [showCodex, setShowCodex] = useState(false);

  return (
    <div className="absolute bottom-0 right-0 z-20 pointer-events-auto select-none translate-x-[18%] sm:translate-x-0 transition-transform duration-300">
      {/* Hero Cliff Container on the right side */}
      <div
        className="relative group cursor-pointer w-[68vw] sm:w-[46vw] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px] min-w-[260px] sm:min-w-[280px]"
        onClick={() => {
          sound.playBladeShimmer();
          sound.triggerHaptic(20);
          setShowCodex(!showCodex);
        }}
      >
        {/* Soft atmospheric ground contact grounding at cliff base */}
        <div className="absolute -bottom-2 inset-x-0 h-16 bg-gradient-to-t from-[#090B0E] via-[#090B0E]/70 to-transparent pointer-events-none z-30" />

        {/* Hero Character Render on Stone Pedestal */}
        <div className="relative overflow-visible">
          <img
            src={ASSETS.heroPedestalImage}
            alt="Knight of Ashenveil standing atop the stone pedestal overlooking the ancient citadel"
            className="w-full h-auto max-h-[85vh] object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Interactive subtle codex tooltip toggle */}
        {showCodex && (
          <div className="absolute bottom-28 -left-16 sm:-left-24 z-40 bg-[#090B0E]/95 border border-[#C6A46A]/60 p-4 rounded-xs shadow-2xl backdrop-blur-md max-w-[230px] sm:max-w-[260px] animate-in fade-in duration-200">
            <div className="text-[10px] font-mono tracking-widest text-[#C66B38] uppercase mb-0.5">
              WATCHPOINT PRECIPICE
            </div>
            <div className="font-cinzel text-sm sm:text-base font-bold text-[#D7DCE0] mb-1">
              The Exile at the Edge
            </div>
            <p className="text-[11px] leading-relaxed text-[#B9B8B0]">
              Standing resolute at the abyss, surveying the shattered gates across the chasm before descending upon Ashenveil.
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
