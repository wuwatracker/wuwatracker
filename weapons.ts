type WeaponMetadata = Record<
  string,
  { qualityLevel: number; imgSrc: string; type: string }
>;

export const weaponTypes = {
  Sword: {
    url: "/assets/icons/weapon-types/sword.webp",
  },
  Broadblade: {
    url: "/assets/icons/weapon-types/broadblade.webp",
  },
  Gauntlets: {
    url: "/assets/icons/weapon-types/gauntlets.webp",
  },
  Pistols: {
    url: "/assets/icons/weapon-types/pistols.webp",
  },
  Rectifier: {
    url: "/assets/icons/weapon-types/rectifier.webp",
  },
} as Record<string, { url: string }>;

export const validWeaponTypes = Object.keys(weaponTypes);

export const fiveStarWeaponMetadata = {
  "Verdant Summit": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/verdant-summit.webp",
    type: "Broadblade",
  },
  Stringmaster: {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/stringmaster.webp",
    type: "Rectifier",
  },
  "Ages of Harvest": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/ages-of-harvest.webp",
    type: "Broadblade",
  },
  "Blazing Brilliance": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/blazing-brilliance.webp",
    type: "Sword",
  },
  "Rime-Draped Sprouts": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/rime-draped-sprouts.webp",
    type: "Rectifier",
  },
  "Verity's Handle": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/veritys-handle.webp",
    type: "Gauntlets",
  },
  "Stellar Symphony": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/stellar-symphony.webp",
    type: "Rectifier",
  },
  "Abyss Surges": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/abyss-surges.webp",
    type: "Gauntlets",
  },
  "Cosmic Ripples": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/cosmic-ripples.webp",
    type: "Rectifier",
  },
  "Emerald of Genesis": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/emerald-of-genesis.webp",
    type: "Sword",
  },
  "Lustrous Razor": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/lustrous-razor.webp",
    type: "Broadblade",
  },
  "Static Mist": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/static-mist.webp",
    type: "Pistols",
  },
} as WeaponMetadata;

export const fourStarWeaponMetadata = {
  "Broadblade#41": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/broadblade41.webp",
    type: "Broadblade",
  },
  "Commando of Conviction": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/commando-of-conviction.webp",
    type: "Sword",
  },
  "Dauntless Evernight": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/dauntless-evernight.webp",
    type: "Broadblade",
  },
  Autumntrace: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/autumntrace.webp",
    type: "Broadblade",
  },
  Discord: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/discord.webp",
    type: "Broadblade",
  },
  "Helios Cleaver": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/helios-cleaver.webp",
    type: "Broadblade",
  },
  "Gauntlets#21D": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/gauntlets21d.webp",
    type: "Gauntlets",
  },
  "Amity Accord": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/amity-accord.webp",
    type: "Gauntlets",
  },
  "Hollow Mirage": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/hollow-mirage.webp",
    type: "Gauntlets",
  },
  Marcato: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/marcato.webp",
    type: "Gauntlets",
  },
  Stonard: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/stonard.webp",
    type: "Gauntlets",
  },
  "Pistols#26": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/pistols26.webp",
    type: "Pistols",
  },
  Overture: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/overture.webp",
    type: "Pistols",
  },
  Novaburst: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/novaburst.webp",
    type: "Pistols",
  },
  Cadenza: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/cadenza.webp",
    type: "Pistols",
  },
  Thunderbolt: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/thunderbolt.webp",
    type: "Pistols",
  },
  "Undying Flame": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/undying-flame.webp",
    type: "Pistols",
  },
  Augment: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/augment.webp",
    type: "Rectifier",
  },
  "Comet Flare": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/comet-flare.webp",
    type: "Rectifier",
  },
  "Jinzhou Keeper": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/jinzhou-keeper.webp",
    type: "Rectifier",
  },
  Variation: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/variation.webp",
    type: "Rectifier",
  },
  "Rectifier#25": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/rectifier25.webp",
    type: "Rectifier",
  },
  "Sword#18": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/sword18.webp",
    type: "Sword",
  },
  Lumingloss: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/lumingloss.webp",
    type: "Sword",
  },
  "Lunar Cutter": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/lunar-cutter.webp",
    type: "Sword",
  },
  "Endless Collapse": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/lunar-cutter.webp",
    type: "Sword",
  },
  "Waning Redshift": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/waning-redshift.webp",
    type: "Broadblade",
  },
  "Relativistic Jet": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/relativistic-jet.webp",
    type: "Pistols",
  },
  "Celestial Spiral": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/celestial-spiral.webp",
    type: "Gauntlets",
  },
  "Fusion Accretion": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/fusion-accretion.webp",
    type: "Rectifier",
  },
} as WeaponMetadata;

export const weaponMetadata = {
  ...fiveStarWeaponMetadata,
  ...fourStarWeaponMetadata,
};
