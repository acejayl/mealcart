import type { Allergen, Diet, Ingredient, MealType, Preferences, Recipe, StoreProfile } from './types';
import { MEAL_TYPES } from './types';

type ById = Record<string, Ingredient>;

export function passesDiet(recipe: Recipe, diet: Diet, ingredientsById: ById): boolean {
  if (diet === 'none') return true;
  return recipe.ingredients.every((ri) => {
    const ing = ingredientsById[ri.ingredientId];
    if (!ing) return false;
    if (diet === 'vegan') return ing.vegan;
    if (diet === 'vegetarian') return ing.vegetarian;
    return ing.vegetarian || ing.isFishOrShellfish; // pescatarian
  });
}

export function hasExcludedAllergen(recipe: Recipe, excluded: Allergen[], ingredientsById: ById): boolean {
  if (excluded.length === 0) return false;
  const set = new Set(excluded);
  return recipe.ingredients.some((ri) => {
    const ing = ingredientsById[ri.ingredientId];
    return !ing || ing.allergens.some((a) => set.has(a));
  });
}

export function isEligible(recipe: Recipe, prefs: Preferences, profile: StoreProfile, ingredientsById: ById): boolean {
  if (!passesDiet(recipe, prefs.diet, ingredientsById)) return false;
  if (hasExcludedAllergen(recipe, prefs.excludedAllergens, ingredientsById)) return false;
  const owned = new Set(prefs.appliances);
  if (!recipe.appliances.every((a) => owned.has(a))) return false;
  const staples = new Set(prefs.stapleIds);
  return recipe.ingredients.every((ri) => {
    if (staples.has(ri.ingredientId)) return true;
    const product = profile.products[ri.ingredientId];
    return !!product && product.available;
  });
}

export function eligibleFor(meal: MealType, recipes: Recipe[], prefs: Preferences, profile: StoreProfile, ingredientsById: ById): Recipe[] {
  return recipes.filter((r) => r.mealType === meal && isEligible(r, prefs, profile, ingredientsById));
}

export function eligibleCounts(recipes: Recipe[], prefs: Preferences, profile: StoreProfile, ingredientsById: ById): Record<MealType, number> {
  const out = { breakfast: 0, lunch: 0, dinner: 0 };
  for (const m of MEAL_TYPES) out[m] = eligibleFor(m, recipes, prefs, profile, ingredientsById).length;
  return out;
}
