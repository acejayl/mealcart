import type { Plan, Preferences, StoreProfileId } from '../domain/types';

export interface AppState {
  schemaVersion: 1;
  prefs: Preferences | null;
  plan: Plan | null;
  checked: Record<string, boolean>;
  priceOverrides: Record<StoreProfileId, Record<string, number>>;
  history: string[][];
}

export const STORAGE_KEY = 'mealcart.v1';

export const initialState: AppState = {
  schemaVersion: 1,
  prefs: null,
  plan: null,
  checked: {},
  priceOverrides: { traderJoes: {}, conventional: {}, costco: {}, natural: {} },
  history: [],
};

export type Action =
  | { type: 'SET_PREFS'; prefs: Preferences }
  | { type: 'SET_PLAN'; plan: Plan; archivePrevious: boolean }
  /** Replace the plan in place (single-meal swap): keeps checks and history. */
  | { type: 'UPDATE_PLAN'; plan: Plan }
  | { type: 'TOGGLE_CHECKED'; ingredientId: string }
  | { type: 'SET_PRICE_OVERRIDE'; profile: StoreProfileId; ingredientId: string; price: number | null }
  | { type: 'RESET' };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PREFS':
      // Keep plan.storeId in step with the prefs the plan is now displayed and priced under,
      // so the field can never go stale after a store change with "Keep current plan".
      return {
        ...state,
        prefs: action.prefs,
        plan: state.plan ? { ...state.plan, storeId: action.prefs.storeId } : state.plan,
      };
    case 'SET_PLAN': {
      const prevIds = state.plan?.slots.map((s) => s.recipeId).filter((x): x is string => !!x) ?? [];
      const history = action.archivePrevious && prevIds.length > 0 ? [prevIds, ...state.history].slice(0, 3) : state.history;
      return { ...state, plan: action.plan, checked: {}, history };
    }
    case 'UPDATE_PLAN':
      return { ...state, plan: action.plan };
    case 'TOGGLE_CHECKED':
      return { ...state, checked: { ...state.checked, [action.ingredientId]: !state.checked[action.ingredientId] } };
    case 'SET_PRICE_OVERRIDE': {
      const forProfile = { ...state.priceOverrides[action.profile] };
      if (action.price === null) delete forProfile[action.ingredientId];
      else forProfile[action.ingredientId] = action.price;
      return { ...state, priceOverrides: { ...state.priceOverrides, [action.profile]: forProfile } };
    }
    case 'RESET':
      return initialState;
  }
}

function getStorage(): Storage | null {
  try { return typeof localStorage === 'undefined' ? null : localStorage; } catch { return null; }
}

/**
 * Cheap shape check on the two records the UI dereferences without guarding. schemaVersion
 * alone is not enough: the first time a field is added or renamed without bumping it, an
 * install with old saved state would throw on every launch. Anything unexpected is discarded
 * so the app starts at setup instead of dying.
 */
function looksUsable(parsed: Partial<AppState>): boolean {
  // `parsed` is only typed by assertion - at runtime these are whatever was on disk.
  const prefs = parsed.prefs as unknown;
  const plan = parsed.plan as unknown;
  if (prefs !== undefined && prefs !== null) {
    if (typeof prefs !== 'object' || Array.isArray(prefs)) return false;
    const p = prefs as Record<string, unknown>;
    if (typeof p.storeId !== 'string') return false;
    for (const k of ['mealsToPlan', 'appliances', 'excludedAllergens', 'stapleIds']) {
      if (!Array.isArray(p[k])) return false;
    }
  }
  if (plan !== undefined && plan !== null) {
    if (typeof plan !== 'object' || Array.isArray(plan)) return false;
    if (!Array.isArray((plan as Record<string, unknown>).slots)) return false;
  }
  return true;
}

export function loadState(storage: Storage | null = getStorage()): AppState {
  if (!storage) return initialState;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    if (parsed.schemaVersion !== 1) return initialState;
    if (!looksUsable(parsed)) throw new Error('saved state has an unexpected shape');
    return {
      ...initialState,
      ...parsed,
      priceOverrides: { ...initialState.priceOverrides, ...(parsed.priceOverrides ?? {}) },
    };
  } catch (err) {
    console.warn('MealCart: discarding unreadable saved state', err);
    return initialState;
  }
}

export function saveState(state: AppState, storage: Storage | null = getStorage()): void {
  if (!storage) return;
  try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (err) { console.warn('MealCart: could not save', err); }
}
