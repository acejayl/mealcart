import { useState } from 'react';
import { useApp } from '../../state/context';
import { makePlan } from '../../state/actions';
import type { Preferences } from '../../domain/types';
import { Banner } from '../components/Banner';
import { AppliancesSection, BudgetSection, DietSection, StaplesSection, StoreSection } from '../components/PrefsSections';

const REGEN_KEYS: (keyof Preferences)[] = ['storeId', 'diet', 'excludedAllergens', 'appliances', 'mealsToPlan'];

function sameList(a: unknown, b: unknown): boolean {
  return JSON.stringify(Array.isArray(a) ? [...a].sort() : a) === JSON.stringify(Array.isArray(b) ? [...b].sort() : b);
}

export function SettingsScreen() {
  const { state, dispatch } = useApp();
  const saved = state.prefs!;
  const [draft, setDraft] = useState<Preferences>(saved);
  const [confirmRegen, setConfirmRegen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [savedNote, setSavedNote] = useState(false);

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const needsRegen = REGEN_KEYS.some((k) => !sameList(draft[k], saved[k]));

  function save(regenerate: boolean) {
    dispatch({ type: 'SET_PREFS', prefs: draft });
    if (regenerate) dispatch({ type: 'SET_PLAN', plan: makePlan(state, draft), archivePrevious: true });
    setConfirmRegen(false);
    setSavedNote(true);
    window.setTimeout(() => setSavedNote(false), 2000);
  }

  return (
    <>
      <h1>Settings</h1>
      <StoreSection value={draft} onChange={setDraft} />
      <BudgetSection value={draft} onChange={setDraft} />
      <DietSection value={draft} onChange={setDraft} />
      <AppliancesSection value={draft} onChange={setDraft} />
      <StaplesSection value={draft} onChange={setDraft} />

      {savedNote && <Banner tone="info">Saved.</Banner>}
      {confirmRegen ? (
        <div className="card">
          <p>These changes affect which recipes fit. Regenerate this week's plan?</p>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn primary" onClick={() => save(true)}>Regenerate plan</button>
            <button className="btn" onClick={() => save(false)}>Keep current plan</button>
          </div>
        </div>
      ) : (
        <button className="btn primary block" disabled={!dirty} onClick={() => (needsRegen && state.plan ? setConfirmRegen(true) : save(false))}>
          Save changes
        </button>
      )}

      <h2>Data</h2>
      <p className="muted small">
        Everything is stored on this device only. On iPhone, add MealCart to your Home Screen (Share → Add to Home Screen) so Safari never clears it.
      </p>
      {confirmReset ? (
        <div className="row">
          <button className="btn danger" onClick={() => dispatch({ type: 'RESET' })}>Yes, erase everything</button>
          <button className="btn" onClick={() => setConfirmReset(false)}>Cancel</button>
        </div>
      ) : (
        <button className="btn danger" onClick={() => setConfirmReset(true)}>Reset all data</button>
      )}
    </>
  );
}
