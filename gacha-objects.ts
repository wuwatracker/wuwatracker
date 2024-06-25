import {
  fiveStarResonatorMetadata,
  fourStarResonatorMetadata,
} from './resonators';
import { fiveStarWeaponMetadata, fourStarWeaponMetadata } from './weapons';

export const fiveStarObjects = {
  ...fiveStarResonatorMetadata,
  ...fiveStarWeaponMetadata,
};

export const fourStarObjects = {
  ...fourStarResonatorMetadata,
  ...fourStarWeaponMetadata,
};

export const resonatorMetadata = {
  ...fiveStarResonatorMetadata,
  ...fourStarResonatorMetadata,
};

export const weaponObjects = {
  ...fiveStarWeaponMetadata,
  ...fourStarWeaponMetadata,
};
