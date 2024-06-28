import {
  limitedCharacterRateUpRules,
  limitedWeaponRateUpRules,
} from './rate-up-rules';
import { RateUpRule } from './rate-up-rules';

export interface BannerMetadata {
  cardPoolType: number;
  title: string;
  description: string;
  featuredName: string;
  pullCost: number;
  fiveStarPity: number;
  fourStarPity: number;
  luckdrawSrc: string;
  categorySrc: string;
  href: string;
  rules: RateUpRule[];
}

export const bannerMetadata: BannerMetadata[] = [
  {
    cardPoolType: 1,
    title: 'Thawborn Renewal',
    description: 'Featured Resonator',
    featuredName: 'Jinhsi',
    pullCost: 160,
    fiveStarPity: 80,
    fourStarPity: 10,
    luckdrawSrc: '/assets/luckdraw/jinhsi.webp',
    categorySrc: '/assets/portraits/jinhsi.webp',
    href: '/convene/limited-character',
    rules: limitedCharacterRateUpRules,
  },
  {
    cardPoolType: 2,
    title: 'Absolute Pulsation',
    description: 'Featured Weapon',
    featuredName: 'Ages of Harvest',
    pullCost: 160,
    fiveStarPity: 80,
    fourStarPity: 10,
    luckdrawSrc: '/assets/luckdraw/ages_of_harvest.webp',
    categorySrc: '/assets/portraits/ages_of_harvest.webp',
    href: '/convene/limited-weapon',
    rules: limitedWeaponRateUpRules,
  },
  {
    cardPoolType: 3,
    title: 'Permanent Character',
    description: 'Tidal Chorus',
    featuredName: 'Encore',
    pullCost: 160,
    fiveStarPity: 80,
    fourStarPity: 10,
    luckdrawSrc: '/assets/luckdraw/encore.webp',
    categorySrc: '/assets/portraits/encore.webp',
    href: '/convene/permanent-character',
    rules: [],
  },
  {
    cardPoolType: 4,
    title: 'Weapon Permanent',
    description: 'Winter Brume Banner',
    featuredName: 'Lustrous Razor',
    pullCost: 160,
    fiveStarPity: 80,
    fourStarPity: 10,
    luckdrawSrc: '/assets/luckdraw/lustrous_razor.webp',
    categorySrc: '/assets/portraits/lustrous_razor.webp',
    href: '/convene/permanent-weapon',
    rules: [],
  },
  {
    cardPoolType: 5,
    title: 'Beginner Convene',
    description: 'Utterance of Marvels',
    featuredName: 'Jianxin',
    pullCost: 128, // average pulls since it's always discounted
    fiveStarPity: 50,
    fourStarPity: 10,
    luckdrawSrc: '/assets/luckdraw/jianxin.webp',
    categorySrc: '/assets/portraits/jianxin.webp',
    href: '/convene/starter',
    rules: [],
  },
  {
    cardPoolType: 6,
    title: "Beginner's Choice",
    description: 'Beginner Selector',
    featuredName: 'Calcharo',
    pullCost: 160,
    fiveStarPity: 80,
    fourStarPity: 10,
    luckdrawSrc: '/assets/luckdraw/calcharo.webp',
    categorySrc: '/assets/portraits/calcharo.webp',
    href: '/convene/starter-selector',
    rules: [],
  },
];

export type CardPoolType = 1 | 2 | 3 | 4 | 5 | 6;

export const VALID_CARD_POOL_TYPES: CardPoolType[] = [1, 2, 3, 4, 5, 6];

export function isValidCardPoolType(
  cardPoolType: number
): cardPoolType is CardPoolType {
  return VALID_CARD_POOL_TYPES.includes(cardPoolType as CardPoolType);
}

export function getBannerDataByCardPoolType(
  cardPoolType: CardPoolType
): BannerMetadata {
  return bannerMetadata.find(
    (banner) => banner.cardPoolType === cardPoolType
  ) as BannerMetadata;
}
