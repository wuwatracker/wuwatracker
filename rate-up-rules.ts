/**
 * Represents a rate-up rule with associated featured gacha item names and date range.
 */
export type RateUpRule = {
  rateUp5Names: string[]; // List of names for rate-up 5-star items during this rule's date range
  rateUp4Names: string[]; // List of names for rate-up 4-star items during this rule's date range
  startDate: string; // Start date (inclusive) of the rate-up rule's validity
  endDate: string; // End date (inclusive) of the rate-up rule's validity
};

export const limitedCharacterRateUpRules: RateUpRule[] = [
  {
    rateUp5Names: ['Jiyan'],
    rateUp4Names: ['Chixia', 'Danjin', 'Mortefi'],
    startDate: '2024-05-22',
    endDate: '2024-06-12',
  },
  {
    rateUp5Names: ['Yinlin', 'Jiyan'],
    rateUp4Names: ['Aalto', 'Taoqi', 'Yuanwu', 'Chixia', 'Danjin', 'Mortefi'],
    startDate: '2024-06-05',
    endDate: '2024-06-12',
  },
  {
    rateUp5Names: ['Yinlin'],
    rateUp4Names: ['Aalto', 'Taoqi', 'Yuanwu'],
    startDate: '2024-06-05',
    endDate: '2024-06-28',
  },
  {
    rateUp5Names: ['Jinhsi'],
    rateUp4Names: ['Sanhua', 'Yangyang', 'Danjin'],
    startDate: '2024-06-27',
    endDate: '2024-07-18',
  },
  {
    rateUp5Names: ['Changli'],
    rateUp4Names: ['Baizhi', 'Taoqi', 'Mortefi'],
    startDate: '2024-07-19',
    endDate: '2024-08-07',
  },
] as const;

export const limitedWeaponRateUpRules: RateUpRule[] = [
  {
    rateUp5Names: ['Verdant Summit'],
    rateUp4Names: ['Augment', 'Hollow Mirage', 'Dauntless Evernight'],
    startDate: '2024-05-22',
    endDate: '2024-06-12',
  },
  {
    rateUp5Names: ['Verdant Summit', 'Stringmaster'],
    rateUp4Names: [
      'Augment',
      'Hollow Mirage',
      'Dauntless Evernight',
      'Lunar Cutter',
      'Cadenza',
      'Jinzhou Keeper',
    ],
    startDate: '2024-06-05',
    endDate: '2024-06-12',
  },
  {
    rateUp5Names: ['Stringmaster'],
    rateUp4Names: ['Lunar Cutter', 'Cadenza', 'Jinzhou Keeper'],
    startDate: '2024-06-12',
    endDate: '2024-06-26',
  },
  {
    rateUp5Names: ['Ages of Harvest'],
    rateUp4Names: ['Sanhua', 'Yangyang', 'Danjin'],
    startDate: '2024-06-27',
    endDate: '2024-07-17',
  },
  {
    rateUp5Names: ['Blazing Brilliance'],
    rateUp4Names: ['Baizhi', 'Taoqi', 'Mortefi'],
    startDate: '2024-07-18',
    endDate: '2024-08-07',
  },
] as const;
