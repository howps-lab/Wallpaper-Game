import React, { useState } from 'react';
import { Sword, Compass, Wand2, ChevronRight, X, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';
import { ASSETS } from '../utils/assets';

interface GameplayPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  image: string;
  combatRole: string;
  mechanics: string;
}

const gameplayPillars: GameplayPillar[] = [
  {
    id: 'explore',
    title: 'EXPLORE A FORGOTTEN WORLD',
    subtitle: 'VERTICAL TRAVERSAL & SEAMLESS RUINS',
    description:
      'Scale sheer jagged precipices, discover hidden catacombs through crumbling viaducts, and explore interconnected biomes unburdened by artificial boundaries or map markers.',
    bulletPoints: [
      'Seamless multi-tiered gothic verticality',
      'Dynamic weather affecting blade grip and footing',
      'Ancient stone mechanisms and hidden crypt seals',
      'Atmospheric environmental hazard survival',
    ],
    image: ASSETS.worldRuinedKingdom,
    combatRole: 'Exploration & World Navigation',
    mechanics:
      'Utilize grapple spikes and wind-glide mantles to leap across thousand-foot abysses. Find hidden embers to ignite waypoints.',
  },
  {
    id: 'colossi',
    title: 'FACE ANCIENT COLOSSI',
    subtitle: 'MULTI-PHASE TITANIC ENCOUNTERS',
    description:
      'Climb directly upon the towering stone bodies of primordial titans. Target pulsating runic seals while evading tectonic smashes and torrential brimstone blasts.',
    bulletPoints: [
      'Fully climbable living stone and iron behemoths',
      'Dynamic fracture systems on armor plates',
      'Adaptive boss AI that reacts to player positioning',
      'Environmental stagger and colossus collapse sequences',
    ],
    image: ASSETS.gameplayColossus,
    combatRole: 'Boss Battles & Precision Timing',
    mechanics:
      'Grip mechanics require endurance management while scaling towering titans. Sever runic conduits to expose the incandescent core.',
  },
  {
    id: 'magic',
    title: 'MASTER THE FORBIDDEN ARTS',
    subtitle: 'CINDER ENCHANTMENTS & VOID COMBAT',
    description:
      'Infuse your ancestral greatsword with shifting elemental affinities. Chain heavy sweeping strikes with volatile cinder bursts and evasive shadow strides.',
    bulletPoints: [
      'Visceral, weighty melee with directional parrying',
      'Dual-wield spellblades with reactive particle sparks',
      'Forbidden ash sorceries that cost blood or stamina',
      'Deep weapon mastery progression and relic engraving',
    ],
    image: ASSETS.gameplayForbiddenArts,
    combatRole: 'Combat Systems & Spellcraft',
    mechanics:
      'Combine fast stance-switching with elemental weapon infusions. Perfect parries unleash a shockwave of concentrated ember flame.',
  },
];

export const GameplaySection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<GameplayPillar | null>(null);

  return (
    <section id="gameplay" className="relative w-full py-28 sm:py-36 bg-[#090B0E] border-t border-[#424A53]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#C6A46A] uppercase mb-3 font-cinzel">
            <Sword className="w-4 h-4 text-[#C66B38]" />
            <span>CORE GAMEPLAY PILLARS</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#D7DCE0] mb-5">
            Brutal Precision Meets Epic Scale
          </h2>
          <p className="text-sm sm:text-base text-[#B9B8B0] leading-relaxed">
            Every encounter in Ashenveil tests reflexes, spatial mastery, and nerve. Survive against
            monstrosities of myth through mastery of the blade and forbidden ash sorceries.
          </p>
        </div>

        {/* 3 Premium Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {gameplayPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative bg-[#15191E] border border-[#424A53]/50 rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-[#C6A46A] shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            >
              {/* Image Frame */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15191E] via-[#15191E]/40 to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono tracking-widest text-[#E2C799] bg-[#090B0E]/80 border border-[#C6A46A]/40 px-2.5 py-1 rounded-xs backdrop-blur-sm">
                    {pillar.combatRole}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#C66B38] uppercase mb-1">
                    {pillar.subtitle}
                  </div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#D7DCE0] mb-3 group-hover:text-[#E2C799] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B9B8B0] leading-relaxed mb-5">
                    {pillar.description}
                  </p>
                </div>

                {/* Inspect Action */}
                <button
                  onClick={() => {
                    sound.playBladeShimmer();
                    sound.triggerHaptic(20);
                    setSelectedPillar(pillar);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-cinzel font-bold tracking-widest text-[#C6A46A] group-hover:text-[#E2C799] transition-colors pt-4 border-t border-[#424A53]/40 focus-visible:outline-none"
                >
                  <span>INSPECT MECHANICS</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mechanics Inspector Modal */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090B0E]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#15191E] border border-[#C6A46A] p-6 sm:p-8 rounded-xs shadow-2xl">
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-4 right-4 p-2 text-[#8C939D] hover:text-[#D7DCE0] rounded-xs border border-[#424A53]/40"
              aria-label="Close mechanics view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-[10px] font-mono tracking-widest text-[#C66B38] mb-1">
              SYSTEM ANALYSIS // {selectedPillar.combatRole.toUpperCase()}
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-[#D7DCE0] mb-3">
              {selectedPillar.title}
            </h3>
            <p className="text-sm text-[#B9B8B0] mb-6 leading-relaxed">
              {selectedPillar.description}
            </p>

            <div className="space-y-4 mb-6">
              <div className="text-xs font-cinzel font-bold tracking-wider text-[#C6A46A]">
                TACTICAL INVARIANTS:
              </div>
              <ul className="space-y-2">
                {selectedPillar.bulletPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#D7DCE0]">
                    <ShieldCheck className="w-4 h-4 text-[#C6A46A] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#090B0E] border border-[#424A53]/50 p-4 rounded-xs text-xs text-[#B9B8B0] leading-relaxed">
              <span className="font-mono text-[#E2C799] block mb-1">CONTROLLER TELEMETRY:</span>
              {selectedPillar.mechanics}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
