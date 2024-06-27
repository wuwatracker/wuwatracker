import { convertDatesToServerTime } from './lib/convertDatesToServerTime';

export interface Event {
  id?: number; // announcement id
  name: string;
  description?: string;
  img: string;
  startDate: string; // use Server time (UTC+8)
  endDate: string; // use Server time (UTC+8)
  color?: string; // defaults to automatically detecting the img color (prefer darker colors)
  url?: string; // link to an informative page about the event
  showOnHome?: boolean; // whether we show it in the home dashboard
  isGlobal?: boolean;
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
    },
    {
      id: 10192,
      name: 'Absolute Pulsation - Yinlin Weapon Banner',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/RhasUibVrDXaewvP.jpg',
      startDate: '2024-06-06 10:00',
      endDate: '2024-06-26 11:59',
      isGlobal: true,
    },
    {
      name: 'Thawborn Renewal - Jinhsi Banner',
      img: 'https://pbs.twimg.com/media/GRDFoUGboAALFAW?format=jpg&name=medium',
      startDate: '2024-06-28 13:00',
      endDate: '2024-07-22 09:59',
      isGlobal: true,
    },
    {
      name: 'Absolute Pulsation - Jinhsi Weapon Banner',
      img: 'https://pbs.twimg.com/media/GRDIoCQaMAA9Ioy?format=jpg&name=medium',
      startDate: '2024-06-28 13:00',
      endDate: '2024-07-22 09:59',
      isGlobal: true,
    },
    {
      // Image Credits to Mero
      name: 'Stellar Plummage - Changli Weapon Banner',
      img: 'https://i.redd.it/1-1-in-game-banners-via-mero-v0-wlbeh9he2f5d1.jpg?width=1280&format=pjpg&auto=webp&s=5ab8d1fffb548d95b3ead4489bcb5eea1084b034',
      startDate: '2024-07-18 13:00',
      endDate: '2024-08-07 11:59',
      color: '#a24c4e',
      isGlobal: true,
    },
    {
      // Image Credits to Mero
      name: 'Absolute Pulsation - Changli Weapon Banner',
      img: 'https://i.redd.it/1-1-in-game-banners-via-mero-v0-wlbeh9he2f5d1.jpg?width=1280&format=pjpg&auto=webp&s=5ab8d1fffb548d95b3ead4489bcb5eea1084b034',
      startDate: '2024-07-18 13:00',
      endDate: '2024-08-07 11:59',
      color: '#a24c4e',
      isGlobal: true,
    },
  ],
  activities: [
    {
      id: 10199,
      name: '"Chord Cleansing" LT Echo Double Drop Event',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/VLUKnFABIwENgpiX.jpg',
      startDate: '2024-06-20 04:00',
      endDate: '2024-06-27 03:59',
    },
    {
      id: 10214,
      name: 'Wuthering Exploration \nLimited-Time Event',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/uMJRhEmCgPNElAxX.jpg',
      startDate: '2024-06-13 10:00',
      endDate: '2024-06-27 03:59',
    },
    {
      id: 10194,
      name: 'Alloy Smelt \nLimited Time Battle Event',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/WSrKcdNwytNiSRAs.jpg',
      startDate: '2024-06-06 10:00',
      endDate: '2024-06-27 03:59',
    },
    {
      id: 10201,
      name: 'Second Coming of Solaris Limited Time Collection Event',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/jpGLPKjxPaIfhrbw.jpg',
      startDate: '2024-06-13 04:00',
      endDate: '2024-06-27 03:59',
    },
    {
      name: 'Tower of Adversity: Hazard Zone',
      img: 'https://raw.githubusercontent.com/antisocial93/WuWa-base/main/hazardzoneicon.jpg',
      startDate: '2024-06-23 11:00',
      endDate: '2024-07-07 10:59',
    },
  ],
};

export const events = {
  banners: convertDatesToServerTime(rawEvents.banners),
  activities: convertDatesToServerTime(rawEvents.activities),
};
