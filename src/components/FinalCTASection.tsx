import React, { useState } from 'react';
import { Flame, CheckCircle, Send, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

interface FinalCTAProps {
  onEnterRealm: () => void;
}

export const FinalCTASection: React.FC<FinalCTAProps> = ({ onEnterRealm }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    sound.playBell(300, 3);
    sound.triggerHaptic(30);
    setIsSubscribed(true);
  };

  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#090B0E] border-t border-[#424A53]/30 overflow-hidden text-center select-none">
      {/* Background with dramatic dark fantasy atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/src/assets/images/hero_citadel_peaks_1792815042898.jpg"
          alt="Citadel background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-bottom filter brightness-20 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E] via-[#090B0E]/80 to-[#090B0E]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-cinzel font-bold tracking-[0.25em] text-[#C6A46A] uppercase mb-4">
          <Flame className="w-4 h-4 text-[#C66B38]" />
          <span>JOIN THE CLOSED SANCTUM PLAYTEST</span>
        </div>

        <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.14em] text-[#D7DCE0] mb-5">
          WILL YOU KINDLE THE ASH?
        </h2>

        <p className="text-sm sm:text-base text-[#B9B8B0] leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          The gates to Ashenveil will open. Register for early access playtest dispatches, closed
          beta invitations, and exclusive in-game relics before launch.
        </p>

        {/* Enter Realm Big CTA */}
        <div className="mb-14">
          <button
            onClick={() => {
              sound.playBell(220, 4);
              sound.playBladeShimmer();
              sound.triggerHaptic(40);
              onEnterRealm();
            }}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-transparent hover:bg-[#C6A46A]/10 active:bg-[#C6A46A]/20 border-2 border-[#C6A46A] rounded-xs text-sm sm:text-base font-cinzel font-bold tracking-[0.2em] text-[#D7DCE0] uppercase hover:shadow-[0_0_35px_rgba(198,164,106,0.5)] hover:border-[#E2C799] transition-all duration-300"
          >
            <Shield className="w-5 h-5 text-[#C6A46A]" />
            <span>ENTER THE REALM</span>
          </button>
        </div>

        {/* Sanctum Dispatch Newsletter Form */}
        <div className="max-w-md mx-auto bg-[#15191E]/90 border border-[#424A53]/60 p-6 rounded-xs shadow-2xl backdrop-blur-md">
          <span className="text-[11px] font-mono tracking-widest text-[#C6A46A] uppercase block mb-3">
            HERALD DISPATCH REGISTRATION
          </span>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 text-xs font-cinzel text-[#E2C799] py-3 bg-[#681D20]/40 border border-[#C6A46A]/40 rounded-xs">
              <CheckCircle className="w-4 h-4 text-[#C66B38]" />
              <span>Thy oath has been etched into the sanctum ledger.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter thy courier address..."
                required
                className="flex-1 bg-[#090B0E] border border-[#424A53] focus:border-[#C6A46A] text-[#D7DCE0] text-xs px-4 py-3 rounded-xs outline-none transition-colors placeholder:text-[#8C939D]"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#15191E] border border-[#C6A46A] hover:bg-[#C6A46A]/20 text-[#E2C799] text-xs font-cinzel font-bold tracking-wider rounded-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>ENLIST</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-mono text-[#8C939D]">
            <span>STEAM</span>
            <span>·</span>
            <span>PLAYSTATION 5</span>
            <span>·</span>
            <span>XBOX SERIES X|S</span>
          </div>
        </div>
      </div>
    </section>
  );
};
