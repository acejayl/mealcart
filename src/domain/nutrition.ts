import type { Ingredient, Nutrition, PlanSlot, Recipe } from './types';

const ZERO: Nutrition = { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 };

export function addNutrition(a: Nutrition, b: Nutrition): Nutrition {
  return { kcal: a.kcal + b.kcal, proteinG: a.proteinG + b.proteinG, carbsG: a.carbsG + b.carbsG, fatG: a.fatG + b.fatG };
}

export function recipeNutritionPerServing(recipe: Recipe, ingredientsById: Record<string, Ingredient>): Nutrition {
  let t = ZERO;
  for (const ri of recipe.ingredients) {
    const ing = ingredientsById[ri.ingredientId];
    if (!ing) continue;
    const mult = ing.unit === 'each' ? ri.qty : ri.qty / 100;
    t = addNutrition(t, {
      kcal: ing.nutrition.kcal * mult, proteinG: ing.nutrition.proteinG * mult,
      carbsG: ing.nutrition.carbsG * mult, fatG: ing.nutrition.fatG * mult,
    });
  }
  const s = recipe.servings;
  return { kcal: Math.round(t.kcal / s), proteinG: Math.round(t.proteinG / s), carbsG: Math.round(t.carbsG / s), fatG: Math.round(t.fatG / s) };
}

export function dayNutrition(day: number, slots: PlanSlot[], recipesById: Record<string, Recipe>, ingredientsById: Record<string, Ingredient>): Nutrition {
  let t = ZERO;
  for (const s of slots) {
    if (s.day !== day || !s.recipeId) continue;
    const r = recipesById[s.recipeId];
    if (r) t = addNutrition(t, recipeNutritionPerServing(r, ingredientsById));
  }
  return t;
}

export function recipeMinutes(recipe: Recipe): number {
  return recipe.prepMinutes + recipe.cookMinutes;
}
