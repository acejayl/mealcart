import { describe, it, expect } from 'vitest';
import { isEligible, passesDiet, hasExcludedAllergen, eligibleFor, eligibleCounts } from '../src/domain/eligibility';
import { INGREDIENTS_BY_ID, PROFILES, RECIPES, RECIPES_BY_ID } from '../src/data';
import { defaultPrefs } from './helpers';

const conv = PROFILES.conventional;

describe('eligibility', () => {
  it('never allows a recipe containing an excluded allergen', () => {
    const prefs = defaultPrefs({ excludedAllergens: ['shellfish'] });
    const shrimp = RECIPES_BY_ID['shrimp-tacos'];
    expect(hasExcludedAllergen(shrimp, ['shellfish'], INGREDIENTS_BY_ID)).toBe(true);
    expect(isEligible(shrimp, prefs, conv, INGREDIENTS_BY_ID)).toBe(false);
    for (const r of eligibleFor('dinner', RECIPES, prefs, conv, INGREDIENTS_BY_ID)) {
      expect(r.ingredients.some((ri) => INGREDIENTS_BY_ID[ri.ingredientId].allergens.includes('shellfish'))).toBe(false);
    }
  });
  it('applies diet rules', () => {
    expect(passesDiet(RECIPES_BY_ID['chickpea-coconut-curry'], 'vegan', INGREDIENTS_BY_ID)).toBe(true);
    expect(passesDiet(RECIPES_BY_ID['granola-parfait'], 'vegan', INGREDIENTS_BY_ID)).toBe(false); // honey + yogurt
    expect(passesDiet(RECIPES_BY_ID['granola-parfait'], 'vegetarian', INGREDIENTS_BY_ID)).toBe(true);
    expect(passesDiet(RECIPES_BY_ID['salmon-asparagus-rice'], 'pescatarian', INGREDIENTS_BY_ID)).toBe(true);
    expect(passesDiet(RECIPES_BY_ID['salmon-asparagus-rice'], 'vegetarian', INGREDIENTS_BY_ID)).toBe(false);
    expect(passesDiet(RECIPES_BY_ID['beef-tacos'], 'pescatarian', INGREDIENTS_BY_ID)).toBe(false);
  });
  it('requires all recipe appliances to be owned', () => {
    const noOven = defaultPrefs({ appliances: ['stovetop'] });
    expect(isEligible(RECIPES_BY_ID['sheet-pan-chicken-potatoes'], noOven, conv, INGREDIENTS_BY_ID)).toBe(false);
    expect(isEligible(RECIPES_BY_ID['chicken-stir-fry'], noOven, conv, INGREDIENTS_BY_ID)).toBe(true);
    expect(isEligible(RECIPES_BY_ID['overnight-oats-berries'], defaultPrefs({ appliances: [] }), conv, INGREDIENTS_BY_ID)).toBe(true);
  });
  it('requires non-staple ingredients to be available at the store', () => {
    const prefs = defaultPrefs({ storeId: 'trader-joes' });
    expect(isEligible(RECIPES_BY_ID['chicken-caesar-salad'], prefs, PROFILES.traderJoes, INGREDIENTS_BY_ID)).toBe(false); // rotisserie
    expect(isEligible(RECIPES_BY_ID['tj-gnocchi-pesto'], prefs, PROFILES.traderJoes, INGREDIENTS_BY_ID)).toBe(true);
    expect(isEligible(RECIPES_BY_ID['tj-gnocchi-pesto'], prefs, conv, INGREDIENTS_BY_ID)).toBe(false);
  });
  it('ignores availability for ingredients marked as staples', () => {
    const prefs = defaultPrefs({ stapleIds: ['rotisserie-chicken', ...defaultPrefs().stapleIds] });
    expect(isEligible(RECIPES_BY_ID['chicken-caesar-salad'], prefs, PROFILES.traderJoes, INGREDIENTS_BY_ID)).toBe(true);
  });
  it('counts eligible recipes per meal type', () => {
    const counts = eligibleCounts(RECIPES, defaultPrefs(), conv, INGREDIENTS_BY_ID);
    expect(counts.breakfast).toBeGreaterThanOrEqual(20);
    expect(counts.lunch).toBeGreaterThanOrEqual(25);
    expect(counts.dinner).toBeGreaterThanOrEqual(30);
  });
});
