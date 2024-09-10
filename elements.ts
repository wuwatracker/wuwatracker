/* eslint-disable no-unused-vars */
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
    img: "/assets/icons/elements/aero.webp",
    hex: "#34d399",
  },
  Fusion: {
    img: "/assets/icons/elements/fusion.webp",
    hex: "#f87171",
  },
  Spectro: {
    img: "/assets/icons/elements/spectro.webp",
    hex: "#fde68a",
  },
  Havoc: {
    img: "/assets/icons/elements/havoc.webp",
    hex: "#ec4899",
  },
  Electro: {
    img: "/assets/icons/elements/electro.webp",
    hex: "#e879f9",
  },
  Glacio: {
    img: "/assets/icons/elements/glacio.webp",
    hex: "#a5f3fc",
  },
} as ElementMetadata;

export const validElements = Object.keys(elementsMetadata);
