import { Consume } from "@/features/inventory/types/Consume";

export type ItemRecipe = {
  id: number;
  consume: Consume[];
};

const FORGERY_PARENT_IDS = [43020014, 43020024, 43020034, 43020044, 43020054];
const MOB_PARENT_IDS = [41100014, 41100024, 41100034, 41200034];

const PARENT_IDS: number[] = [...MOB_PARENT_IDS, ...FORGERY_PARENT_IDS];

export const itemRecipes: ItemRecipe[] = PARENT_IDS.flatMap((parentId) =>
  generateRecipes(parentId, 3),
);

/**
 * Recursively generates a sequence of item recipes starting from a tier 5 parent item
 * and continues until the recipe for a tier `(5 - levels)` item is reached.
 *
 * Each item at tier `n` consumes 3 of the item from tier `n-1`, following a sequential ID pattern.
 *
 * For example, if the starting ID represents a tier 5 item (e.g., ID 105), it will generate recipes
 * for items down to tier 5 - levels (e.g., 104, 103, etc.) until the number of levels is exhausted.
 *
 * Assumptions:
 * - The IDs are ordered sequentially. For example, an item with ID `105` at tier 5 consumes an item with ID `104` (tier 4),
 *   and the pattern continues.
 * - The `consume` value is fixed at `3` for all recipes.
 *
 * @param id - The ID of the tier 5 parent item (the highest tier in the sequence).
 * @param levels - The number of levels to generate recipes for. The function will stop at the `5 - levels` tier item.
 *                 If `levels` is 0, no recipes are generated.
 * @returns An array of `ItemRecipe` objects representing the recipes for each tier down to `5 - levels`.
 *
 * Example:
 * Calling `generateRecipes(105, 3)` will generate the following recipes:
 *   - { id: 105, consume: [{ id: 104, value: 3 }] }
 *   - { id: 104, consume: [{ id: 103, value: 3 }] }
 *   - { id: 103, consume: [{ id: 102, value: 3 }] }
 */
function generateRecipes(id: number, levels: number): ItemRecipe[] {
  if (levels === 0) return [];

  return [
    {
      id: id,
      consume: [
        {
          id: id - 1, // always decrements the id by 1 for the prerequisite items
          value: 3, // always consumes 3
        },
      ],
    },
    ...generateRecipes(id - 1, levels - 1),
  ];
}

export function getItemRecipe(id: number): ItemRecipe | null {
  const recipe = itemRecipes.find((recipe) => recipe.id === id);
  return recipe || null; // Return null if no recipe is found
}
