import { describe, it, expect } from 'vitest';
import { generatePlan, regenerateSlot, planTotal, mulberry32, type PlannerContext } from '../src/domain/planner';
import { INGREDIENTS_BY_ID, PROFILES, RECIPES } from '../src/data';
import { defaultPrefs } from './helpers';
import type { Preferences } from '../src/domain/types';

function ctx(overrides: Partial<Preferences> = {}, history: string[][] = []): PlannerContext {
  const prefs = defaultPrefs(overrides);
  const profileId = prefs.storeId === 'costco' ? 'costco' : prefs.storeId === 'trader-joes' ? 'traderJoes' : 'conventional';
  return { prefs, profile: PROFILES[profileId], recipes: RECIPES, ingredientsById: INGREDIENTS_BY_ID, priceOverrides: {}, history };
}

describe('planner', () => {
  it('fills every planned slot with a distinct recipe', () => {
    const plan = generatePlan(ctx({ weeklyBudget: 1000 }), 1);
    expect(plan.slots).toHaveLength(21);
    const ids = plan.slots.map((s) => s.recipeId);
    expect(ids.every(Boolean)).toBe(true);
    expect(new Set(ids).size).toBe(21);
    for (const s of plan.slots) expect(RECIPES.find((r) => r.id === s.recipeId)!.mealType).toBe(s.meal);
  });
  it('only fills the meal types requested', () => {
    const plan = generatePlan(ctx({ mealsToPlan: ['dinner'] }), 2);
    expect(plan.slots).toHaveLength(7);
    expect(plan.slots.every((s) => s.meal === 'dinner')).toBe(true);
  });
  it('is deterministic for a given seed', () => {
    const a = generatePlan(ctx(), 42).slots;
    const b = generatePlan(ctx(), 42).slots;
    expect(a).toEqual(b);
    const c = generatePlan(ctx(), 43).slots;
    expect(c).not.toEqual(a);
  });
  it('fits under a generous budget and reports zero overage', () => {
    const c = ctx({ weeklyBudget: 400 });
    const plan = generatePlan(c, 3);
    expect(plan.overBudgetBy).toBe(0);
    expect(planTotal(c, plan.slots)).toBeLessThanOrEqual(400);
  });
  it('repairs toward a tight budget and reports overage honestly', () => {
    const loose = generatePlan(ctx({ weeklyBudget: 1000 }), 4);
    const looseTotal = planTotal(ctx(), loose.slots);
    const c = ctx({ weeklyBudget: 40 });
    const tight = generatePlan(c, 4);
    const tightTotal = planTotal(c, tight.slots);
    expect(tightTotal).toBeLessThan(looseTotal);
    expect(tight.overBudgetBy).toBeCloseTo(Math.max(0, tightTotal - 40), 2);
  });
  it('never plans an excluded allergen even under budget pressure', () => {
    const c = ctx({ weeklyBudget: 30, excludedAllergens: ['dairy', 'eggs'] });
    const plan = generatePlan(c, 5);
    for (const s of plan.slots) {
      if (!s.recipeId) continue;
      const r = RECIPES.find((x) => x.id === s.recipeId)!;
      for (const ri of r.ingredients) {
        const a = INGREDIENTS_BY_ID[ri.ingredientId].allergens;
        expect(a.includes('dairy') || a.includes('eggs')).toBe(false);
      }
    }
  });
  it('penalises recipes used in recent weeks', () => {
    const first = generatePlan(ctx({ weeklyBudget: 1000 }), 6);
    const ids = first.slots.map((s) => s.recipeId!) ;
    const second = generatePlan(ctx({ weeklyBudget: 1000 }, [ids]), 6);
    const repeats = second.slots.filter((s) => ids.includes(s.recipeId!)).length;
    expect(repeats).toBeLessThan(7);
  });
  it('regenerates a single slot and leaves the others alone', () => {
    const c = ctx({ weeklyBudget: 1000 });
    const plan = generatePlan(c, 7);
    const next = regenerateSlot(c, plan, 2, 'dinner', 99);
    const before = plan.slots.find((s) => s.day === 2 && s.meal === 'dinner')!;
    const after = next.slots.find((s) => s.day === 2 && s.meal === 'dinner')!;
    expect(after.recipeId).not.toBe(before.recipeId);
    expect(new Set(next.slots.map((s) => s.recipeId)).size).toBe(21);
    for (const s of plan.slots) {
      if (s.day === 2 && s.meal === 'dinner') continue;
      expect(next.slots.find((n) => n.day === s.day && n.meal === s.meal)!.recipeId).toBe(s.recipeId);
    }
  });
  it('mulberry32 returns values in [0,1) and is repeatable', () => {
    const a = mulberry32(9), b = mulberry32(9);
    for (let i = 0; i < 100; i++) { const x = a(); expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThan(1); expect(b()).toBe(x); }
  });
});
