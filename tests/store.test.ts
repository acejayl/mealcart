import { describe, it, expect } from 'vitest';
import { reducer, initialState, loadState, saveState, STORAGE_KEY, type AppState } from '../src/state/store';
import { defaultPrefs } from './helpers';
import type { Plan } from '../src/domain/types';

function memoryStorage(): Storage {
  const m = new Map<string, string>();
  return {
    getItem: (k) => m.get(k) ?? null, setItem: (k, v) => void m.set(k, v), removeItem: (k) => void m.delete(k),
    clear: () => m.clear(), key: (i) => [...m.keys()][i] ?? null, get length() { return m.size; },
  } as Storage;
}

const plan: Plan = { id: 'p1', createdAt: 'x', storeId: 'qfc', seed: 1, overBudgetBy: 0,
  slots: [{ day: 0, meal: 'dinner', recipeId: 'beef-tacos' }] };

describe('reducer', () => {
  it('sets prefs', () => {
    const s = reducer(initialState, { type: 'SET_PREFS', prefs: defaultPrefs() });
    expect(s.prefs?.storeId).toBe('qfc');
  });
  it('sets a plan, archives the previous one, and clears checks', () => {
    let s = reducer(initialState, { type: 'SET_PLAN', plan, archivePrevious: false });
    s = reducer(s, { type: 'TOGGLE_CHECKED', ingredientId: 'ground-beef' });
    expect(s.checked['ground-beef']).toBe(true);
    const plan2 = { ...plan, id: 'p2', slots: [{ day: 0, meal: 'dinner' as const, recipeId: 'chicken-tacos' }] };
    s = reducer(s, { type: 'SET_PLAN', plan: plan2, archivePrevious: true });
    expect(s.history).toEqual([['beef-tacos']]);
    expect(s.checked).toEqual({});
    expect(s.plan?.id).toBe('p2');
  });
  it('updates a plan in place without touching checks or history', () => {
    let s = reducer(initialState, { type: 'SET_PLAN', plan, archivePrevious: false });
    s = reducer(s, { type: 'TOGGLE_CHECKED', ingredientId: 'ground-beef' });
    s = reducer(s, { type: 'UPDATE_PLAN', plan: { ...plan, id: 'p1b' } });
    expect(s.plan?.id).toBe('p1b');
    expect(s.checked['ground-beef']).toBe(true);
    expect(s.history).toEqual([]);
  });
  it('keeps at most three weeks of history', () => {
    let s = reducer(initialState, { type: 'SET_PLAN', plan, archivePrevious: false });
    for (let i = 0; i < 5; i++) s = reducer(s, { type: 'SET_PLAN', plan: { ...plan, id: `p${i}` }, archivePrevious: true });
    expect(s.history).toHaveLength(3);
  });
  it('sets and clears price overrides per profile', () => {
    let s = reducer(initialState, { type: 'SET_PRICE_OVERRIDE', profile: 'costco', ingredientId: 'eggs', price: 5.5 });
    expect(s.priceOverrides.costco.eggs).toBe(5.5);
    expect(s.priceOverrides.conventional.eggs).toBeUndefined();
    s = reducer(s, { type: 'SET_PRICE_OVERRIDE', profile: 'costco', ingredientId: 'eggs', price: null });
    expect(s.priceOverrides.costco.eggs).toBeUndefined();
  });
  it('resets everything', () => {
    const s = reducer(reducer(initialState, { type: 'SET_PREFS', prefs: defaultPrefs() }), { type: 'RESET' });
    expect(s).toEqual(initialState);
  });
});

describe('persistence', () => {
  it('round-trips state', () => {
    const storage = memoryStorage();
    const s: AppState = { ...initialState, prefs: defaultPrefs() };
    saveState(s, storage);
    expect(loadState(storage)).toEqual(s);
  });
  it('falls back to initial state on garbage', () => {
    const storage = memoryStorage();
    storage.setItem(STORAGE_KEY, '{not json');
    expect(loadState(storage)).toEqual(initialState);
    storage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 99 }));
    expect(loadState(storage)).toEqual(initialState);
  });
});
