import type { Ingredient, MealType, Plan, PlanSlot, Preferences, Recipe, StoreProfile } from './types';
import { MEAL_TYPES, round2 } from './types';
import { eligibleFor } from './eligibility';
import { buildShoppingList } from './shoppingList';
import { scaleFactor } from './scaling';

export interface PlannerContext {
  prefs: Preferences;
  profile: StoreProfile;
  recipes: Recipe[];
  ingredientsById: Record<string, Ingredient>;
  priceOverrides: Record<string, number>;
  /** Recipe ids of previous plans, most recent first. */
  history: string[][];
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAYS = [0, 1, 2, 3, 4, 5, 6];
const FILL_ORDER: MealType[] = ['dinner', 'lunch', 'breakfast'];
const MEAL_INDEX: Record<MealType, number> = { breakfast: 0, lunch: 1, dinner: 2 };
const ALT_LIMIT = 8; // cheapest alternatives tried per slot during budget repair

type Cart = Map<string, { needed: number; packSize: number }>;

function byId(recipes: Recipe[]): Record<string, Recipe> {
  return Object.fromEntries(recipes.map((r) => [r.id, r]));
}

export function planTotal(ctx: PlannerContext, slots: PlanSlot[]): number {
  return buildShoppingList({
    slots, prefs: ctx.prefs, profile: ctx.profile, recipesById: byId(ctx.recipes),
    ingredientsById: ctx.ingredientsById, priceOverrides: ctx.priceOverrides, checked: {},
  }).total;
}

function cartFrom(ctx: PlannerContext, slots: PlanSlot[], recipesById: Record<string, Recipe>): Cart {
  const cart: Cart = new Map();
  const staples = new Set(ctx.prefs.stapleIds);
  for (const s of slots) {
    if (!s.recipeId) continue;
    const r = recipesById[s.recipeId];
    if (!r) continue;
    addToCart(cart, r, ctx, staples);
  }
  return cart;
}

function addToCart(cart: Cart, recipe: Recipe, ctx: PlannerContext, staples: Set<string>): void {
  const f = scaleFactor(recipe, ctx.prefs.householdSize);
  for (const ri of recipe.ingredients) {
    if (staples.has(ri.ingredientId)) continue;
    const product = ctx.profile.products[ri.ingredientId];
    if (!product || !product.available) continue;
    const cur = cart.get(ri.ingredientId) ?? { needed: 0, packSize: product.packSize };
    cur.needed += ri.qty * f;
    cart.set(ri.ingredientId, cur);
  }
}

function score(
  recipe: Recipe, slot: PlanSlot, chosen: PlanSlot[], cart: Cart,
  ctx: PlannerContext, recipesById: Record<string, Recipe>, staples: Set<string>, rng: () => number,
): number {
  let s = 0;
  const f = scaleFactor(recipe, ctx.prefs.householdSize);
  let reuse = 0;
  for (const ri of recipe.ingredients) {
    if (staples.has(ri.ingredientId)) continue;
    const c = cart.get(ri.ingredientId);
    if (!c) continue;
    const leftover = Math.ceil(c.needed / c.packSize - 1e-9) * c.packSize - c.needed;
    reuse += ri.qty * f <= leftover + 1e-9 ? 1 : 0.3;
  }
  s += reuse * 0.5;
  ctx.history.forEach((week, i) => { if (week.includes(recipe.id)) s -= Math.max(1, 3 - i); });
  if (recipe.proteinGroup !== 'none') {
    for (const c of chosen) {
      if (!c.recipeId) continue;
      const other = recipesById[c.recipeId];
      if (!other || other.proteinGroup !== recipe.proteinGroup) continue;
      if (c.day === slot.day) s -= 2;
      else if (Math.abs(c.day - slot.day) === 1 && c.meal === slot.meal) s -= 1;
    }
  }
  return s + rng() * 1.5;
}

function sortSlots(slots: PlanSlot[]): PlanSlot[] {
  return [...slots].sort((a, b) => a.day - b.day || MEAL_INDEX[a.meal] - MEAL_INDEX[b.meal]);
}

function standaloneCost(ctx: PlannerContext, recipe: Recipe): number {
  return planTotal(ctx, [{ day: 0, meal: recipe.mealType, recipeId: recipe.id }]);
}

function repairBudget(ctx: PlannerContext, slots: PlanSlot[], pools: Map<MealType, Recipe[]>): PlanSlot[] {
  const budget = ctx.prefs.weeklyBudget;
  let current = [...slots];
  let total = planTotal(ctx, current);
  const costCache = new Map<string, number>();
  const cheapest = (meal: MealType, used: Set<string>): Recipe[] =>
    (pools.get(meal) ?? [])
      .filter((r) => !used.has(r.id))
      .map((r) => { if (!costCache.has(r.id)) costCache.set(r.id, standaloneCost(ctx, r)); return r; })
      .sort((a, b) => costCache.get(a.id)! - costCache.get(b.id)!)
      .slice(0, ALT_LIMIT);

  while (total > budget) {
    const used = new Set(current.map((s) => s.recipeId).filter((x): x is string => !!x));
    let best: { idx: number; recipeId: string; total: number } | null = null;
    current.forEach((slot, idx) => {
      if (!slot.recipeId) return;
      for (const alt of cheapest(slot.meal, used)) {
        const trial = [...current];
        trial[idx] = { ...slot, recipeId: alt.id };
        const t = planTotal(ctx, trial);
        if (t < total - 0.005 && (!best || t < best.total)) best = { idx, recipeId: alt.id, total: t };
      }
    });
    if (!best) break;
    const b: { idx: number; recipeId: string; total: number } = best;
    current[b.idx] = { ...current[b.idx], recipeId: b.recipeId };
    total = b.total;
  }
  return current;
}

export function generatePlan(ctx: PlannerContext, seed: number): Plan {
  const rng = mulberry32(seed);
  const recipesById = byId(ctx.recipes);
  const staples = new Set(ctx.prefs.stapleIds);
  const pools = new Map<MealType, Recipe[]>();
  for (const m of MEAL_TYPES) pools.set(m, eligibleFor(m, ctx.recipes, ctx.prefs, ctx.profile, ctx.ingredientsById));

  const slots: PlanSlot[] = [];
  const used = new Set<string>();
  const cart: Cart = new Map();
  for (const meal of FILL_ORDER) {
    if (!ctx.prefs.mealsToPlan.includes(meal)) continue;
    for (const day of DAYS) {
      const slot: PlanSlot = { day, meal, recipeId: null };
      const candidates = (pools.get(meal) ?? []).filter((r) => !used.has(r.id));
      if (candidates.length === 0) { slots.push(slot); continue; }
      let best = candidates[0];
      let bestScore = -Infinity;
      for (const r of candidates) {
        const sc = score(r, slot, slots, cart, ctx, recipesById, staples, rng);
        if (sc > bestScore) { best = r; bestScore = sc; }
      }
      used.add(best.id);
      addToCart(cart, best, ctx, staples);
      slots.push({ ...slot, recipeId: best.id });
    }
  }

  const repaired = repairBudget(ctx, slots, pools);
  const total = planTotal(ctx, repaired);
  return {
    id: `plan-${seed}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    storeId: ctx.prefs.storeId,
    slots: sortSlots(repaired),
    seed,
    overBudgetBy: Math.max(0, round2(total - ctx.prefs.weeklyBudget)),
  };
}

export function regenerateSlot(ctx: PlannerContext, plan: Plan, day: number, meal: MealType, seed: number): Plan {
  const rng = mulberry32(seed);
  const recipesById = byId(ctx.recipes);
  const staples = new Set(ctx.prefs.stapleIds);
  const existing = plan.slots.findIndex((s) => s.day === day && s.meal === meal);
  // The slot can be absent entirely when the user added a meal type to `mealsToPlan` and kept
  // the old plan. Append an empty slot so ↻ fills it, instead of silently doing nothing.
  const base: PlanSlot[] = existing >= 0 ? plan.slots : [...plan.slots, { day, meal, recipeId: null }];
  const idx = existing >= 0 ? existing : base.length - 1;
  const current = base[idx];
  const used = new Set(base.map((s) => s.recipeId).filter((x): x is string => !!x));
  const pool = eligibleFor(meal, ctx.recipes, ctx.prefs, ctx.profile, ctx.ingredientsById).filter((r) => !used.has(r.id));
  if (pool.length === 0) return plan;

  const others = base.filter((_, i) => i !== idx);
  const cart = cartFrom(ctx, others, recipesById);
  const scored = pool.map((r) => {
    const trial = [...base];
    trial[idx] = { ...current, recipeId: r.id };
    return { r, total: planTotal(ctx, trial), s: score(r, current, others, cart, ctx, recipesById, staples, rng) };
  });
  const within = scored.filter((c) => c.total <= ctx.prefs.weeklyBudget + 1e-9);
  const pick = within.length > 0
    ? within.reduce((a, b) => (b.s > a.s ? b : a))
    : scored.reduce((a, b) => (b.total < a.total ? b : a));

  const slots = [...base];
  slots[idx] = { ...current, recipeId: pick.r.id };
  return { ...plan, slots: sortSlots(slots), seed, overBudgetBy: Math.max(0, round2(pick.total - ctx.prefs.weeklyBudget)) };
}
