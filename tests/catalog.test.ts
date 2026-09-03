import { describe, it, expect } from 'vitest';
import { INGREDIENTS, INGREDIENTS_BY_ID } from '../src/data/ingredients';
import { DEFAULT_STAPLE_IDS } from '../src/data/staples';
import { CATEGORIES } from '../src/domain/types';

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
