import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audio';
import { ASSETS } from '../utils/assets';

export const StaticHeroCharacter: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showCodex, setShowCodex] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled by user interaction or browser policy
      });
    }
  }, []);

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

        {/* Hero Video with Flowing Cape & Screen Blend Transparency */}
        <div className="relative overflow-visible">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={ASSETS.heroVideoPoster}
            onCanPlay={() => {
              setIsVideoReady(true);
              videoRef.current?.play().catch(() => {});
            }}
            className={`w-full h-auto max-h-[85vh] object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] transition-opacity duration-500 ${
              isVideoReady ? 'opacity-100' : 'opacity-90'
            }`}
            style={{
              mixBlendMode: 'screen',
            }}
          >
            <source src={ASSETS.heroVideo} type="video/webm" />
            <source src="/assets/aistudio/flowing_cape_250feb68.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
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
              Standing resolute at the abyss, cape flowing in the mountain winds, awaiting the destined alignment to descend upon Ashenveil.
            </p>
            <div className="mt-2 pt-2 border-t border-[#424A53]/40 flex items-center justify-between text-[10px] font-mono text-[#C6A46A]">
              <span>STANCE: GUARD</span>
              <span>CAPE: BILLOWING</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
