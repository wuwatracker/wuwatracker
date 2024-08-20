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
      name: "Chromatic Prose - Zhezhi Banner",
      img: "https://snipboard.io/jQedCO.jpg",
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
      img: "https://snipboard.io/Aybjos.jpg",
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
      name: "Tower of Adversity: Hazard Zone",
      img: "https://snipboard.io/NnA3YO.jpg",
      startDate: "2024-08-19 04:00",
      endDate: "2024-09-01 16:00",
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
      group: EVENT_GROUP.SEVEN_DAY_LOGIN,
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
      name: "Depths of Illusive Realm: Carnival in Slumberland",
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
  banners: rawEvents.banners,
  activities: rawEvents.activities,
};
