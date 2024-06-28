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
}

/**
 * Edit the values here.
 *
 * Make sure the `startDate` and `endDate` values are the game server's time (UTC+8) which are the SEA, Asia, HK server times.
 */
const rawEvents: { banners: Event[]; activities: Event[] } = {
  banners: [
    {
      id: 10191,
      name: 'When Thunder Pours - Yinlin Banner',
      description:
        'During the event, boosted drop rates for 5-star Resonator [Yinlin], 4-star Resonators [Taoqi], [Aalto], and [Yuanwu]!',
      url: 'https://wutheringwaves.gg/when-thunder-pours-featured-resonator-convene-boosted-drop-rate-for-yinlin/',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/XUvRpLaygBSPNnoM.jpg',
      startDate: '2024-06-06 10:00',
      endDate: '2024-06-26 11:59',
      isGlobal: true,
      reliability: 'Official',
    },
    {
      id: 10192,
      name: 'Absolute Pulsation - Yinlin Weapon Banner',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/RhasUibVrDXaewvP.jpg',
      startDate: '2024-06-06 10:00',
      endDate: '2024-06-26 11:59',
      isGlobal: true,
      reliability: 'Official',
    },
    {
      name: 'Thawborn Renewal - Jinhsi Banner',
      img: 'https://raw.githubusercontent.com/antisocial93/WuWa-base/main/jinhsiConvene.jpg',
      startDate: '2024-06-28 13:00',
      endDate: '2024-07-22 09:59',
      isGlobal: true,
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
    {
      name: 'Absolute Pulsation - Jinhsi Weapon Banner',
      img: 'https://raw.githubusercontent.com/antisocial93/WuWa-base/main/agesofharvestConvene.jpg',
      startDate: '2024-06-28 13:00',
      endDate: '2024-07-22 09:59',
      isGlobal: true,
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
    {
      name: 'Stellar Plummage - Changli Banner',
      img: 'https://snipboard.io/VlJ2EM.jpg',
      startDate: '2024-07-22 13:00',
      endDate: '2024-08-14 11:59',
      color: '#88302d',
      isGlobal: true,
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
    {
      name: 'Absolute Pulsation - Changli Weapon Banner',
      img: 'https://snipboard.io/tsbezS.jpg',
      startDate: '2024-07-22 13:00',
      endDate: '2024-08-14 11:59',
      color: '#ee8548',
      isGlobal: true,
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
  ],
  activities: [
    {
      name: 'Limited Time Check-in Event',
      img: 'https://snipboard.io/cPrHtu.jpg',
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
      startDate: '2024-06-28 13:00',
      endDate: '2024-08-13 03:59',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
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
      img: 'https://snipboard.io/ZU4bEz.jpg',
      color: '#9a4431',
      description: `The New Season "Dreams Ablaze in Darkness" opens! New mechanics such as Tokens, Symphony Rank, and different Memetic Tuning are available for you to create your own powerful build. Main rewards are; 1000x Astrite, 1x Malleable Elite Class Echo I, 1x Malleable Elite Class Echo II, Premium Tuners, Crystal Solvents.`,
      startDate: '2024-07-04 10:00',
      endDate: '2024-08-05 03:59',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
    },
    {
      name: 'Tactial Simulacra: Limited-time Battle Challenge',
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
      startDate: '2024-07-11 04:00',
      endDate: '2024-07-18 03:59',
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/975',
      reliability: 'Official',
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
    },
    {
      id: 10199,
      name: '"Chord Cleansing" LT Echo Double Drop Event',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/VLUKnFABIwENgpiX.jpg',
      startDate: '2024-06-20 04:00',
      endDate: '2024-06-27 03:59',
      reliability: 'Official',
    },
    {
      id: 10214,
      name: 'Wuthering Exploration \nLimited-Time Event',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/uMJRhEmCgPNElAxX.jpg',
      startDate: '2024-06-13 10:00',
      endDate: '2024-06-27 03:59',
      reliability: 'Official',
    },
    {
      id: 10194,
      name: 'Alloy Smelt \nLimited Time Battle Event',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/WSrKcdNwytNiSRAs.jpg',
      startDate: '2024-06-06 10:00',
      endDate: '2024-06-27 03:59',
      reliability: 'Official',
    },
    {
      id: 10201,
      name: 'Second Coming of Solaris Limited Time Collection Event',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/jpGLPKjxPaIfhrbw.jpg',
      startDate: '2024-06-13 04:00',
      endDate: '2024-06-27 03:59',
      reliability: 'Official',
    },
    {
      name: 'Tower of Adversity: Hazard Zone',
      img: 'https://raw.githubusercontent.com/antisocial93/WuWa-base/main/hazardzoneicon.jpg',
      startDate: '2024-06-23 11:00',
      endDate: '2024-07-07 10:59',
      reliability: 'Official',
    },
  ],
};

export const events = {
  banners: convertDatesToServerTime(rawEvents.banners),
  activities: convertDatesToServerTime(rawEvents.activities),
};
