import type { Preferences, ShoppingListResult, Store, StoreProfile } from '../domain/types';
import { INGREDIENTS_BY_ID, PROFILES, RECIPES, RECIPES_BY_ID, STORES_BY_ID } from '../data';
import { buildShoppingList } from '../domain/shoppingList';
import type { PlannerContext } from '../domain/planner';
import type { AppState } from './store';

export function storeFor(prefs: Preferences): Store {
  return STORES_BY_ID[prefs.storeId] ?? STORES_BY_ID['qfc'];
}

export function profileFor(prefs: Preferences): StoreProfile {
  return PROFILES[storeFor(prefs).profile];
}

export function overridesFor(state: AppState): Record<string, number> {
  if (!state.prefs) return {};
  return state.priceOverrides[storeFor(state.prefs).profile] ?? {};
}

export function plannerContext(state: AppState, prefs: Preferences | null = state.prefs): PlannerContext | null {
  if (!prefs) return null;
  return {
    prefs, profile: profileFor(prefs), recipes: RECIPES, ingredientsById: INGREDIENTS_BY_ID,
    priceOverrides: state.priceOverrides[storeFor(prefs).profile] ?? {}, history: state.history,
  };
}

export function shoppingListFor(state: AppState): ShoppingListResult | null {
  if (!state.prefs || !state.plan) return null;
  return buildShoppingList({
    slots: state.plan.slots, prefs: state.prefs, profile: profileFor(state.prefs),
    recipesById: RECIPES_BY_ID, ingredientsById: INGREDIENTS_BY_ID,
    priceOverrides: overridesFor(state), checked: state.checked,
  });
}
