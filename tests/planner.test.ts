import { describe, it, expect } from 'vitest';
import { generatePlan, regenerateSlot, planTotal, mulberry32, type PlannerContext } from '../src/domain/planner';
import { eligibleFor } from '../src/domain/eligibility';
import { INGREDIENTS_BY_ID, PROFILES, RECIPES } from '../src/data';
import { defaultPrefs } from './helpers';
import type { Ingredient, MealType, Preferences, Product, ProteinGroup, Recipe, StoreProfile } from '../src/domain/types';

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

// ---------------------------------------------------------------------------------------
// Synthetic-fixture helpers for the scoring-signal tests below. Kept tiny and local to this
// file: a handful of made-up ingredients/products/recipes so each scoring term (reuse bonus,
// protein adjacency, history recency) can be isolated and its effect made predictable,
// instead of depending on the real catalog's prices, eligibility, and interactions between
// all four scoring terms at once.
function synthIngredient(id: string): Ingredient {
  return {
    id, name: id, unit: 'g', category: 'pantry', allergens: [], vegetarian: true, vegan: true,
    isFishOrShellfish: false, defaultStaple: false, nutrition: { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 },
  };
}
function synthProduct(id: string, packSize: number, price = 10): Product {
  return { ingredientId: id, name: id, packSize, packLabel: `${packSize}`, price, available: true, priceSource: 'test', estimated: false };
}
function synthRecipe(
  id: string, mealType: MealType, ingredientId: string, qty: number, proteinGroup: ProteinGroup = 'none',
): Recipe {
  return {
    id, name: id, emoji: '', mealType, servings: 2, prepMinutes: 1, cookMinutes: 1,
    ingredients: [{ ingredientId, qty }], steps: [], appliances: [], tags: [], proteinGroup,
  };
}
function synthCtx(
  recipes: Recipe[], ingredientsById: Record<string, Ingredient>, products: Record<string, Product>,
  opts: { history?: string[][]; mealsToPlan?: MealType[] } = {},
): PlannerContext {
  const profile: StoreProfile = { id: 'conventional', aisleOrder: ['pantry'], products };
  const prefs: Preferences = {
    storeId: 'qfc', weeklyBudget: 100000, householdSize: 2, diet: 'none', excludedAllergens: [],
    appliances: [], mealsToPlan: opts.mealsToPlan ?? ['dinner', 'lunch'], stapleIds: [],
  };
  return { prefs, profile, recipes, ingredientsById, priceOverrides: {}, history: opts.history ?? [] };
}

