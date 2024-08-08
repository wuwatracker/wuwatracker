type ElementMetadata = Record<string, { img: string; hex: string }>;

export enum ElementsFilterType {
  AERO = "Aero",
  FUSION = "Fusion",
  SPECTRO = "Spectro",
  HAVOC = "Havoc",
  ELECTRO = "Electro",
  GLACIO = "Glacio",
}

export const elementsMetadata: ElementMetadata = {
  Aero: {
    img: "/assets/icons/elements/aero.png",
    hex: "#34d399",
  },
  Fusion: {
    img: "/assets/icons/elements/fusion.png",
    hex: "#f87171",
  },
  Spectro: {
    img: "/assets/icons/elements/spectro.png",
    hex: "#fde68a",
  },
  Havoc: {
    img: "/assets/icons/elements/havoc.png",
    hex: "#ec4899",
  },
  Electro: {
    img: "/assets/icons/elements/electro.png",
    hex: "#e879f9",
  },
  Glacio: {
    img: "/assets/icons/elements/glacio.png",
    hex: "#a5f3fc",
  },
} as ElementMetadata;
