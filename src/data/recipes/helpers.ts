import type { Appliance, MealType, ProteinGroup, Recipe } from '../../domain/types';

type Ing = [id: string, qty: number, note?: string];

export function r(
  id: string, name: string, emoji: string, mealType: MealType,
  o: {
    servings: number; prep: number; cook: number; protein: ProteinGroup;
    appliances: Appliance[]; tags?: string[]; ingredients: Ing[]; steps: string[];
  },
): Recipe {
  return {
    id, name, emoji, mealType,
    servings: o.servings, prepMinutes: o.prep, cookMinutes: o.cook,
    ingredients: o.ingredients.map(([ingredientId, qty, note]) =>
      note ? { ingredientId, qty, note } : { ingredientId, qty }),
    steps: o.steps, appliances: o.appliances, tags: o.tags ?? [], proteinGroup: o.protein,
  };
}
