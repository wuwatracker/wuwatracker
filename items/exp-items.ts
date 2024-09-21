export interface ExpItem {
  id: number;
  exp: number;
}

export const RESONATOR_EXP_ITEMS: ExpItem[] = [
  { id: 43010004, exp: 20000 }, // Premium Resonance Potion
  { id: 43010003, exp: 8000 }, // Advanced Resonance Potion
  { id: 43010002, exp: 3000 }, // Medium Resonance Potion
  { id: 43010001, exp: 1000 }, // Basic Resonance Potion
];

export const WEAPON_EXP_ITEMS: ExpItem[] = [
  { id: 43020004, exp: 20000 }, // Premium Energy Core
  { id: 43020003, exp: 8000 }, // Advanced Energy Core
  { id: 43020002, exp: 3000 }, // Medium Energy Core
  { id: 43020001, exp: 1000 }, // Basic Energy Core
];
