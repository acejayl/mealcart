import type { MealType, Plan, Preferences } from '../domain/types';
import { generatePlan, regenerateSlot } from '../domain/planner';
import { plannerContext } from './selectors';
import type { AppState } from './store';

export function newSeed(): number {
  return (Date.now() ^ Math.floor(Math.random() * 2 ** 31)) >>> 0;
}

export function makePlan(state: AppState, prefs: Preferences): Plan {
  const ctx = plannerContext(state, prefs)!;
  return generatePlan(ctx, newSeed());
}

export function regenerateWeek(state: AppState): Plan | null {
  const ctx = plannerContext(state);
  return ctx ? generatePlan(ctx, newSeed()) : null;
}

export function regenerateOne(state: AppState, day: number, meal: MealType): Plan | null {
  const ctx = plannerContext(state);
  if (!ctx || !state.plan) return null;
  return regenerateSlot(ctx, state.plan, day, meal, newSeed());
}
