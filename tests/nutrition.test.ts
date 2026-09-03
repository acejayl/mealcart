import { describe, it, expect } from 'vitest';
import { recipeNutritionPerServing, dayNutrition, addNutrition, recipeMinutes } from '../src/domain/nutrition';
import { INGREDIENTS_BY_ID, RECIPES_BY_ID } from '../src/data';
import type { Recipe } from '../src/domain/types';

const tiny: Recipe = {
  id: 't', name: 't', emoji: 'x', mealType: 'lunch', servings: 2, prepMinutes: 5, cookMinutes: 10,
  ingredients: [{ ingredientId: 'eggs', qty: 4 }, { ingredientId: 'rice-jasmine', qty: 100 }],
  steps: ['a', 'b', 'c'], appliances: [], tags: [], proteinGroup: 'eggs',
};

describe('nutrition', () => {
  it('sums per-100 and per-each values and divides by servings', () => {
    const n = recipeNutritionPerServing(tiny, INGREDIENTS_BY_ID);
    // eggs: 4 * 72 = 288 kcal; rice: 100g -> 360 kcal; total 648 / 2 = 324
    expect(n.kcal).toBe(324);
    expect(n.proteinG).toBe(Math.round((4 * 6.3 + 7) / 2));
  });
  it('adds nutrition', () => {
    expect(addNutrition({ kcal: 1, proteinG: 2, carbsG: 3, fatG: 4 }, { kcal: 10, proteinG: 20, carbsG: 30, fatG: 40 }))
      .toEqual({ kcal: 11, proteinG: 22, carbsG: 33, fatG: 44 });
  });
  it('totals a day across slots and ignores empty slots', () => {
    const slots = [
      { day: 0, meal: 'breakfast' as const, recipeId: 'overnight-oats-berries' },
      { day: 0, meal: 'lunch' as const, recipeId: null },
      { day: 1, meal: 'dinner' as const, recipeId: 'beef-tacos' },
    ];
    const d0 = dayNutrition(0, slots, RECIPES_BY_ID, INGREDIENTS_BY_ID);
    expect(d0).toEqual(recipeNutritionPerServing(RECIPES_BY_ID['overnight-oats-berries'], INGREDIENTS_BY_ID));
  });
  it('reports total minutes', () => {
    expect(recipeMinutes(tiny)).toBe(15);
  });
});
