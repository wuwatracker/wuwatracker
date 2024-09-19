/**
 * Represents a rate-up rule with associated featured gacha item names and date range.
 */
export type BannerInfo = {
  bannerId: number;
  cardPoolType: number;
  name: string;
  alt: string;
  rateUp5Names?: string[]; // List of names for rate-up 5-star items during this rule's date range
  rateUp4Names?: string[]; // List of names for rate-up 4-star items during this rule's date range
  startDate: string; // Start date in UTC+8 (inclusive) of the rate-up rule's validity
  endDate: string; // End date in UTC+8 (inclusive) of the rate-up rule's validity
  // if the banner doesn't start in their own Server Time, but rather at the same time in the Asia/Shanghai timezone (UTC+8)
  isCstStart?: boolean;
  isCstEnd?: boolean;
};

const standardBanners: BannerInfo[] = [
  {
    bannerId: 300001,
    cardPoolType: 3,
    name: "Permanent Resonator",
    alt: "Tidal Chorus",
    startDate: "2024-05-21 00:00",
    endDate: "2222-05-21 00:00",
  },
  {
    bannerId: 400001,
    cardPoolType: 4,
    name: "Permanent Weapon",
    alt: "Winter Brume",
    startDate: "2024-05-21 00:00",
    endDate: "2222-05-21 00:00",
  },
  {
    bannerId: 500001,
    cardPoolType: 5,
    name: "Novice Convene",
    alt: "Utterance of Marvels",
    startDate: "2024-05-21 00:00",
    endDate: "2222-05-21 00:00",
  },
  {
    bannerId: 600001,
    cardPoolType: 6,
    name: "Beginner's Choice Convene",
    alt: "Beginner's Choice",
    startDate: "2024-05-21 00:00",
    endDate: "2222-05-21 00:00",
  },
  {
    bannerId: 700001,
    cardPoolType: 7,
    name: "Giveback Event Convene",
    alt: "Selector Ticket",
    startDate: "2024-05-21 00:00",
    endDate: "2222-05-21 00:00",
  },
];

