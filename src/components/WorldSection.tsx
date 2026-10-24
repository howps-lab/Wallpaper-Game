import React, { useState } from 'react';
import { Compass, Skull, Mountain, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audio';

interface Hotspot {
  id: string;
  name: string;
  title: string;
  description: string;
  danger: string;
  x: number; // percentage
  y: number;
}

const hotspots: Hotspot[] = [
  {
    id: 'spire',
    name: 'Spire of the Sovereign',
    title: 'THE SHATTERED SEAT',
    description:
      'Where the Last King bound the realm to eternal cinder. High above the mist, the colossal throne sits vacant beneath storm-swept skies.',
    danger: 'EXTREME // ABYSSAL WYRM TERRITORY',
    x: 64,
    y: 28,
  },
  {
    id: 'viaduct',
    name: 'The Great Viaduct of Malgath',
    title: 'COLOSSAL HIGHWAY OF ASH',
    description:
      'Massive arched stone bridges that once linked the northern baronies. Broken by the first awakening of the dragon two centuries ago.',
    danger: 'HIGH // SKELETON PATROLS & CHASM GUSTS',
    x: 32,
    y: 72,
  },
  {
    id: 'chasm',
    name: 'The Whispering Chasm',
    title: 'THE CRADLE OF CURSES',
    description:
      'A bottomless rift emitting faint ember motes and the mournful wails of soldiers who marched into the shadow and never returned.',
    danger: 'LETHAL // VOLATILE EMBER STORMS',
    x: 48,
    y: 52,
  },
];

export const WorldSection: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(hotspots[0]);

  return (
    <section id="world" className="relative w-full py-28 sm:py-36 bg-[#090B0E] border-t border-[#424A53]/30 overflow-hidden">
      {/* Subtle background ambient pattern */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#C6A46A] uppercase mb-3 font-cinzel">
            <Compass className="w-4 h-4 text-[#C66B38]" />
            <span>TERRITORY & GEOGRAPHY</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#D7DCE0] mb-5">
            A Shattered Continent Carved by Ancient Flame
          </h2>
          <p className="text-sm sm:text-base text-[#B9B8B0] leading-relaxed">
            The kingdom of Ashenveil does not forgive. Spanning over four desolate provinces, every
            crag, fortress ruin, and hollow abbey holds remnants of forbidden pacts and forgotten
            dynasties.
          </p>
        </div>

        {/* Interactive World Map / Matte Landscape */}
        <div className="relative rounded-sm overflow-hidden border border-[#424A53]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
          <img
            src="/src/assets/images/world_ruined_kingdom_1792815043603.jpg"
            alt="Vast ruined kingdom of Ashenveil with colossal gothic arches and ruined towers"
            referrerPolicy="no-referrer"
            className="w-full h-[450px] sm:h-[550px] md:h-[650px] object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
          />

          {/* Vignette & Contrast Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E] via-transparent to-[#090B0E]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090B0E]/70 via-transparent to-transparent pointer-events-none" />

          {/* Interactive Map Hotspots */}
          {hotspots.map((spot) => {
            const isActive = activeHotspot.id === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => {
                  sound.playBladeShimmer();
                  sound.triggerHaptic(20);
                  setActiveHotspot(spot);
                }}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin focus-visible:outline-none"
                aria-label={`Inspect ${spot.name}`}
              >
                <div className="relative flex items-center justify-center">
                  {/* Ping wave */}
                  <span
                    className={`absolute w-8 h-8 rounded-full border transition-all duration-1000 ${
                      isActive
                        ? 'border-[#C66B38] scale-150 animate-ping opacity-60'
                        : 'border-[#C6A46A]/40 scale-100 group-hover/pin:scale-125'
                    }`}
                  />
                  {/* Pin core */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300 shadow-xl ${
                      isActive
                        ? 'bg-[#681D20] border-[#E2C799] scale-110 shadow-[0_0_18px_rgba(198,107,56,0.8)]'
                        : 'bg-[#15191E]/90 border-[#C6A46A]/70 hover:border-[#E2C799]'
                    }`}
                  >
                    <Mountain
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-[#E2C799]' : 'text-[#B9B8B0] group-hover/pin:text-[#D7DCE0]'
                      }`}
                    />
                  </div>
                  {/* Label */}
                  <span className="hidden sm:block absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-cinzel font-bold tracking-widest text-[#D7DCE0] bg-[#090B0E]/90 px-2.5 py-1 border border-[#424A53]/50 rounded-xs shadow-md">
                    {spot.name}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Active Hotspot Lore Card Overlay (Bottom Left) */}
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md z-30 bg-[#090B0E]/95 border border-[#C6A46A]/50 p-5 sm:p-6 rounded-xs shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-[10px] font-mono tracking-widest text-[#C66B38] uppercase flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                {activeHotspot.danger}
              </span>
            </div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#D7DCE0] mb-1">
              {activeHotspot.name}
            </h3>
            <div className="text-xs font-cinzel tracking-wider text-[#C6A46A] mb-3">
              {activeHotspot.title}
            </div>
            <p className="text-xs sm:text-sm text-[#B9B8B0] leading-relaxed mb-4">
              {activeHotspot.description}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C939D]">
              <Skull className="w-3.5 h-3.5 text-[#C66B38]" />
              <span>COORDINATES: {activeHotspot.x}°N, {activeHotspot.y}°W</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