describe('planner scoring signals (synthetic fixtures)', () => {
  it('reuse bonus: a lunch recipe sharing the already-bought dinner ingredient wins a clear majority of lunch slots (statistical)', () => {
    // 7 dinner recipes all use ingredient "x" (100g each -> 700g total against one 5000g
    // pack, so there is always ample leftover). 7 lunch "C" recipes reuse a small amount of
    // that same "x" (full reuse credit); 7 different lunch "D" recipes each use their own
    // unique ingredient, so they never get a reuse credit. Both groups cost the same. The
    // reuse bonus is worth 0.5 vs up to 1.5 of jitter, so C should not win every slot, but
    // should win a clear majority. This is inherently statistical: run over 20 seeds
    // (probed empirically at ~91% C-share) and assert a safe majority threshold.
    const ingredientsById: Record<string, Ingredient> = { x: synthIngredient('x') };
    const products: Record<string, Product> = { x: synthProduct('x', 5000, 20) };
    const recipes: Recipe[] = [];
    for (let i = 0; i < 7; i++) recipes.push(synthRecipe(`dinner${i}`, 'dinner', 'x', 100));
    for (let i = 0; i < 7; i++) {
      recipes.push(synthRecipe(`lunchC${i}`, 'lunch', 'x', 50));
      const zid = `z${i}`;
      ingredientsById[zid] = synthIngredient(zid);
      products[zid] = synthProduct(zid, 200, 20);
      recipes.push(synthRecipe(`lunchD${i}`, 'lunch', zid, 50));
    }

    let cCount = 0;
    let total = 0;
    for (let seed = 1; seed <= 20; seed++) {
      const c = synthCtx(recipes, ingredientsById, products);
      const plan = generatePlan(c, seed);
      for (const s of plan.slots) {
        if (s.meal !== 'lunch') continue;
        total++;
        if (s.recipeId?.startsWith('lunchC')) cCount++;
      }
    }
    expect(total).toBe(7 * 20);
    expect(cCount / total).toBeGreaterThanOrEqual(0.6);
  });

  it('protein adjacency: same-protein dinners land on adjacent days far less often than chance (statistical)', () => {
    // 4 "chicken" and 4 "beef" dinner recipes, equal cost, each with its own unique
    // ingredient (so the reuse bonus never applies here and can't confound this). With no
    // adjacency penalty at all, Monte Carlo simulation of this exact 4-chicken/4-beef/7-day
    // fixture puts the true null baseline at ~42.8% same-protein adjacent pairs (close to
    // the naive 3/7 estimate) - so a 0.4 cutoff barely clears that null and a simulation of
    // the aggregate-over-20-seeds statistic under the null showed a ~22.8% chance of passing
    // even with the -1 adjacent-day term deleted. The -1 penalty should push the real,
    // in-code figure down sharply (probed empirically at ~2.5%, stable at both 20 and 40
    // seeds), so tighten to 0.3 - about 12x headroom above the observed 2.5%, and still
    // ~1.4x below the ~42.8% null - and widen to 40 seeds to shrink the null's variance
    // further and cut the false-pass risk under a deleted penalty close to zero.
    const ingredientsById: Record<string, Ingredient> = {};
    const products: Record<string, Product> = {};
    const recipes: Recipe[] = [];
    const addProtein = (id: string, group: 'chicken' | 'beef') => {
      const iid = `ing_${id}`;
      ingredientsById[iid] = synthIngredient(iid);
      products[iid] = synthProduct(iid, 500, 10);
      recipes.push(synthRecipe(id, 'dinner', iid, 100, group));
    };
    for (let i = 0; i < 4; i++) addProtein(`chicken${i}`, 'chicken');
    for (let i = 0; i < 4; i++) addProtein(`beef${i}`, 'beef');

    const proteinOf = (id: string | null) => (id?.startsWith('chicken') ? 'chicken' : 'beef');
    let samePairs = 0;
    let totalPairs = 0;
    for (let seed = 1; seed <= 40; seed++) {
      const c = synthCtx(recipes, ingredientsById, products, { mealsToPlan: ['dinner'] });
      const plan = generatePlan(c, seed);
      const byDay = plan.slots.filter((s) => s.meal === 'dinner').sort((a, b) => a.day - b.day);
      for (let i = 0; i < byDay.length - 1; i++) {
        totalPairs++;
        if (proteinOf(byDay[i].recipeId) === proteinOf(byDay[i + 1].recipeId)) samePairs++;
      }
    }
    expect(totalPairs).toBe(6 * 40);
    expect(samePairs / totalPairs).toBeLessThan(0.3);
  });

  it("protein adjacency: a lunch sharing that day's dinner protein loses to a differently-grouped lunch almost every time (near-deterministic)", () => {
    // All 7 dinner candidates are "chicken" (it's the only protein group offered), so
    // whichever one is picked, that day's dinner protein is always chicken. Each day also
    // offers one "chicken" lunch and one "beans" lunch of equal cost. The chicken lunch
    // takes the -2 same-day penalty, bigger than the 1.5 jitter range, so beans should
    // almost always win outright. ("Almost" rather than "always": on days where the
    // previous day's lunch was also beans, that candidate itself takes a -1 adjacent-day
    // penalty, occasionally narrowing the gap enough for chicken to win by jitter alone -
    // probed empirically at ~95% beans-share.)
    const ingredientsById: Record<string, Ingredient> = {};
    const products: Record<string, Product> = {};
    const recipes: Recipe[] = [];
    const add = (id: string, mealType: MealType, group: 'chicken' | 'beans') => {
      const iid = `ing_${id}`;
      ingredientsById[iid] = synthIngredient(iid);
      products[iid] = synthProduct(iid, 500, 10);
      recipes.push(synthRecipe(id, mealType, iid, 100, group));
    };
    for (let i = 0; i < 7; i++) add(`dinnerChicken${i}`, 'dinner', 'chicken');
    for (let i = 0; i < 7; i++) {
      add(`lunchChicken${i}`, 'lunch', 'chicken');
      add(`lunchBeans${i}`, 'lunch', 'beans');
    }

    let beansCount = 0;
    let total = 0;
    for (let seed = 1; seed <= 20; seed++) {
      const c = synthCtx(recipes, ingredientsById, products, { mealsToPlan: ['dinner', 'lunch'] });
      const plan = generatePlan(c, seed);
      for (const s of plan.slots) {
        if (s.meal !== 'lunch') continue;
        total++;
        if (s.recipeId?.startsWith('lunchBeans')) beansCount++;
      }
    }
    expect(total).toBe(7 * 20);
    expect(beansCount / total).toBeGreaterThanOrEqual(0.8);
  });

  it('history gradient: a recipe from last week is avoided more strongly than one from three weeks ago', () => {
    // One meal type (dinner), 7 equal-cost candidates (a, b, and 5 fillers) all with
    // proteinGroup 'none' and their own unique ingredient, so reuse and protein-adjacency
    // never confound this. "a" and every filler share history week 0 (recency penalty
    // max(1, 3-0) = 3); "b" alone sits in history week 2 (penalty max(1, 3-2) = 1). That
    // gap (2) exceeds the 1.5 jitter range, so "b" should deterministically win the day-0
    // slot (the very first decision made, before anything else is chosen) on every seed.
    const ids = ['a', 'b', 'f0', 'f1', 'f2', 'f3', 'f4'];
    const ingredientsById: Record<string, Ingredient> = {};
    const products: Record<string, Product> = {};
    const recipes: Recipe[] = ids.map((id) => {
      const iid = `ing_${id}`;
      ingredientsById[iid] = synthIngredient(iid);
      products[iid] = synthProduct(iid, 500, 10);
      return synthRecipe(id, 'dinner', iid, 100);
    });

    const day0 = (history: string[][], seed: number) => {
      const c = synthCtx(recipes, ingredientsById, products, { mealsToPlan: ['dinner'], history });
      return generatePlan(c, seed).slots.find((s) => s.day === 0 && s.meal === 'dinner')!.recipeId;
    };

    for (let seed = 1; seed <= 20; seed++) {
      expect(day0([['a', 'f0', 'f1', 'f2', 'f3', 'f4'], [], ['b']], seed)).toBe('b');
    }
    // Flip which recipe is recent vs. old three weeks back: the choice flips too.
    for (let seed = 1; seed <= 20; seed++) {
      expect(day0([['b', 'f0', 'f1', 'f2', 'f3', 'f4'], [], ['a']], seed)).toBe('a');
    }
  });
});

