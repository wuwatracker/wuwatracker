export interface Event {
  id?: number; // announcement id
  name: string;
  description?: string;
  img: string;
  startDate: string; // use Server time (UTC+8)
  endDate: string; // use Server time (UTC+8)
  color?: string; // defaults to automatically detecting the img color (prefer darker colors)
  url?: string; // link to an informative page about the event, always prefer https://wutheringwaves.kurogames.com/en/main/news
  showOnHome?: boolean; // whether we show it in the home dashboard
  isGlobal?: boolean;
  sourceName?: string; // the display name of the source URL
  reliability?: "Speculation" | "Official";
  group?: number; // events with the same group will overlap and merge if they are within 1 hour from each other's start & end dates, respectively
}

export const EVENT_GROUP = {
  PIONEER_PODCAST: 0,
  ILLUSIVE_REALM: 1,
  TOWER_OF_ADVERSITY: 2,
  DOUBLE_DROPS: 3,
  SEVEN_DAY_LOGIN: 4,
};

/**
 * Edit the values here.
 *
 * Make sure the `startDate` and `endDate` values are the game server's time (UTC+8) which are the SEA, Asia, HK server times.
 */
const rawEvents: { banners: Event[]; activities: Event[] } = {
  banners: [
    {
      name: "Til the Sea Turns Clear - Shorekeeper Banner",
      img: "https://snipboard.io/emZLR4.jpg",
      description: "Featured 4* are; Taoqi, Yangyang, Chixia.",
      startDate: "2024-09-29 11:00",
      endDate: "2024-10-24 09:59",
      isGlobal: true,
      color: "#294156",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      group: 0,
    },
    {
      name: "Stellar Symphony - Shorekeeper Weapon Banner",
      img: "https://snipboard.io/7WbTz0.jpg",
      description: "Featured 4* are; Endless Collapse, Discord, Comet Flare.",
      startDate: "2024-09-29 11:00",
      endDate: "2024-10-24 09:59",
      isGlobal: true,
      color: "#7871a5",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      reliability: "Official",
      group: 1,
    },
    {
      name: "Prevail The Lasting Night - Jiyan Rerun Banner",
      img: "https://snipboard.io/S5xARm.jpg",
      description: "Featured 4* are; Youhu, Sanhua, Mortefi.",
      startDate: "2024-10-24 10:00",
      endDate: "2024-11-13 11:59",
      color: "#54c1d6",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      reliability: "Official",
      group: 0,
    },
    {
      name: "Verdant Summit - Jiyan Weapon Banner",
      img: "https://snipboard.io/MugnOr.jpg",
      description:
        "Featured 4* are; Celestial Spiral, Variation, Helios Cleaver.",
      startDate: "2024-10-24 10:00",
      endDate: "2024-11-13 11:59",
      color: "#92875d",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      reliability: "Official",
      group: 1,
    },
  ],
  activities: [
    {
      name: "The Black Shores - Regional Events",
      img: "https://snipboard.io/iYWCPA.jpg",
      description: `Participate in "Where Stars Slumber - Area Exploration Event" and "Amidst the Stars - Photo Collection Event" to get rewards; 740*Astrite, 1*Deep Sky Blazar Weapon Chest, Forgery Premium Supply, Molded Elite Class Echo I, Molded Elite Class Echo II.`,
      startDate: "2024-09-29 11:00",
      endDate: "2024-11-13 15:59",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      color: "#34356f",
      reliability: "Official",
    },
    {
      name: "Parade of Stars - Special Leveling Event",
      img: "https://snipboard.io/2qypKM.jpg",
      description: `Complete 4 themed leveling activities Resonator, weapon, Echo, and skill to earn rewards based on materials consumed. Rewards; 50*Premium Sealed Tube, 50*Premium Resonance Potion, 34*Premium Energy Core, 25*Forgery Premium Supply, 28*Premium Enclosure Tank.`,
      startDate: "2024-09-29 11:00",
      endDate: "2024-11-13 15:59",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      color: "#121926",
      reliability: "Official",
    },
    {
      name: "Fairy Tale's Finale - Featured Co-op Combat Event",
      img: "https://snipboard.io/6ptCEy.jpg",
      description: `Fairy Tale's Finale offers 12 event stages that will unlock one by one. Choose "Dorothy's Companions" as Echoes to assist you in battle, which greatly enhances the combat abilities of Resonators. Rewards; 600*Astrite, Forgery Premium Supply, Premium Sealed Tube, Premium Energy Core, Premium Tuner.`,
      startDate: "2024-10-01 10:00",
      endDate: "2024-10-24 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      color: "#c6afbb",
      reliability: "Official",
    },
    {
      name: "Solaris Weather Forecast - Featured Platforming Event",
      img: "https://snipboard.io/dFa1nR.jpg",
      description: `As time progress, new Detection Points will unlock. Head to the Detection Points to begin combat challenges. Use secondary mechanisms nearby to collect Surveillance Datasets before time runs out. Rewards; 400*Astrite, Premium Resonance Potion, Premium Energy Core, Premium Sealed Tube, Forged Advanced Supply.`,
      startDate: "2024-10-10 10:00",
      endDate: "2024-10-31 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      color: "#35546a",
      reliability: "Official",
    },
    {
      name: "Infinite Battle Simulation - Featured Arena Combat Event",
      img: "https://snipboard.io/j68R2V.jpg",
      description: `Defeat as many enemies as possible and open Supply Chests to claim Tactic Points and Low-Capacity Variable buffs. Rewards; 600*Astrite, Malleable Elite Class Echo I, Malleable Elite Class Echo II, Premium Sealed Tube, Shell Credit.`,
      startDate: "2024-10-24 10:00",
      endDate: "2024-11-13 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      color: "#2f4887",
      reliability: "Official",
    },
    {
      name: "Lollo Compaign: Rerun - Featured Commission Event",
      img: "https://snipboard.io/hKnQ7i.jpg",
      description: `Complete Lollo Campaigns once per day to obtain a set number of Lotto Stamps. Exchange these stamps for a special delivery from Lollo Helper, granting you one spin on the wheel lottery. Rewards; 400*Astrite, 5*Lustrous Tide, Forgery Premium Supply, Premium Sealed Tube, Crystal Solvent.`,
      startDate: "2024-10-24 10:00",
      endDate: "2024-11-07 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      color: "#755b3f",
      reliability: "Official",
    },
    {
      name: "Wuthering Exploration - Featured Exploration Event",
      img: "https://snipboard.io/Wo1MBS.jpg",
      description: `Complete Survey Tasks and accumulate Survey Points to secure valuable rewards offered by the Pioneer Association. Rewards; 2000000*Shell Credit, 30*Tailored Ring, 30*FF Whisperin Core, 30*FF Howler Core.`,
      startDate: "2024-10-10 10:00",
      endDate: "2024-10-24 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      color: "#405dab",
      reliability: "Official",
    },
    {
      name: "Wuthering Exploration - Mt. Firmament Featured Exploration Event",
      img: "https://snipboard.io/W9kgXx.jpg",
      description: `Complete Survey Tasks and accumulate Survey Points to secure valuable rewards offered by the Pioneer Association. Rewards; 800*Astrite, 1*Malleable Elite Class Echo I, 1*Malleable Elite Class Echo II, 100*Premium Tuner, 30*Premium Sealed Tube.`,
      startDate: "2024-10-31 10:00",
      endDate: "2024-11-13 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      color: "#a9bcd2",
      reliability: "Official",
    },
    {
      name: "Bountiful Crescendo: Leveling Material Double Drop Event",
      img: "https://snipboard.io/4i3kVO.jpg",
      description: `Consume Waveplates to claim double rewards when completing the "Simulation Challenge" and "Forgery Challenge".`,
      startDate: "2024-10-17 04:00",
      endDate: "2024-10-24 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      reliability: "Official",
      group: EVENT_GROUP.DOUBLE_DROPS,
      color: "#2b587a",
    },
    {
      name: "Chord Cleansing: Echo Double Drop Event",
      img: "https://snipboard.io/uDQv0C.jpg",
      description: `Consume Waveplates to claim double rewards when completing the "Tacet Suppression" challenge.`,
      startDate: "2024-11-06 04:00",
      endDate: "2024-11-13 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      reliability: "Official",
      group: EVENT_GROUP.DOUBLE_DROPS,
      color: "#3a75a8",
    },
    {
      name: "Gifts of Sea Breeze: 7-day Sign-in Event",
      img: "https://snipboard.io/HNjqi0.jpg",
      description:
        "Log into the game and check into claim rewards: 5*Radiant Tide and 5*Lustrous Tide.",
      startDate: "2024-09-29 11:00",
      endDate: "2024-11-13 03:59",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      color: "#72809e",
      reliability: "Official",
      group: EVENT_GROUP.SEVEN_DAY_LOGIN,
    },
    {
      name: "Tower of Adversity: Hazard Revisited",
      img: "https://snipboard.io/NnA3YO.jpg",
      startDate: "2024-10-28 04:00",
      endDate: "2024-11-10 04:00",
      color: "#18235f",
      reliability: "Official",
      group: EVENT_GROUP.TOWER_OF_ADVERSITY,
    },
    {
      name: "Pioneer Podcast",
      img: "https://snipboard.io/fiqQbc.jpg",
      description: `You can complete tasks in Pioneer Podcast and accumulate Podcast EXP. Level up your Podcast to get rich rewards. Unlock "Insider Channel" or "Connoisseur Channel" and level up your Podcast to win extra rewards including Astrite*680, a 4-star Golden Eternal Series Weapon of Choice, Radiant Tide, and more! Unlocking "Connoisseur Channel" grants an instant advance of Podcast level by 10, with the period-limited Sigil "Sound of Tides", Lustrous Tide*3, and Gilded Ginkgo (can be used to improve the Syntonization Rank of a 4-star Golden Eternal Series Weapon).`,
      startDate: "2024-09-29 11:00",
      endDate: "2024-11-13 03:59",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1408",
      reliability: "Official",
      group: EVENT_GROUP.PIONEER_PODCAST,
      color: "#a7a8de",
    },
  ],
};

export const events = {
  banners: rawEvents.banners,
  activities: rawEvents.activities,
};
