import React from 'react';
import { Flame, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

export const GameFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#07080A] border-t border-[#424A53]/40 py-12 sm:py-16 text-[#8C939D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#424A53]/25">
          {/* Brand & Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center border border-[#C6A46A]/50 bg-[#15191E] rounded-xs">
              <Flame className="w-4 h-4 text-[#C66B38]" />
            </div>
            <span className="font-cinzel text-lg font-bold tracking-[0.2em] text-[#D7DCE0]">
              ASHENVEIL
            </span>
          </div>

          {/* Clean Editorial Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs font-mono tracking-wider text-[#B9B8B0]">
            <a
              href="#world"
              onClick={() => sound.triggerHaptic(10)}
              className="hover:text-[#C6A46A] transition-colors"
            >
              THE WORLD
            </a>
            <a
              href="#story"
              onClick={() => sound.triggerHaptic(10)}
              className="hover:text-[#C6A46A] transition-colors"
            >
              LORE ARCHIVE
            </a>
            <a
              href="#gameplay"
              onClick={() => sound.triggerHaptic(10)}
              className="hover:text-[#C6A46A] transition-colors"
            >
              COMBAT PILLARS
            </a>
            <a
              href="#media"
              onClick={() => sound.triggerHaptic(10)}
              className="hover:text-[#C6A46A] transition-colors"
            >
              MEDIA VAULT
            </a>
            <a href="#" className="hover:text-[#C6A46A] transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-[#C6A46A] transition-colors">
              TERMS OF SERVICE
            </a>
          </nav>

          {/* Age Rating Badge (PEGI 18 / ESRB Mature) */}
          <div className="flex items-center gap-3 bg-[#0D1014] border border-[#424A53]/60 px-3.5 py-2 rounded-xs">
            <div className="w-8 h-10 bg-[#681D20] text-white flex items-center justify-center font-bold text-xs border border-[#C6A46A]/60">
              M
            </div>
            <div className="text-[10px] font-mono leading-tight">
              <div className="text-[#D7DCE0] font-bold">MATURE 17+</div>
              <div>Blood and Gore, Violence</div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8C939D]">
          <p>© {new Date().getFullYear()} ASHENVEIL STUDIOS. ALL RIGHTS RESERVED.</p>
          <p className="text-center sm:text-right">
            BUILT FOR NEXT-GENERATION HARDWARE · ZERO TELEMETRY TRACKING
          </p>
        </div>
      </div>
    </footer>
  );
};
