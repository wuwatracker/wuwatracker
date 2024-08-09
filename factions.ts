type Faction = {
  [key: string]: {
    iconSrc: string;
  };
};

export const factions: Faction = {
  Jinzhou: {
    iconSrc: "/assets/factions/jinzhou.webp",
  },
  "The Black Shores": {
    iconSrc: "/assets/factions/the-black-shores.webp",
  },
};

export const validFactions = Object.keys(factions);

export const getFactionIconSrcByName = (faction: string) => {
  const FALLBACK_ICON = "/assets/factions/ghost-hounds.webp";
  if (!validFactions.includes(faction)) {
    return FALLBACK_ICON;
  } else {
    return factions[faction].iconSrc;
  }
};
