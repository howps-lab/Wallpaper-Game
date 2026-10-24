import React, { useState } from 'react';
import { Scroll, Flame, Crown, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

const chapters = [
  {
    id: 'crown',
    number: '01',
    title: 'The Crown of Sullied Flame',
    subtitle: 'THE FALL OF THE HIGH SOVEREIGN',
    summary:
      'Seven hundred years prior to the great eclipse, the first lords bound dragon blood into the iron vaults beneath the citadel. What began as an imperium of golden spires decayed into an empire of ash and ravenous specters.',
    quote:
      '"When the last bell of Malgath sounded, the earth split like brittle bone, and the sky wept dark embers."',
    loreDetail:
      'The Sovereign traded the souls of three armies to forge armor impervious to mortal steel. Now, his empty armor still sits upon the high throne, whispering curses to the winds.',
    icon: Crown,
    accent: '#C6A46A',
  },
  {
    id: 'wyrm',
    number: '02',
    title: 'The Wyrm of the Eclipse',
    subtitle: 'THE DRAGON THAT OUTLIVED GODS',
    summary:
      'Known in ancient scriptures as Vermithrax the Hollowed. A winged colossal beast whose scales swallow the sun. It circles the central citadel not as a guard, but as an eternal warden waiting for the seal to break.',
    quote:
      '"Do not look into the hollow of its maw, for the fire burning there is older than the stars themselves."',
    loreDetail:
      'Every thirty-six beats of its wings, a storm of brimstone cascades down upon the jagged crags, ensuring no army may ever march upon the citadel gates again.',
    icon: Flame,
    accent: '#C66B38',
  },
  {
    id: 'wanderer',
    number: '03',
    title: 'The Exile’s Pilgrimage',
    subtitle: 'ONE WHO MARCHES ALONE',
    summary:
      'Stripped of heraldry and cast into the fog, the Wanderer bears the Eclipse Blade—an heirloom thirsty for primal dragon heartblood. Only by rekindling the sacred hearth can the curse of ash be broken.',
    quote:
      '"A knight without a banner is not an outlaw, but the only blade true enough to strike a god."',
    loreDetail:
      'Wielding forbidden ash sorceries and ancestral steel, the Exile traverses shattered bridges and vertical crags to reach the crowning peak of Ashenveil.',
    icon: Sparkles,
    accent: '#B9B8B0',
  },
];

export const LegendSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(chapters[0]);

  return (
    <section id="story" className="relative w-full py-28 sm:py-36 bg-[#090B0E] border-t border-[#424A53]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel font-bold tracking-[0.25em] text-[#C6A46A] uppercase mb-3">
            <Scroll className="w-4 h-4 text-[#C66B38]" />
            <span>CHRONICLES OF ASHENVEIL</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#D7DCE0] mb-5">
            The Mythos of the Dying Realm
          </h2>
          <p className="text-sm sm:text-base text-[#B9B8B0] leading-relaxed">
            Uncover the deep lore woven into the stones of the fallen empire. Every battle leaves an
            echo, and every legend was bought in blood.
          </p>
        </div>

        {/* Interactive Chapter Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {chapters.map((chap) => {
            const isSelected = activeTab.id === chap.id;
            const Icon = chap.icon;
            return (
              <button
                key={chap.id}
                onClick={() => {
                  sound.playBladeShimmer();
                  sound.triggerHaptic(20);
                  setActiveTab(chap);
                }}
                className={`p-6 text-left transition-all duration-300 border rounded-xs relative group ${
                  isSelected
                    ? 'bg-[#15191E] border-[#C6A46A] shadow-[0_0_20px_rgba(198,164,106,0.15)]'
                    : 'bg-[#0D1014] border-[#424A53]/40 hover:border-[#B9B8B0]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm tracking-wider text-[#C6A46A]">
                    {chap.number}
                  </span>
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isSelected ? 'text-[#E2C799]' : 'text-[#424A53] group-hover:text-[#B9B8B0]'
                    }`}
                  />
                </div>
                <div className="text-[11px] font-mono tracking-widest text-[#8C939D] mb-1 uppercase">
                  {chap.subtitle}
                </div>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#D7DCE0] group-hover:text-white transition-colors">
                  {chap.title}
                </h3>

                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C6A46A] via-[#E2C799] to-transparent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Chapter Deep Dive Card */}
        <div className="bg-[#15191E]/80 border border-[#424A53]/60 rounded-xs p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#C66B38]/10 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono text-[#C6A46A] mb-3">
              <span>CHRONICLE ENTRY {activeTab.number}</span>
              <span>·</span>
              <span>CANON LORE ARCHIVE</span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-[#D7DCE0] mb-6">
              {activeTab.title}
            </h3>

            <blockquote className="border-l-2 border-[#C6A46A] pl-5 sm:pl-6 my-6 italic font-cinzel text-base sm:text-lg text-[#E2C799]/90 leading-relaxed">
              {activeTab.quote}
            </blockquote>

            <p className="text-sm sm:text-base text-[#B9B8B0] leading-relaxed mb-6 font-normal">
              {activeTab.summary}
            </p>

            <div className="bg-[#090B0E]/70 border border-[#424A53]/40 p-4 sm:p-5 rounded-xs">
              <span className="text-[11px] font-mono text-[#C66B38] tracking-widest uppercase block mb-1">
                DISCOVERABLE FIELD MEMOIR:
              </span>
              <p className="text-xs sm:text-sm text-[#D7DCE0] leading-relaxed">
                {activeTab.loreDetail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
