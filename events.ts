import { convertDatesToServerTime } from './lib/convertDatesToServerTime';

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
  reliability?: 'Leak' | 'Official';
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
      name: 'Thawborn Renewal - Jinhsi Banner',
      img: 'https://snipboard.io/DUVFSa.jpg',
      startDate: '2024-06-28 12:00',
      endDate: '2024-07-22 09:59',
      color: '#5ba099',
      isGlobal: true,
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
      group: 0,
    },
    {
      name: 'Absolute Pulsation - Jinhsi Weapon Banner',
      img: 'https://snipboard.io/Luw9Yy.jpg',
      startDate: '2024-06-28 12:00',
      endDate: '2024-07-22 09:59',
      color: '#a7d8d3',
      isGlobal: true,
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
      group: 1,
    },
    {
      name: 'Stellar Plummage - Changli Banner',
      img: 'https://snipboard.io/1C0Pad.jpg',
      startDate: '2024-07-22 10:00',
      endDate: '2024-08-14 11:59',
      color: '#88302d',
      url: 'https://x.com/Wuthering_Waves/status/1814858069966553374',
      reliability: 'Official',
      group: 0,
    },
    {
      name: 'Absolute Pulsation - Changli Weapon Banner',
      img: 'https://snipboard.io/iv6RHT.jpg',
      startDate: '2024-07-22 10:00',
      endDate: '2024-08-14 11:59',
      color: '#ee8548',
      url: 'https://x.com/Wuthering_Waves/status/1814861986544693558',
      reliability: 'Official',
      group: 1,
    },
  ],
  activities: [
    {
      name: 'Pioneer Podcast',
      img: 'https://snipboard.io/dBPpt2.jpg',
      color: '#e4c190',
      description: `You can complete tasks in Pioneer Podcast and accumulate Podcast EXP. Level up your Podcast to get rich rewards. Unlock "Insider Channel" or "Connoisseur Channel" and level up your Podcast to win extra rewards including Astrite*600, a 4-star Golden Eternal Series Weapon of Choice, and Radiant Tide!`,
      startDate: '2024-06-28 12:00',
      endDate: '2024-08-13 03:59',
      isGlobal: true,
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
      group: EVENT_GROUP.PIONEER_PODCAST,
    },
    {
      name: '[Tales from Mt. Firmament] Area Exploration Event',
      img: 'https://snipboard.io/zWIVdM.jpg',
      color: '#633d35',
      description:
        "Divided into four stages, this event will have separate stages unlocked according to the progress of Main Quests. By completing Exploration & Puzzle-solving, Battle Challenge, Gathering, and other quests available in the Mt. Firmament, you'll be awarded diverse rewards.",
      startDate: '2024-06-28 12:00',
      endDate: '2024-08-13 03:59',
      isGlobal: true,
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
    {
      name: '[Traces of Mt. Firmament] Photo Collection Event',
      img: 'https://snipboard.io/VA7tnJ.jpg',
      color: '#7a4738',
      description:
        'Follow the clues to explore the corresponding area, take the correct photos, or search at the target location. Completing the above tasks will grant rewards.',
      startDate: '2024-06-28 12:00',
      endDate: '2024-08-13 03:59',
      isGlobal: true,
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
    {
      name: 'Limited Time Check-in Event',
      img: 'https://snipboard.io/l6iRhf.jpg',
      description:
        'Log in the game and check in to receive corresponding rewards on respective dates.',
      startDate: '2024-07-04 04:00',
      endDate: '2024-08-13 03:59',
      color: '#af6d69',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
    {
      name: 'Gifts of Celestial Light: 7-day Login Event',
      img: 'https://snipboard.io/ET3clt.jpg',
      description:
        'Log into the game and check in to claim rewards: 5x Radiant Tide & 5x Lustrous Tide',
      color: '#4f493e',
      startDate: '2024-06-28 12:00',
      endDate: '2024-08-13 03:59',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
      isGlobal: true,
    },
    {
      name: 'Lollo Campaign: Limited-time Commission Event',
      img: 'https://snipboard.io/ey1GD8.jpg',
      color: '#8f7f68',
      description: `Complete tasks in [Lollo Campaign] to earn Lollo Stamps. Lollo Stamps can be used in the roulette of "Lollo Helper" to get random rewards.`,
      startDate: '2024-07-25 10:00',
      endDate: '2024-08-08 03:59',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
    {
      name: 'Depths of Illusive Realm: Dreams Ablaze in Darkness',
      img: 'https://snipboard.io/nEcqzG.jpg',
      color: '#9a4431',
      description: `The New Season "Dreams Ablaze in Darkness" opens! New mechanics such as Tokens, Symphony Rank, and different Memetic Tuning are available for you to create your own powerful build. Main rewards are; 1000x Astrite, 1x Malleable Elite Class Echo I, 1x Malleable Elite Class Echo II, Premium Tuners, Crystal Solvents.`,
      startDate: '2024-07-04 10:00',
      endDate: '2024-08-05 03:59',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
      group: EVENT_GROUP.ILLUSIVE_REALM,
    },
    {
      name: 'Tactical Simulacra: Limited-time Battle Challenge',
      img: 'https://snipboard.io/sX1Mva.jpg',
      color: '#89848c',
      description:
        "Enter a special Simulation Challenge where you'll be powered up with special buffs to challenge formiddable enemies. Accumulate points to unlock valuable rewards! Rewards: 500x Astrite, 1x Malleable Elite Class Echo I, 1x Malleable Elite Class Echo II, Premium Tuners.",
      startDate: '2024-07-20 10:00',
      endDate: '2024-08-08 03:59',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
    {
      name: '[Chord Cleansing] Echo Double Drop Event',
      img: 'https://snipboard.io/7lzZ6x.jpg',
      color: '#1d3d50',
      description:
        'Consume Wavesplates to claim double rewards when completing the [Tacet Suppression] challenge.',
      startDate: '2024-08-06 04:00',
      endDate: '2024-08-13 03:59',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
      group: EVENT_GROUP.DOUBLE_DROPS,
    },
    {
      name: '[Bountiful Crescendo] Leveling Material Double Drop Event',
      img: 'https://snipboard.io/Ngs67D.jpg',
      color: '#7a768d',
      description:
        'Consume Wavesplates to claim double rewards when completing [Simulation Challenge] and [Forgery Challenge].',
      startDate: '2024-07-11 04:00',
      endDate: '2024-07-18 03:59',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
      group: EVENT_GROUP.DOUBLE_DROPS,
    },
    {
      name: 'Tower of Adversity: Hazard Zone',
      img: 'https://snipboard.io/NnA3YO.jpg',
      startDate: '2024-07-22 11:00',
      endDate: '2024-08-05 10:59',
      color: '#18235f',
      reliability: 'Official',
      group: EVENT_GROUP.TOWER_OF_ADVERSITY,
    },
  ],
};

export const events = {
  banners: convertDatesToServerTime(rawEvents.banners),
  activities: convertDatesToServerTime(rawEvents.activities),
};
