type ElementMetadata = Record<string, { img: string; colorClass: string }>;

export enum ElementsFilterType {
  AERO = "Aero",
  FUSION = "Fusion",
  SPECTRO = "Spectro",
  HAVOC = "Havoc",
  CONDUCTO = "Conducto",
  GLACIO = "Glacio",
}

export const elementsMetadata: ElementMetadata = {
  Aero: {
    img: "/assets/icons/elements/aero.png",
    colorClass: "bg-green-800",
  },
  Fusion: {
    img: "/assets/icons/elements/fusion.png",
    colorClass: "bg-red-800",
  },
  Spectro: {
    img: "/assets/icons/elements/spectro.png",
    colorClass: "bg-yellow-800",
  },
  Havoc: {
    img: "/assets/icons/elements/havoc.png",
    colorClass: "bg-green-800", // Assuming you meant 'bg-green-800' for Havoc
  },
  Conducto: {
    img: "/assets/icons/elements/conducto.png",
    colorClass: "bg-purple-800",
  },
  Glacio: {
    img: "/assets/icons/elements/glacio.png",
    colorClass: "bg-pink-800",
  },
} as ElementMetadata;