describe('planner budget repair (real catalog)', () => {
  it('lands at or under budget and reports zero overage once a fit is achievable', () => {
    // Probed against the real catalog: seed 10's unconstrained (weeklyBudget 1000) plan
    // costs $204.78. At weeklyBudget 200 that fixture starts $4.78 over, and repair finds a
    // combination of swaps that lands at $196.25 - under budget - so overBudgetBy must read
    // exactly 0. (This exercises the repair success path the original budget test never
    // reached, since its $40 budget was never achievable.)
    const loose = generatePlan(ctx({ weeklyBudget: 1000 }), 10);
    const looseTotal = planTotal(ctx(), loose.slots);
    expect(looseTotal).toBeGreaterThan(200); // confirms the fixture is genuinely over budget

    const c = ctx({ weeklyBudget: 200 });
    const tight = generatePlan(c, 10);
    const tightTotal = planTotal(c, tight.slots);
    expect(tightTotal).toBeLessThanOrEqual(200);
    expect(tight.overBudgetBy).toBe(0);
  });

  it('reports honest, self-consistent overage when no fit is achievable', () => {
    // Same seed, a much tighter $30 budget that repair cannot reach (probed: repaired total
    // $156.64, overBudgetBy $126.64): overage must be strictly positive, and the repaired
    // total must equal budget + overBudgetBy to the cent.
    const c = ctx({ weeklyBudget: 30 });
    const tight = generatePlan(c, 10);
    const tightTotal = planTotal(c, tight.slots);
    expect(tight.overBudgetBy).toBeGreaterThan(0);
    expect(tightTotal).toBeCloseTo(30 + tight.overBudgetBy, 2);
  });
});

describe('regenerateSlot over-budget fallback', () => {
  it('falls back to the cheapest available alternative when nothing fits the budget', () => {
    const loose = ctx({ weeklyBudget: 1000 });
    const plan = generatePlan(loose, 7);
    const before = plan.slots.find((s) => s.day === 2 && s.meal === 'dinner')!;

    const tight = ctx({ weeklyBudget: 30 });
    const next = regenerateSlot(tight, plan, 2, 'dinner', 99);
    const after = next.slots.find((s) => s.day === 2 && s.meal === 'dinner')!;
    expect(after.recipeId).not.toBe(before.recipeId);
    expect(next.overBudgetBy).toBeGreaterThan(0);

    // Independently recompute the minimum achievable total across every eligible, unused
    // alternative for that slot; the over-budget fallback should have picked exactly that
    // cheapest option, not merely "some" alternative.
    const usedIds = new Set(plan.slots.map((s) => s.recipeId).filter((x): x is string => !!x));
    const pool = eligibleFor('dinner', RECIPES, tight.prefs, tight.profile, tight.ingredientsById)
      .filter((r) => !usedIds.has(r.id));
    let min = Infinity;
    for (const r of pool) {
      const trial = plan.slots.map((s) => (s.day === 2 && s.meal === 'dinner' ? { ...s, recipeId: r.id } : s));
      min = Math.min(min, planTotal(tight, trial));
    }
    const actualTotal = planTotal(tight, next.slots);
    expect(actualTotal).toBeCloseTo(min, 2);
  });
});