export const rawBanners: BannerInfo[] = [
  {
    bannerId: 100001,
    cardPoolType: 1,
    name: "Featured Resonator",
    alt: "Prevail the Lasting Night",
    rateUp5Names: ["Jiyan"],
    rateUp4Names: ["Chixia", "Danjin", "Mortefi"],
    startDate: "2024-05-23 00:00",
    endDate: "2024-06-06 09:59:59",
    isCstStart: true,
    isCstEnd: true,
  },
  {
    bannerId: 100002,
    cardPoolType: 1,
    name: "Featured Resonator",
    alt: "When Thunder Pours (Early)",
    rateUp5Names: ["Yinlin", "Jiyan"],
    rateUp4Names: ["Aalto", "Taoqi", "Yuanwu", "Chixia", "Danjin", "Mortefi"],
    startDate: "2024-06-06 10:00",
    endDate: "2024-06-13 09:59:59",
    isCstStart: true,
  },
  {
    bannerId: 100003,
    cardPoolType: 1,
    name: "Featured Resonator",
    alt: "When Thunder Pours",
    rateUp5Names: ["Yinlin"],
    rateUp4Names: ["Aalto", "Taoqi", "Yuanwu"],
    startDate: "2024-06-13 10:00",
    endDate: "2024-06-26 23:59:59",
  },
  {
    bannerId: 100004,
    cardPoolType: 1,
    name: "Featured Resonator",
    alt: "Thawborn Renewal",
    rateUp5Names: ["Jinhsi"],
    rateUp4Names: ["Sanhua", "Yangyang", "Danjin"],
    startDate: "2024-06-28 12:00",
    endDate: "2024-07-22 09:59:59",
    isCstStart: true,
  },
  {
    bannerId: 100005,
    cardPoolType: 1,
    name: "Featured Resonator",
    alt: "Vermillion's Ploy",
    rateUp5Names: ["Changli"],
    rateUp4Names: ["Baizhi", "Taoqi", "Mortefi"],
    startDate: "2024-07-22 10:00",
    endDate: "2024-08-14 11:59:59",
  },
  {
    bannerId: 100006,
    cardPoolType: 1,
    name: "Featured Resonator",
    alt: "Chromatic Prose",
    rateUp5Names: ["Zhezhi"],
    rateUp4Names: ["Sanhua", "Baizhi", "Chixia"],
    startDate: "2024-08-15 12:00",
    endDate: "2024-09-07 09:59:59",
    isCstStart: true,
  },
  {
    bannerId: 100007,
    cardPoolType: 1,
    name: "Featured Resonator",
    alt: "Celestial Revelation",
    rateUp5Names: ["Xiangli Yao"],
    rateUp4Names: ["Aalto", "Yuanwu", "Danjin"],
    startDate: "2024-09-07 10:00",
    endDate: "2024-09-28 11:59:59",
  },
  {
    bannerId: 100008,
    cardPoolType: 1,
    name: "Featured Resonator",
    alt: "Stellar Symphony",
    rateUp5Names: ["Shorekeeper"],
    rateUp4Names: ["Youhu"],
    startDate: "2024-09-29 12:00",
    endDate: "2024-10-19 09:59:59",
    isCstStart: true,
  },
  {
    bannerId: 200001,
    cardPoolType: 2,
    name: "Featured Weapon",
    alt: "Absolute Pulsation",
    rateUp5Names: ["Verdant Summit"],
    rateUp4Names: ["Augment", "Hollow Mirage", "Dauntless Evernight"],
    startDate: "2024-05-23 00:00",
    endDate: "2024-06-06 09:59:59",
    isCstStart: true,
    isCstEnd: true,
  },
  {
    bannerId: 200002,
    cardPoolType: 2,
    name: "Featured Weapon",
    alt: "Absolute Pulsation",
    rateUp5Names: ["Stringmaster", "Verdant Summit"],
    rateUp4Names: [
      "Augment",
      "Hollow Mirage",
      "Dauntless Evernight",
      "Lunar Cutter",
      "Cadenza",
      "Jinzhou Keeper",
    ],
    startDate: "2024-06-06 10:00",
    endDate: "2024-06-13 09:59:59",
    isCstStart: true,
  },
  {
    bannerId: 200003,
    cardPoolType: 2,
    name: "Featured Weapon",
    alt: "Absolute Pulsation",
    rateUp5Names: ["Stringmaster"],
    rateUp4Names: ["Lunar Cutter", "Cadenza", "Jinzhou Keeper"],
    startDate: "2024-06-13 10:00",
    endDate: "2024-06-26 23:59:59",
  },
  {
    bannerId: 200004,
    cardPoolType: 2,
    name: "Featured Weapon",
    alt: "Absolute Pulsation",
    rateUp5Names: ["Ages of Harvest"],
    rateUp4Names: ["Discord", "Commando of Conviction", "Amnity Accord"],
    startDate: "2024-06-28 12:00",
    endDate: "2024-07-22 09:59:59",
    isCstStart: true,
  },
  {
    bannerId: 200005,
    cardPoolType: 2,
    name: "Featured Weapon",
    alt: "Absolute Pulsation",
    rateUp5Names: ["Blazing Brilliance"],
    rateUp4Names: ["Comet Flare", "Overture", "Undying Flame"],
    startDate: "2024-07-22 10:00",
    endDate: "2024-08-14 11:59:59",
  },
  {
    bannerId: 200006,
    cardPoolType: 2,
    name: "Featured Weapon",
    alt: "Absolute Pulsation",
    rateUp5Names: ["Rime-Draped Sprouts"],
    rateUp4Names: ["Dauntless Evernight", "Jinzhou Keeper", "Hollow Mirage"],
    startDate: "2024-08-15 12:00",
    endDate: "2024-09-07 09:59:59",
    isCstStart: true,
  },
  {
    bannerId: 200007,
    cardPoolType: 2,
    name: "Featured Weapon",
    alt: "Absolute Pulsation",
    rateUp5Names: ["Verity's Handle"],
    rateUp4Names: ["Marcato", "Helios Cleaver", "Novaburst"],
    startDate: "2024-09-07 10:00",
    endDate: "2024-09-28 11:59:59",
  },
  {
    bannerId: 200008,
    cardPoolType: 2,
    name: "Featured Weapon",
    alt: "Stellar Symphony",
    rateUp5Names: ["Stellar Symphony"],
    rateUp4Names: [],
    startDate: "2024-09-29 12:00",
    endDate: "2024-10-19 09:59:59",
    isCstStart: true,
  },
  ...standardBanners,
];

export const banners = rawBanners.filter((b) => {
  const UNRELEASED_BANNERS: number[] = [100008, 200008];
  return !UNRELEASED_BANNERS.includes(b.bannerId);
});
