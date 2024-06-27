type WeaponMetadata = Record<
  string,
  { qualityLevel: number; imgSrc: string; type: string }
>;

export const weaponTypes = {
  Sword: {
    url: "/assets/weapon-types/sword.webp",
  },
  Broadblade: {
    url: "/assets/weapon-types/broadblade.webp",
  },
  Gauntlet: {
    url: "/assets/weapon-types/gauntlet.webp",
  },
  Gun: {
    url: "/assets/weapon-types/pistols.webp",
  },
  Rectifiers: {
    url: "/assets/weapon-types/rectifier.webp",
  },
} as Record<string, { url: string }>;

export const fiveStarWeaponMetadata = {
  "Verdant Summit": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/verdant_summit.webp",
    type: "Broadblade",
  },
  Stringmaster: {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/stringmaster.webp",
    type: "Rectifiers",
  },
  "Ages of Harvest": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/ages_of_harvest.webp",
    type: "Broadblade",
  },
  "Blazing Brilliance": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/blazing_brilliance.webp",
    type: "Sword",
  },
  "Abyss Surges": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/abyss_surges.webp",
    type: "Gauntlet",
  },
  "Cosmic Ripples": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/cosmic_ripples.webp",
    type: "Rectifiers",
  },
  "Emerald of Genesis": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/emerald_of_genesis.webp",
    type: "Sword",
  },
  "Lustrous Razor": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/lustrous_razor.webp",
    type: "Broadblade",
  },
  "Static Mist": {
    qualityLevel: 5,
    imgSrc: "/assets/weapons/static_mist.webp",
    type: "Gun",
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
    imgSrc: "/assets/weapons/commando_of_conviction.webp",
    type: "Sword",
  },
  "Dauntless Evernight": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/dauntless_evernight.webp",
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
    imgSrc: "/assets/weapons/helios_cleaver.webp",
    type: "Broadblade",
  },
  "Gauntlets#21D": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/gauntlets21d.webp",
    type: "Gauntlet",
  },
  "Amity Accord": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/amity_accord.webp",
    type: "Gauntlet",
  },
  "Hollow Mirage": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/hollow_mirage.webp",
    type: "Gauntlet",
  },
  Marcato: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/marcato.webp",
    type: "Gauntlet",
  },
  Stonard: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/stonard.webp",
    type: "Gauntlet",
  },
  "Pistols#26": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/pistols26.webp",
    type: "Gun",
  },
  Overture: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/overture.webp",
    type: "Gun",
  },
  Novaburst: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/novaburst.webp",
    type: "Gun",
  },
  Cadenza: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/cadenza.webp",
    type: "Gun",
  },
  Thunderbolt: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/thunderbolt.webp",
    type: "Gun",
  },
  "Undying Flame": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/undying_flame.webp",
    type: "Gun",
  },
  Augment: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/augment.webp",
    type: "Rectifiers",
  },
  "Comet Flare": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/comet_flare.webp",
    type: "Rectifiers",
  },
  "Jinzhou Keeper": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/jinzhou_keeper.webp",
    type: "Rectifiers",
  },
  Variation: {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/variation.webp",
    type: "Rectifiers",
  },
  "Rectifier#25": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/rectifier25.webp",
    type: "Rectifiers",
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
    imgSrc: "/assets/weapons/lunar_cutter.webp",
    type: "Sword",
  },
  "Scale: Slasher": {
    qualityLevel: 4,
    imgSrc: "/assets/weapons/scale_slasher.webp",
    type: "Sword",
  },
} as WeaponMetadata;

export const weaponMetadata = {
  ...fiveStarWeaponMetadata,
  ...fourStarWeaponMetadata,
};
