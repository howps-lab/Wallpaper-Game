import React, { useState } from 'react';
import { X, Shield, Sparkles, Flame, Sword, BookOpen, Compass, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface EnterRealmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const classes = [
  {
    id: 'cinder-knight',
    name: 'Cinder Knight',
    role: 'Vanguard & Greatsword Master',
    weapon: 'Blackened Greatsword & Tower Heater',
    vitality: 92,
    strength: 95,
    arcana: 48,
    agility: 56,
    lore: 'Former champion of the royal garrison who survived the immolation by binding molten dragon embers directly into his armor breastplate.',
  },
  {
    id: 'shadow-weaver',
    name: 'Shadow Weaver',
    role: 'Assassin & Void Dualist',
    weapon: 'Twin Abyssal Daggers',
    vitality: 62,
    strength: 68,
    arcana: 85,
    agility: 98,
    lore: 'A silent exile who moves through the fissures of the world, utilizing smoke and shadowy illusions to strike through the seams of titan armor.',
  },
  {
    id: 'runebound',
    name: 'Runebound Hermit',
    role: 'Forbidden Pyromancer',
    weapon: 'Etched Obsidian Catalyst',
    vitality: 58,
    strength: 42,
    arcana: 99,
    agility: 70,
    lore: 'Keeper of lost scripts dating back to before the kingdom’s shattering. Transmutes blood into volcanic geysers and searing brimstone.',
  },
];

export const EnterRealmModal: React.FC<EnterRealmModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'prologue' | 'classes' | 'expedition'>('prologue');
  const [selectedClass, setSelectedClass] = useState(classes[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#090B0E]/90 backdrop-blur-xl animate-in fade-in duration-300 select-none">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E1217] border border-[#C6A46A] rounded-xs shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#15191E] border-b border-[#424A53]/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center border border-[#C6A46A]/60 bg-[#090B0E] rounded-xs">
              <Flame className="w-3.5 h-3.5 text-[#C66B38]" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold tracking-[0.16em] text-[#D7DCE0]">
                SANCTUM OF THE ASHEN REALM
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playBladeShimmer();
              onClose();
            }}
            className="p-1.5 text-[#8C939D] hover:text-[#D7DCE0] rounded-xs border border-[#424A53]/50 transition-colors"
            aria-label="Close realm entrance"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#424A53]/40 bg-[#090B0E] px-6 text-xs font-cinzel font-semibold tracking-wider text-[#8C939D] shrink-0">
          <button
            onClick={() => {
              sound.triggerHaptic(10);
              setActiveTab('prologue');
            }}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'prologue'
                ? 'border-[#C6A46A] text-[#E2C799] bg-[#15191E]/50'
                : 'border-transparent hover:text-[#D7DCE0]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>PROLOGUE CHRONICLE</span>
          </button>
          <button
            onClick={() => {
              sound.triggerHaptic(10);
              setActiveTab('classes');
            }}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'classes'
                ? 'border-[#C6A46A] text-[#E2C799] bg-[#15191E]/50'
                : 'border-transparent hover:text-[#D7DCE0]'
            }`}
          >
            <Sword className="w-3.5 h-3.5" />
            <span>EXILE ARCHETYPES</span>
          </button>
          <button
            onClick={() => {
              sound.triggerHaptic(10);
              setActiveTab('expedition');
            }}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'expedition'
                ? 'border-[#C6A46A] text-[#E2C799] bg-[#15191E]/50'
                : 'border-transparent hover:text-[#D7DCE0]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>EXPEDITION ORDERS</span>
          </button>
        </div>

        {/* Modal Body with scrollable content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {activeTab === 'prologue' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center">
                <span className="text-[10px] font-mono tracking-widest text-[#C66B38] uppercase block mb-1">
                  OFFICIAL INTRODUCTORY SCROLL
                </span>
                <h4 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D7DCE0]">
                  The Night the Citadel Wept
                </h4>
                <div className="w-16 h-[1.5px] bg-[#C6A46A] mx-auto mt-2" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#B9B8B0] leading-relaxed font-normal">
                <p>
                  You awaken upon the broken flags of the outer viaduct. The smell of cold ash
                  hangs thick in the mountain fog. Far above, the high spire of Ashenveil pierces
                  the churning black clouds, its gargoyles watching over empty throne rooms.
                </p>
                <p>
                  The ancient beast circles. Its leathery wings part the sky like thunderclaps, and
                  where its shadow falls, the dead do not sleep.
                </p>
                <blockquote className="border-l-2 border-[#C6A46A] pl-4 py-1 italic font-cinzel text-[#E2C799]">
                  “He who steps beyond the threshold carries neither name nor crown. Only the
                  ember within can turn darkness back to dawn.”
                </blockquote>
                <p>
                  Equip thy weapon. Steel thy heart. The expedition into the sunken kingdom begins
                  now.
                </p>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => {
                    sound.playBladeShimmer();
                    sound.triggerHaptic(20);
                    setActiveTab('classes');
                  }}
                  className="px-6 py-3 bg-[#681D20] border border-[#C6A46A] font-cinzel font-bold text-xs tracking-widest text-[#D7DCE0] uppercase rounded-xs hover:bg-[#852327] flex items-center gap-2"
                >
                  <span>CHOOSE THY ARCHETYPE</span>
                  <ChevronRight className="w-4 h-4 text-[#C6A46A]" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <div>
              {/* Class Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {classes.map((cls) => {
                  const isSel = selectedClass.id === cls.id;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => {
                        sound.playBladeShimmer();
                        sound.triggerHaptic(15);
                        setSelectedClass(cls);
                      }}
                      className={`p-4 text-left border rounded-xs transition-all ${
                        isSel
                          ? 'bg-[#15191E] border-[#C6A46A] shadow-[0_0_15px_rgba(198,164,106,0.2)]'
                          : 'bg-[#090B0E] border-[#424A53]/50 hover:border-[#B9B8B0]/60'
                      }`}
                    >
                      <div className="font-cinzel text-sm font-bold text-[#D7DCE0] mb-0.5">
                        {cls.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#C66B38]">{cls.role}</div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Class Deep View */}
              <div className="bg-[#15191E] border border-[#424A53]/60 p-6 rounded-xs grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-mono text-[#C6A46A] tracking-wider uppercase block mb-1">
                    CHOSEN PATH
                  </span>
                  <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#D7DCE0] mb-2">
                    {selectedClass.name}
                  </h4>
                  <p className="text-xs text-[#B9B8B0] leading-relaxed mb-4">{selectedClass.lore}</p>
                  <div className="text-xs font-mono text-[#E2C799] border-t border-[#424A53]/40 pt-3">
                    ARMAMENT: {selectedClass.weapon}
                  </div>
                </div>

                {/* Attribute Bars */}
                <div className="space-y-3 bg-[#090B0E] p-4 rounded-xs border border-[#424A53]/40">
                  <div className="text-[10px] font-mono text-[#8C939D] uppercase tracking-wider mb-2">
                    ATTRIBUTES & SCALING
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#B9B8B0] mb-1">
                      <span>VITALITY</span>
                      <span className="text-[#C6A46A]">{selectedClass.vitality} / 100</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#15191E] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#681D20]"
                        style={{ width: `${selectedClass.vitality}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#B9B8B0] mb-1">
                      <span>STRENGTH</span>
                      <span className="text-[#C6A46A]">{selectedClass.strength} / 100</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#15191E] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C66B38]"
                        style={{ width: `${selectedClass.strength}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#B9B8B0] mb-1">
                      <span>ARCANA</span>
                      <span className="text-[#C6A46A]">{selectedClass.arcana} / 100</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#15191E] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C6A46A]"
                        style={{ width: `${selectedClass.arcana}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#B9B8B0] mb-1">
                      <span>AGILITY</span>
                      <span className="text-[#C6A46A]">{selectedClass.agility} / 100</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#15191E] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#B9B8B0]"
                        style={{ width: `${selectedClass.agility}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expedition' && (
            <div className="max-w-2xl mx-auto space-y-6 text-center">
              <div className="w-12 h-12 rounded-full border border-[#C6A46A] bg-[#681D20]/40 flex items-center justify-center mx-auto mb-3">
                <Compass className="w-6 h-6 text-[#E2C799]" />
              </div>
              <h4 className="font-cinzel text-2xl font-bold text-[#D7DCE0]">
                Expedition Target Confirmed
              </h4>
              <p className="text-xs sm:text-sm text-[#B9B8B0] leading-relaxed">
                Thy waypoint is the Crown of the Sovereign Spire. Four seals must be shattered across
                the Viaduct, Chasm, and Sunken Crypts before the Great Wyrm may be challenged.
              </p>
              <div className="p-4 bg-[#15191E] border border-[#424A53]/50 rounded-xs text-xs font-mono text-[#C66B38] text-left">
                STATUS: READY TO DEPLOY · DIFFICULTY: PUNISHING · CO-OP SUMMONING: ENABLED
              </div>
              <button
                onClick={() => {
                  sound.playBell(340, 4);
                  sound.triggerHaptic(40);
                  onClose();
                }}
                className="px-8 py-3.5 bg-[#681D20] hover:bg-[#852327] border border-[#C6A46A] text-[#D7DCE0] font-cinzel font-bold text-xs tracking-[0.2em] uppercase rounded-xs"
              >
                PROCEED INTO ASHENVEIL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
