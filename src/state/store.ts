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
      return { ...state, prefs: action.prefs };
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

export function loadState(storage: Storage | null = getStorage()): AppState {
  if (!storage) return initialState;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    if (parsed.schemaVersion !== 1) return initialState;
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
