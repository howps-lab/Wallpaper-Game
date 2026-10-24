import React, { useState } from 'react';
import { Play, Film, Image as ImageIcon, X, Maximize2, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { ASSETS } from '../utils/assets';

const gallery = [
  {
    id: 'citadel',
    title: 'The Sovereign Spire at Twilight',
    category: 'Environment',
    image: ASSETS.heroCitadel,
  },
  {
    id: 'colossus',
    title: 'Awakening of the Obsidian Titan',
    category: 'Colossi Encounter',
    image: ASSETS.gameplayColossus,
  },
  {
    id: 'ruins',
    title: 'Viaduct of the Cursed Basin',
    category: 'Exploration',
    image: ASSETS.worldRuinedKingdom,
  },
  {
    id: 'spellblade',
    title: 'Channeling the Primal Ember Blade',
    category: 'Combat',
    image: ASSETS.gameplayForbiddenArts,
  },
];

export const MediaSection: React.FC = () => {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [trailerStep, setTrailerStep] = useState(0);

  const startTrailer = () => {
    sound.playBell(180, 5);
    sound.triggerHaptic(40);
    setIsPlayingTrailer(true);
    setTrailerStep(0);

    // Sequence of dramatic trailer cinematic beats
    const timer1 = setTimeout(() => setTrailerStep(1), 3200);
    const timer2 = setTimeout(() => {
      sound.playBladeShimmer();
      setTrailerStep(2);
    }, 6500);
    const timer3 = setTimeout(() => {
      sound.playEmberBurst();
      setTrailerStep(3);
    }, 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  return (
    <section id="media" className="relative w-full py-28 sm:py-36 bg-[#090B0E] border-t border-[#424A53]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#C6A46A] uppercase mb-3 font-cinzel">
              <Film className="w-4 h-4 text-[#C66B38]" />
              <span>CINEMATIC ARCHIVES</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#D7DCE0]">
              Witness the Dawn of Ash
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#B9B8B0] max-w-md">
            Official in-engine trailer and uncompressed direct-feed 4K screenshots captured on PC
            and next-generation consoles.
          </p>
        </div>

        {/* Featured Cinematic Trailer Card */}
        <div className="relative rounded-xs overflow-hidden border border-[#C6A46A]/60 shadow-[0_25px_60px_rgba(0,0,0,0.95)] mb-14 group">
          <div className="relative h-[380px] sm:h-[480px] md:h-[580px] overflow-hidden">
            <img
              src={ASSETS.heroCitadel}
              alt="Ashenveil Official Reveal Trailer"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E] via-black/40 to-black/30" />

            {/* Trailer Play Center Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <button
                onClick={startTrailer}
                className="relative group/btn w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#681D20]/90 border-2 border-[#C6A46A] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_35px_rgba(104,29,32,0.9)] hover:shadow-[0_0_50px_rgba(198,164,106,0.8)] focus-visible:outline-none"
                aria-label="Play official reveal trailer"
              >
                <div className="absolute inset-1 rounded-full border border-[#E2C799]/40 animate-ping opacity-40" />
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#E2C799] fill-[#E2C799] ml-1 transition-transform group-hover/btn:scale-110" />
              </button>
              <div className="mt-6 text-center">
                <span className="text-[11px] font-mono tracking-widest text-[#C66B38] uppercase block mb-1">
                  OFFICIAL TEASER REVEAL
                </span>
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.14em] text-[#D7DCE0]">
                  “THE LAST EMBER”
                </span>
                <span className="block text-xs text-[#B9B8B0] mt-1 font-mono">4K UHD · 60 FPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4K Screenshot Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                sound.playBladeShimmer();
                sound.triggerHaptic(15);
                setActiveScreenshot(item.image);
              }}
              className="group relative h-52 sm:h-60 rounded-xs overflow-hidden border border-[#424A53]/50 cursor-pointer hover:border-[#C6A46A] transition-all duration-300 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <span className="text-[9px] font-mono text-[#C6A46A] tracking-wider block">
                    {item.category.toUpperCase()}
                  </span>
                  <span className="font-cinzel text-xs font-bold text-[#D7DCE0] line-clamp-1">
                    {item.title}
                  </span>
                </div>
                <Maximize2 className="w-4 h-4 text-[#8C939D] group-hover:text-[#E2C799] shrink-0 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Cinematic Trailer Viewer Modal */}
      {isPlayingTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#090B0E]/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-black border border-[#C6A46A] rounded-xs overflow-hidden shadow-2xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#15191E] border-b border-[#424A53]/50">
              <div className="flex items-center gap-3">
                <Film className="w-4 h-4 text-[#C66B38]" />
                <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-[#D7DCE0]">
                  ASHENVEIL — CINEMATIC PROLOGUE
                </span>
              </div>
              <button
                onClick={() => setIsPlayingTrailer(false)}
                className="p-1.5 text-[#8C939D] hover:text-[#D7DCE0] rounded-xs border border-[#424A53]"
                aria-label="Close trailer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Simulation Container */}
            <div className="relative aspect-video bg-[#050608] flex items-center justify-center overflow-hidden">
              {/* Scene 1: The Mountain Citadel */}
              {trailerStep === 0 && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in duration-1000">
                  <img
                    src={ASSETS.heroCitadel}
                    alt="Scene 1"
                    className="w-full h-full object-cover scale-110 animate-pulse duration-[8000ms]"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-8 text-center">
                    <p className="font-cinzel text-xl sm:text-3xl text-[#E2C799] font-bold tracking-[0.2em] uppercase mb-3">
                      “The gods have turned to cinder.”
                    </p>
                    <span className="text-xs font-mono text-[#8C939D] tracking-widest">
                      ACT I // THE BROKEN PACT
                    </span>
                  </div>
                </div>
              )}

              {/* Scene 2: The Colossus Awakening */}
              {trailerStep === 1 && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in duration-1000">
                  <img
                    src={ASSETS.gameplayColossus}
                    alt="Scene 2"
                    className="w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center">
                    <p className="font-cinzel text-xl sm:text-3xl text-[#D7DCE0] font-bold tracking-[0.2em] uppercase mb-3">
                      “Yet in the deep, ancient iron remembers.”
                    </p>
                    <span className="text-xs font-mono text-[#C66B38] tracking-widest">
                      ACT II // AWAKENING OF THE TITANS
                    </span>
                  </div>
                </div>
              )}

              {/* Scene 3: The Spellblade Master */}
              {trailerStep === 2 && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in duration-1000">
                  <img
                    src={ASSETS.gameplayForbiddenArts}
                    alt="Scene 3"
                    className="w-full h-full object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center">
                    <p className="font-cinzel text-xl sm:text-3xl text-[#C6A46A] font-bold tracking-[0.2em] uppercase mb-3">
                      “Draw the Eclipse. Rekindle the world.”
                    </p>
                    <span className="text-xs font-mono text-[#D7DCE0] tracking-widest">
                      ACT III // THE WANDERER’S DESTINY
                    </span>
                  </div>
                </div>
              )}

              {/* Final Sting: Ashenveil Title */}
              {trailerStep === 3 && (
                <div className="relative w-full h-full bg-[#090B0E] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-700">
                  <h4 className="font-cinzel text-4xl sm:text-6xl font-black tracking-[0.25em] text-[#D7DCE0] mb-4">
                    ASHENVEIL
                  </h4>
                  <div className="w-24 h-[2px] bg-[#C6A46A] mb-4" />
                  <p className="text-xs font-mono tracking-widest text-[#C66B38] uppercase mb-8">
                    COMING TO PLAYSTATION 5 · XBOX SERIES X|S · PC
                  </p>
                  <button
                    onClick={() => {
                      setIsPlayingTrailer(false);
                      startTrailer();
                    }}
                    className="px-6 py-2.5 bg-[#681D20] border border-[#C6A46A] text-xs font-cinzel font-bold tracking-widest text-[#D7DCE0] uppercase rounded-xs hover:bg-[#852327]"
                  >
                    REPLAY TEASER
                  </button>
                </div>
              )}

              {/* Subtle Film Grain & Letterbox bars */}
              <div className="absolute top-0 inset-x-0 h-6 sm:h-10 bg-black pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-6 sm:h-10 bg-black pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Lightbox Modal */}
      {activeScreenshot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActiveScreenshot(null)}
        >
          <div className="relative max-w-5xl w-full border border-[#C6A46A] rounded-xs overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveScreenshot(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#090B0E]/80 text-[#D7DCE0] rounded-xs border border-[#424A53]"
              aria-label="Close screenshot"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeScreenshot}
              alt="4K Game Capture"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};
