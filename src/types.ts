export interface LoreLocation {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  dangerLevel: string;
  coords: { x: number; y: number };
  image: string;
}

export interface GameplayFeature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  image: string;
  combatRole: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: 'Cinematic' | 'Gameplay' | 'Environment';
  image: string;
  runtime?: string;
  description: string;
}

export interface CharacterClass {
  id: string;
  name: string;
  title: string;
  role: string;
  description: string;
  weapon: string;
  affinity: string;
}
