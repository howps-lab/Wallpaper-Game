import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, Eye, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroNavigationProps {
  onEnterRealm: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
}

export const HeroNavigation: React.FC<HeroNavigationProps> = ({
  onEnterRealm,
  isHighContrast,
  onToggleHighContrast,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = sound.toggleMute();
    setIsSoundActive(active);
  };

  const navLinks = [
    { label: 'THE WORLD', href: '#world' },
    { label: 'STORY', href: '#story' },
    { label: 'GAMEPLAY', href: '#gameplay' },
    { label: 'MEDIA', href: '#media' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#090B0E]/95 backdrop-blur-md border-b border-[#424A53]/30 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#090B0E]/80 via-[#090B0E]/40 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone */}
        <a
          href="#"
          className="flex items-center gap-3 group whitespace-nowrap shrink-0"
          onClick={() => sound.triggerHaptic(15)}
        >
          {/* Custom Dark Fantasy Sigil */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-[#C6A46A]/60 rounded-sm bg-[#15191E] shadow-[0_0_12px_rgba(198,164,106,0.25)] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#C6A46A]">
            <div className="absolute inset-0.5 border border-[#424A53]/50" />
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#C66B38] group-hover:text-[#E2C799] transition-colors" />
          </div>
          <span className="font-cinzel text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] text-[#D7DCE0] group-hover:text-[#C6A46A] transition-colors">
            ASHENVEIL
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-[0.2em] text-[#B9B8B0]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 hover:text-[#D7DCE0] transition-colors group whitespace-nowrap shrink-0"
              onMouseEnter={() => sound.triggerHaptic(10)}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C6A46A] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Audio soundscape toggle */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 rounded border transition-colors ${
              isSoundActive
                ? 'border-[#C6A46A] bg-[#C6A46A]/10 text-[#C6A46A]'
                : 'border-[#424A53]/60 bg-[#15191E]/60 text-[#B9B8B0] hover:text-[#D7DCE0] hover:border-[#B9B8B0]'
            }`}
            title={isSoundActive ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
            aria-label="Toggle ambient sound"
          >
            {isSoundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* High Contrast / Night Vision Mode Toggle */}
          <button
            onClick={onToggleHighContrast}
            className={`p-2 rounded border transition-colors ${
              isHighContrast
                ? 'border-[#C66B38] bg-[#C66B38]/20 text-[#C66B38]'
                : 'border-[#424A53]/60 bg-[#15191E]/60 text-[#B9B8B0] hover:text-[#D7DCE0]'
            }`}
            title="Toggle high-contrast fantasy mode"
            aria-label="Toggle high-contrast visual mode"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              sound.playBell(260, 3.5);
              sound.playBladeShimmer();
              sound.triggerHaptic(30);
              onEnterRealm();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 text-xs font-cinzel font-bold tracking-[0.16em] uppercase text-[#D7DCE0] bg-transparent hover:bg-[#C6A46A]/10 border border-[#C6A46A] rounded-xs transition-all duration-300 hover:shadow-[0_0_15px_rgba(198,164,106,0.35)] whitespace-nowrap shrink-0 hover:border-[#E2C799]"
          >
            <Shield className="w-3.5 h-3.5 text-[#C6A46A]" />
            ENTER THE REALM
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.triggerHaptic(15);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden p-2 rounded border border-[#424A53]/60 bg-[#15191E] text-[#D7DCE0] hover:border-[#C6A46A]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#090B0E]/98 border-b border-[#C6A46A]/30 px-6 py-6 space-y-4 backdrop-blur-xl animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.triggerHaptic(15);
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-cinzel font-semibold tracking-widest text-[#B9B8B0] hover:text-[#C6A46A] py-2 border-b border-[#424A53]/20"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playBell();
                sound.triggerHaptic(30);
                setIsMobileMenuOpen(false);
                onEnterRealm();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-cinzel font-bold tracking-widest uppercase text-[#D7DCE0] bg-transparent hover:bg-[#C6A46A]/10 border border-[#C6A46A] rounded-xs"
            >
              <Shield className="w-4 h-4 text-[#C6A46A]" />
              ENTER THE REALM
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
