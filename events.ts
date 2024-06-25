export interface Event {
  id?: number; // announcement id
  name: string;
  description?: string;
  img: string;
  startDate: string;
  endDate: string;
  color?: string; // defaults to automatically detecting the img color (prefer darker colors)
  url?: string; // link to an informative page about the event
  showOnHome?: boolean; // whether we show it in the home dashboard
}

export const events: { banners: Event[]; activities: Event[] } = {
  banners: [
    {
      id: 10191,
      name: '[When Thunder Pours] Featured Resonator Convene',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/XUvRpLaygBSPNnoM.jpg',
      startDate: '2024-06-06 10:00',
      endDate: '2024-06-26 11:59',
    },
    {
      id: 10192,
      name: '[Absolute Pulsation] \nFeatured Weapon Convene',
      img: 'https://aki-gm-resources-back.aki-game.net/notice/image/RhasUibVrDXaewvP.jpg',
      startDate: '2024-06-06 10:00',
      endDate: '2024-06-26 11:59',
    },
    {
      // Credits to Mero
      name: '[Thawborn Renewal] Featured Resonator Convene',
      img: 'https://preview.redd.it/1-1-in-game-banners-via-mero-v0-72wrtbhe2f5d1.jpg?width=640&crop=smart&auto=webp&s=76e2216263a5be3d2871c7f737355136b711107e',
      startDate: '2024-06-27 10:00',
      endDate: '2024-07-17 11:59',
    },
    {
      // Credits to Mero
      name: '[Absolute Pulsation] \nFeatured Weapon Convene',
      img: 'https://preview.redd.it/1-1-in-game-banners-via-mero-v0-72wrtbhe2f5d1.jpg?width=640&crop=smart&auto=webp&s=76e2216263a5be3d2871c7f737355136b711107e',
      startDate: '2024-06-27 10:00',
      endDate: '2024-07-17 11:59',
    },
    {
      // Credits to Mero
      name: '[Stellar Plummage] Featured Resonator Convene',
      img: 'https://i.redd.it/1-1-in-game-banners-via-mero-v0-wlbeh9he2f5d1.jpg?width=1280&format=pjpg&auto=webp&s=5ab8d1fffb548d95b3ead4489bcb5eea1084b034',
      startDate: '2024-07-18 10:00',
      endDate: '2024-08-07 11:59',
    },
    {
      // Credits to Mero
      name: '[Absolute Pulsation] \nFeatured Weapon Convene',
      img: 'https://i.redd.it/1-1-in-game-banners-via-mero-v0-wlbeh9he2f5d1.jpg?width=1280&format=pjpg&auto=webp&s=5ab8d1fffb548d95b3ead4489bcb5eea1084b034',
      startDate: '2024-07-18 10:00',
      endDate: '2024-08-07 11:59',
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
  ],
};
