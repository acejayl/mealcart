import type { Ingredient, PlanSlot, Preferences, Recipe, ShoppingItem, ShoppingListResult, StoreProfile } from './types';
import { round2 } from './types';
import { scaleFactor } from './scaling';

export interface BuildArgs {
  slots: PlanSlot[];
  prefs: Preferences;
  profile: StoreProfile;
  recipesById: Record<string, Recipe>;
  ingredientsById: Record<string, Ingredient>;
  priceOverrides: Record<string, number>;
  checked: Record<string, boolean>;
}

export function buildShoppingList(args: BuildArgs): ShoppingListResult {
  const { slots, prefs, profile, recipesById, ingredientsById, priceOverrides, checked } = args;
  const staple = new Set(prefs.stapleIds);
  const needed = new Map<string, number>();
  for (const slot of slots) {
    if (!slot.recipeId) continue;
    const recipe = recipesById[slot.recipeId];
    if (!recipe) continue;
    const f = scaleFactor(recipe, prefs.householdSize);
    for (const ri of recipe.ingredients) needed.set(ri.ingredientId, (needed.get(ri.ingredientId) ?? 0) + ri.qty * f);
  }

  const items: ShoppingItem[] = [];
  const staples: ShoppingListResult['staples'] = [];
  for (const [ingredientId, qty] of needed) {
    const ingredient = ingredientsById[ingredientId];
    if (!ingredient) continue;
    if (staple.has(ingredientId)) { staples.push({ ingredientId, name: ingredient.name, neededQty: qty }); continue; }
    const product = profile.products[ingredientId];
    if (!product || !product.available) continue;
    const packs = Math.max(1, Math.ceil(qty / product.packSize - 1e-9));
    const unitPrice = priceOverrides[ingredientId] ?? product.price;
    items.push({
      ingredientId, product, neededQty: qty, packs, unitPrice,
      cost: round2(packs * unitPrice), category: ingredient.category, checked: !!checked[ingredientId],
    });
  }

  const order = new Map(profile.aisleOrder.map((c, i) => [c, i] as const));
  items.sort((a, b) =>
    (order.get(a.category) ?? 99) - (order.get(b.category) ?? 99) || a.product.name.localeCompare(b.product.name));

  const groups: ShoppingListResult['groups'] = [];
  for (const it of items) {
    const last = groups[groups.length - 1];
    if (last && last.category === it.category) last.items.push(it);
    else groups.push({ category: it.category, items: [it] });
  }
  staples.sort((a, b) => a.name.localeCompare(b.name));

  const total = round2(items.reduce((s, i) => s + i.cost, 0));
  const inCart = round2(items.filter((i) => i.checked).reduce((s, i) => s + i.cost, 0));
  return { items, groups, total, inCart, staples };
}

/** Theoretical ingredient cost per serving (not pack-rounded), excluding staples. */
export function recipeCostPerServing(
  recipe: Recipe, profile: StoreProfile, priceOverrides: Record<string, number>,
  stapleIds: string[], ingredientsById: Record<string, Ingredient>,
): number {
  const staple = new Set(stapleIds);
  let total = 0;
  for (const ri of recipe.ingredients) {
    if (staple.has(ri.ingredientId) || !ingredientsById[ri.ingredientId]) continue;
    const product = profile.products[ri.ingredientId];
    if (!product || !product.available) continue;
    const unitPrice = priceOverrides[ri.ingredientId] ?? product.price;
    total += (ri.qty / product.packSize) * unitPrice;
  }
  return round2(total / recipe.servings);
}
