import { describe, it, expect } from 'vitest';
import { buildShoppingList, recipeCostPerServing } from '../src/domain/shoppingList';
import { INGREDIENTS_BY_ID, PROFILES, RECIPES_BY_ID } from '../src/data';
import { defaultPrefs } from './helpers';
import type { PlanSlot } from '../src/domain/types';

const conv = PROFILES.conventional;
const base = { profile: conv, recipesById: RECIPES_BY_ID, ingredientsById: INGREDIENTS_BY_ID, priceOverrides: {}, checked: {} };

describe('buildShoppingList', () => {
  it('scales, aggregates across recipes, and rounds up to whole packs', () => {
    const slots: PlanSlot[] = [
      { day: 0, meal: 'dinner', recipeId: 'chicken-stir-fry' },   // chicken-breast 600 for 4
      { day: 1, meal: 'dinner', recipeId: 'baked-chicken-parm' }, // chicken-breast 600 for 4
    ];
    const list = buildShoppingList({ ...base, slots, prefs: defaultPrefs({ householdSize: 2 }) });
    const chicken = list.items.find((i) => i.ingredientId === 'chicken-breast')!;
    expect(chicken.neededQty).toBeCloseTo(600, 5); // 300 + 300
    expect(chicken.packs).toBe(Math.ceil(600 / chicken.product.packSize));
    expect(chicken.cost).toBeCloseTo(chicken.packs * chicken.product.price, 2);
    expect(list.total).toBeCloseTo(list.items.reduce((s, i) => s + i.cost, 0), 2);
  });
  it('removes staples from the list but reports them', () => {
    const slots: PlanSlot[] = [{ day: 0, meal: 'dinner', recipeId: 'chicken-stir-fry' }];
    const list = buildShoppingList({ ...base, slots, prefs: defaultPrefs() });
    expect(list.items.find((i) => i.ingredientId === 'soy-sauce')).toBeUndefined();
    expect(list.staples.find((s) => s.ingredientId === 'soy-sauce')).toBeDefined();
  });
  it('applies price overrides', () => {
    const slots: PlanSlot[] = [{ day: 0, meal: 'dinner', recipeId: 'chicken-stir-fry' }];
    const list = buildShoppingList({ ...base, slots, prefs: defaultPrefs(), priceOverrides: { 'chicken-breast': 1 } });
    const chicken = list.items.find((i) => i.ingredientId === 'chicken-breast')!;
    expect(chicken.unitPrice).toBe(1);
    expect(chicken.cost).toBe(chicken.packs);
  });
  it('orders groups by the store aisle order and reports in-cart total', () => {
    const slots: PlanSlot[] = [
      { day: 0, meal: 'dinner', recipeId: 'chicken-stir-fry' },
      { day: 0, meal: 'breakfast', recipeId: 'granola-parfait' },
    ];
    const list = buildShoppingList({ ...base, slots, prefs: defaultPrefs(), checked: { 'chicken-breast': true } });
    const order = conv.aisleOrder;
    const idx = list.groups.map((g) => order.indexOf(g.category));
    expect(idx).toEqual([...idx].sort((a, b) => a - b));
    const chicken = list.items.find((i) => i.ingredientId === 'chicken-breast')!;
    expect(chicken.checked).toBe(true);
    expect(list.inCart).toBeCloseTo(chicken.cost, 2);
  });
  it('ignores slots whose meal type is no longer planned', () => {
    // A kept plan still holds breakfast/lunch slots after the user narrowed mealsToPlan to
    // dinner. Those meals are hidden on the Plan screen, so they must not reach the list.
    const slots: PlanSlot[] = [
      { day: 0, meal: 'dinner', recipeId: 'chicken-stir-fry' },
      { day: 0, meal: 'breakfast', recipeId: 'granola-parfait' },
    ];
    const both = buildShoppingList({ ...base, slots, prefs: defaultPrefs() });
    const dinnerOnly = buildShoppingList({ ...base, slots, prefs: defaultPrefs({ mealsToPlan: ['dinner'] }) });
    expect(both.items.find((i) => i.ingredientId === 'granola')).toBeDefined();
    expect(dinnerOnly.items.find((i) => i.ingredientId === 'granola')).toBeUndefined();
    expect(dinnerOnly.total).toBeLessThan(both.total);

    const dinnerAlone = buildShoppingList({ ...base, slots: [slots[0]], prefs: defaultPrefs({ mealsToPlan: ['dinner'] }) });
    expect(dinnerOnly.total).toBeCloseTo(dinnerAlone.total, 2);
  });
  it('skips null slots', () => {
    const list = buildShoppingList({ ...base, slots: [{ day: 0, meal: 'dinner', recipeId: null }], prefs: defaultPrefs() });
    expect(list.items).toEqual([]);
    expect(list.total).toBe(0);
  });
});

describe('recipeCostPerServing', () => {
  it('is proportional ingredient cost excluding staples', () => {
    const r = RECIPES_BY_ID['chicken-stir-fry'];
    const cost = recipeCostPerServing(r, conv, {}, defaultPrefs().stapleIds, INGREDIENTS_BY_ID);
    expect(cost).toBeGreaterThan(0);
    const withEverythingStaple = recipeCostPerServing(r, conv, {}, r.ingredients.map((i) => i.ingredientId), INGREDIENTS_BY_ID);
    expect(withEverythingStaple).toBe(0);
  });
});
