/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeroNavigation } from './components/HeroNavigation';
import { CinematicHero } from './components/CinematicHero';
import { WorldSection } from './components/WorldSection';
import { LegendSection } from './components/LegendSection';
import { GameplaySection } from './components/GameplaySection';
import { MediaSection } from './components/MediaSection';
import { FinalCTASection } from './components/FinalCTASection';
import { GameFooter } from './components/GameFooter';
import { EnterRealmModal } from './components/EnterRealmModal';

export default function App() {
  const [isEnterRealmOpen, setIsEnterRealmOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  return (
    <div className={`min-h-screen bg-[#090B0E] text-[#B9B8B0] ${isHighContrast ? 'contrast-115' : ''}`}>
      {/* Top Bar Navigation */}
      <HeroNavigation
        onEnterRealm={() => setIsEnterRealmOpen(true)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
      />

      <main>
        {/* Full-Screen 100svh Hero Scene */}
        <CinematicHero
          onEnterRealm={() => setIsEnterRealmOpen(true)}
          isHighContrast={isHighContrast}
        />

        {/* Section A: The World */}
        <WorldSection />

        {/* Section B: The Legend */}
        <LegendSection />

        {/* Section C: Gameplay Pillars */}
        <GameplaySection />

        {/* Section D: Cinematic Media & Screenshots */}
        <MediaSection />

        {/* Section E: Final Call-to-Action */}
        <FinalCTASection onEnterRealm={() => setIsEnterRealmOpen(true)} />
      </main>

      {/* Footer */}
      <GameFooter />

      {/* Interactive Enter Realm Fullscreen Experience Modal */}
      <EnterRealmModal
        isOpen={isEnterRealmOpen}
        onClose={() => setIsEnterRealmOpen(false)}
      />
    </div>
  );
}
