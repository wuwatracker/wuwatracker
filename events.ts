import { convertDatesToServerTime } from "./lib/convertDatesToServerTime";

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
};

/**
 * Edit the values here.
 *
 * Make sure the `startDate` and `endDate` values are the game server's time (UTC+8) which are the SEA, Asia, HK server times.
 */
const rawEvents: { banners: Event[]; activities: Event[] } = {
  banners: [
    {
      name: "Thawborn Renewal - Jinhsi Banner",
      img: "https://snipboard.io/DUVFSa.jpg",
      startDate: "2024-06-28 12:00",
      endDate: "2024-07-22 09:59",
      color: "#5ba099",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
      reliability: "Official",
      group: 0,
    },
    {
      name: "Absolute Pulsation - Jinhsi Weapon Banner",
      img: "https://snipboard.io/Luw9Yy.jpg",
      startDate: "2024-06-28 12:00",
      endDate: "2024-07-22 09:59",
      color: "#a7d8d3",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
      reliability: "Official",
      group: 1,
    },
    {
      name: "Stellar Plummage - Changli Banner",
      img: "https://snipboard.io/1C0Pad.jpg",
      startDate: "2024-07-22 10:00",
      endDate: "2024-08-14 11:59",
      color: "#88302d",
      url: "https://x.com/Wuthering_Waves/status/1814858069966553374",
      reliability: "Official",
      group: 0,
    },
    {
      name: "Absolute Pulsation - Changli Weapon Banner",
      img: "https://snipboard.io/iv6RHT.jpg",
      startDate: "2024-07-22 10:00",
      endDate: "2024-08-14 11:59",
      color: "#ee8548",
      url: "https://x.com/Wuthering_Waves/status/1814861986544693558",
      reliability: "Official",
      group: 1,
    },
    {
      name: "Chromatic Prose - Zhezhi Banner",
      img: "https://snipboard.io/xcDvKo.jpg",
      startDate: "2024-08-15 13:00",
      endDate: "2024-09-07 09:59",
      color: "#7cb3ba",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      group: 0,
    },
    {
      name: "Absolute Pulsation - Zhezhi Weapon Banner",
      img: "https://snipboard.io/LiUNfr.jpg",
      startDate: "2024-08-15 13:00",
      endDate: "2024-09-07 09:59",
      color: "#4fbdbe",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      group: 1,
    },
    {
      name: "Celestial Revelation - Xiangli Yao Banner",
      img: "https://snipboard.io/6Ywh7F.jpg",
      startDate: "2024-09-07 10:00",
      endDate: "2024-09-28 11:59",
      color: "#5562cc",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      group: 0,
    },
    {
      name: "Absolute Pulsation - Xiangli Yao Weapon Banner",
      img: "https://snipboard.io/6zIkbw.jpg",
      startDate: "2024-09-07 10:00",
      endDate: "2024-09-28 11:59",
      color: "#483a74",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      group: 1,
    },
  ],
  activities: [
    {
      name: "Pioneer Podcast",
      img: "https://snipboard.io/dBPpt2.jpg",
      color: "#e4c190",
      description: `You can complete tasks in Pioneer Podcast and accumulate Podcast EXP. Level up your Podcast to get rich rewards. Unlock "Insider Channel" or "Connoisseur Channel" and level up your Podcast to win extra rewards including Astrite*600, a 4-star Golden Eternal Series Weapon of Choice, and Radiant Tide!`,
      startDate: "2024-06-28 12:00",
      endDate: "2024-08-13 03:59",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
      reliability: "Official",
      group: EVENT_GROUP.PIONEER_PODCAST,
    },
    {
      name: "[Tales from Mt. Firmament] Area Exploration Event",
      img: "https://snipboard.io/zWIVdM.jpg",
      color: "#633d35",
      description:
        "Divided into four stages, this event will have separate stages unlocked according to the progress of Main Quests. By completing Exploration & Puzzle-solving, Battle Challenge, Gathering, and other quests available in the Mt. Firmament, you'll be awarded diverse rewards.",
      startDate: "2024-06-28 12:00",
      endDate: "2024-08-13 03:59",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
      reliability: "Official",
    },
    {
      name: "[Traces of Mt. Firmament] Photo Collection Event",
      img: "https://snipboard.io/VA7tnJ.jpg",
      color: "#7a4738",
      description:
        "Follow the clues to explore the corresponding area, take the correct photos, or search at the target location. Completing the above tasks will grant rewards.",
      startDate: "2024-06-28 12:00",
      endDate: "2024-08-13 03:59",
      isGlobal: true,
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
      reliability: "Official",
    },
    {
      name: "Limited Time Check-in Event",
      img: "https://snipboard.io/l6iRhf.jpg",
      description:
        "Log in the game and check in to receive corresponding rewards on respective dates.",
      startDate: "2024-07-04 04:00",
      endDate: "2024-08-13 03:59",
      color: "#af6d69",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
      reliability: "Official",
    },
    {
      name: "Gifts of Celestial Light: 7-day Login Event",
      img: "https://snipboard.io/ET3clt.jpg",
      description:
        "Log into the game and check in to claim rewards: 5x Radiant Tide & 5x Lustrous Tide",
      color: "#4f493e",
      startDate: "2024-06-28 12:00",
      endDate: "2024-08-13 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
      reliability: "Official",
      isGlobal: true,
    },
    {
      name: "Depths of Illusive Realm: Dreams Ablaze in Darkness",
      img: "https://snipboard.io/nEcqzG.jpg",
      color: "#9a4431",
      description: `The New Season "Dreams Ablaze in Darkness" opens! New mechanics such as Tokens, Symphony Rank, and different Memetic Tuning are available for you to create your own powerful build. Main rewards are; 1000x Astrite, 1x Malleable Elite Class Echo I, 1x Malleable Elite Class Echo II, Premium Tuners, Crystal Solvents.`,
      startDate: "2024-07-04 10:00",
      endDate: "2024-08-05 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/975",
      reliability: "Official",
      group: EVENT_GROUP.ILLUSIVE_REALM,
    },
    {
      name: "Tower of Adversity: Hazard Zone",
      img: "https://snipboard.io/NnA3YO.jpg",
      startDate: "2024-08-05 11:00",
      endDate: "2024-08-19 04:00",
      color: "#18235f",
      reliability: "Official",
      group: EVENT_GROUP.TOWER_OF_ADVERSITY,
    },
    {
      name: "By Moon's Grace",
      img: "https://snipboard.io/VWCEnw.jpg",
      description: `Assist in the preparation for the Moonlit Fair with Xiangli Yao. The Popularity of the Moon-Chasing Festival can be earned by building "Fair Stalls" and completing "Wishes". You may invite Resonators as your Companions by completing Side Quests during the preparation.`,
      startDate: "2024-08-15 13:00",
      endDate: "2024-09-28 15:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      isGlobal: true,
      color: "#e4b087",
    },
    {
      name: "Gifts of Lunar Radiance: 7-day Sign-in Event",
      img: "https://snipboard.io/4w9vZM.jpg",
      description:
        "Log into the game and check into claim rewards: 5*Radiant Tide and 5*Lustrous Tide.",
      endDate: "2024-09-28 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      startDate: "2024-08-15 13:00",
      isGlobal: true,
      color: "#a1ccfa",
    },
    {
      name: "Converging Paths",
      img: "https://snipboard.io/KomyFi.jpg",
      description: `Participate in the "By Moon's Grace" event and prepare for the Moonlit Fair. Upon reaching the specific Popularity, the 5-star Resonator Xiangli Yao can be claimed for free!`,
      startDate: "2024-09-07 10:00",
      endDate: "2024-09-28 15:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      color: "#323b61",
    },
    {
      name: "Dephs of Illusive Realm: Carnival in Slumberland",
      img: "https://snipboard.io/LG7Hsb.jpg",
      description: `New Content "Carnival in Slumberland" Open! Phantom Echo: Dreamless and new Metaphors will be available for you to select. Rewards; 1000*Astrite, Phantom: Dreamless, Malleable Elite Class Echo I, Malleable Elite Class Echo II, Premium Sealed Tubes.`,
      startDate: "2024-08-22 10:00",
      endDate: "2024-09-23 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      group: EVENT_GROUP.ILLUSIVE_REALM,
      color: "#b66188",
    },
    {
      name: "Do Echoids Dream of Electric Sheep? Limited-time Defense Event",
      img: "https://snipboard.io/6cGFbt.jpg",
      description: `Enter a special simulation domain and protect the devices from Tacet Discords' attacks until they're eliminated. During the test, Cosmos will provide Echoids to significantly boost Resonators' combat power. Rewards; 500*Astrite, Malleable Elite Class Echo I, Malleable Elite Class Echo II, Premium Sealed Tube, Shell Credits.`,
      startDate: "2024-09-05 10:00",
      endDate: "2024-09-26 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      color: "#7a8289",
    },
    {
      name: "Alloy Smelt II: Limited-time Defense Event",
      img: "https://snipboard.io/5F7Ha3.jpg",
      description: `Head to a special Sonoro Sphere where you'll be able to release your battle strength with diverse team compositions and corresponding buffs. Rewards; 500*Astrite, Malleable Elite Class Echo I, Malleable Elite Class Echo II, Premium Resonance Potions, Premium Energy Cores.`,
      startDate: "2024-09-16 10:00",
      endDate: "2024-09-28 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      color: "#181c30",
    },
    {
      name: "Bountiful Crescendo: Leveling Material Double Drop Event",
      img: "https://snipboard.io/SwirLt.jpg",
      description: `Consume Waveplates to claim double rewards when completing the "Simulation Challenge" and "Forgery Challenge".`,
      startDate: "2024-08-29 04:00",
      endDate: "2024-09-05 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      group: EVENT_GROUP.DOUBLE_DROPS,
      color: "#2a3043",
    },
    {
      name: "Chord Cleansing: Echo Double Drop Event",
      img: "https://snipboard.io/SwirLt.jpg",
      description: `Consume Waveplates to claim double rewards when completing the "Tacet Suppression" challenge.`,
      startDate: "2024-09-20 04:00",
      endDate: "2024-09-27 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      group: EVENT_GROUP.DOUBLE_DROPS,
      color: "#2a3043",
    },
    {
      name: "Pioneer Podcast",
      img: "https://snipboard.io/1EkOtV.jpg",
      description: `You can complete tasks in Pioneer Podcast and accumulate Podcast EXP. Level up your Podcast to get rich rewards. Unlock "Insider Channel" or "Connoisseur Channel" and level up your Podcast to win extra rewards including Astrite*680, a 4-star Golden Eternal Series Weapon of Choice, Radiant Tide, and more! Unlocking "Connoisseur Channel" grants an instant advance of Podcast level by 10, with the period-limited Sigil "Moonlit Haven", Lustrous Tide*3, and Gilded Ginkgo (can be used to improve the Syntonization Rank of a 4-star Golden Eternal Series Weapon).`,
      startDate: "2024-08-15 13:00",
      isGlobal: true,
      endDate: "2024-09-28 03:59",
      url: "https://wutheringwaves.kurogames.com/en/main/news/detail/1147",
      reliability: "Official",
      group: EVENT_GROUP.PIONEER_PODCAST,
      color: "#594842",
    },
  ],
};

export const events = {
  banners: convertDatesToServerTime(rawEvents.banners),
  activities: convertDatesToServerTime(rawEvents.activities),
};
