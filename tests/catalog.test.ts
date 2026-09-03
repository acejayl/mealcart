import { describe, it, expect } from 'vitest';
import { INGREDIENTS, INGREDIENTS_BY_ID, INGREDIENT_IDS } from '../src/data/ingredients';
import { DEFAULT_STAPLE_IDS } from '../src/data/staples';
import { CATEGORIES, STORE_PROFILE_IDS } from '../src/domain/types';
import { STORES, AISLE_ORDERS } from '../src/data/stores';
import { PROFILES } from '../src/data/products';
import { RECIPES } from '../src/data/recipes';

describe('ingredients', () => {
  it('has unique ids and at least 140 entries', () => {
    const ids = INGREDIENTS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThanOrEqual(140);
  });
  it('uses valid categories and positive-or-zero nutrition', () => {
    for (const i of INGREDIENTS) {
      expect(CATEGORIES).toContain(i.category);
      expect(i.nutrition.kcal).toBeGreaterThanOrEqual(0);
      expect(i.nutrition.proteinG).toBeGreaterThanOrEqual(0);
      expect(i.nutrition.carbsG).toBeGreaterThanOrEqual(0);
      expect(i.nutrition.fatG).toBeGreaterThanOrEqual(0);
    }
  });
  it('vegan implies vegetarian', () => {
    for (const i of INGREDIENTS) if (i.vegan) expect(i.vegetarian).toBe(true);
  });
  it('default staples all exist and match defaultStaple flags', () => {
    for (const id of DEFAULT_STAPLE_IDS) expect(INGREDIENTS_BY_ID[id]?.defaultStaple).toBe(true);
    const flagged = INGREDIENTS.filter((i) => i.defaultStaple).map((i) => i.id);
    expect(new Set(flagged)).toEqual(new Set(DEFAULT_STAPLE_IDS));
  });
});

describe('stores', () => {
  it('lists the seven stores mapped to four profiles', () => {
    expect(STORES.map((s) => s.name).sort()).toEqual(
      ['Costco', 'Fred Meyer', 'PCC', 'QFC', 'Safeway', "Trader Joe's", 'Whole Foods'],
    );
    for (const s of STORES) expect(STORE_PROFILE_IDS).toContain(s.profile);
  });
  it('every profile has a full aisle order with no duplicates', () => {
    for (const id of STORE_PROFILE_IDS) {
      const order = AISLE_ORDERS[id];
      expect(new Set(order).size).toBe(order.length);
      expect(new Set(order)).toEqual(new Set(CATEGORIES));
      expect(PROFILES[id].aisleOrder).toEqual(order);
    }
  });
});

describe('recipes', () => {
  it('has unique ids and the expected counts', () => {
    const ids = RECIPES.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    const count = (m: string) => RECIPES.filter((x) => x.mealType === m).length;
    expect(count('breakfast')).toBeGreaterThanOrEqual(24);
    expect(count('lunch')).toBeGreaterThanOrEqual(30);
    expect(count('dinner')).toBeGreaterThanOrEqual(36);
  });
  it('references only known ingredients with positive quantities', () => {
    for (const x of RECIPES) {
      expect(x.ingredients.length).toBeGreaterThan(0);
      for (const ri of x.ingredients) {
        expect(INGREDIENTS_BY_ID[ri.ingredientId], `${x.id} -> ${ri.ingredientId}`).toBeDefined();
        expect(ri.qty).toBeGreaterThan(0);
      }
    }
  });
  it('has steps, servings, times and an emoji', () => {
    for (const x of RECIPES) {
      expect(x.steps.length).toBeGreaterThanOrEqual(3);
      expect(x.servings).toBeGreaterThan(0);
      expect(x.prepMinutes + x.cookMinutes).toBeGreaterThanOrEqual(0);
      expect(x.emoji.length).toBeGreaterThan(0);
    }
  });
});

describe('products', () => {
  for (const id of STORE_PROFILE_IDS) {
    it(`${id}: exactly one product per ingredient`, () => {
      const products = Object.values(PROFILES[id].products);
      expect(products.map((x) => x.ingredientId).sort()).toEqual([...INGREDIENT_IDS].sort());
    });
    it(`${id}: available products have size, price and a source`, () => {
      for (const x of Object.values(PROFILES[id].products)) {
        if (!x.available) continue;
        expect(x.packSize).toBeGreaterThan(0);
        expect(x.price).toBeGreaterThan(0);
        expect(x.priceSource.length).toBeGreaterThan(10);
        expect(x.packLabel.length).toBeGreaterThan(0);
        if (!x.estimated) expect(x.priceSource).toMatch(/^https?:\/\//);
      }
    });
    it(`${id}: at most 15% of products are estimated`, () => {
      const avail = Object.values(PROFILES[id].products).filter((x) => x.available);
      const est = avail.filter((x) => x.estimated).length;
      expect(est / avail.length).toBeLessThanOrEqual(0.15);
    });
  }
});
