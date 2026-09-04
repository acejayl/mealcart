import { useState } from 'react';
import { useApp } from '../../state/context';
import { makePlan } from '../../state/actions';
import { profileFor } from '../../state/selectors';
import { eligibleCounts } from '../../domain/eligibility';
import { INGREDIENTS_BY_ID, RECIPES } from '../../data';
import { MEAL_LABELS } from '../../domain/types';
import { Banner } from '../components/Banner';
import {
  AppliancesSection, BudgetSection, DEFAULT_PREFS, DietSection, StaplesSection, StoreSection,
} from '../components/PrefsSections';

const STEPS = ['Store', 'Budget', 'Diet', 'Kitchen', 'Pantry'];

export function SetupScreen() {
  const { state, dispatch } = useApp();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(DEFAULT_PREFS);

  const counts = eligibleCounts(RECIPES, draft, profileFor(draft), INGREDIENTS_BY_ID);
  const thin = draft.mealsToPlan.filter((m) => counts[m] < 7);

  function finish() {
    const plan = makePlan(state, draft);
    dispatch({ type: 'SET_PREFS', prefs: draft });
    dispatch({ type: 'SET_PLAN', plan, archivePrevious: false });
  }

  return (
    <main className="screen no-tabs">
      <h1>MealCart</h1>
      <p className="muted">A week of meals, planned around your store and budget.</p>
      <div className="wizard-steps" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
        {STEPS.map((s, i) => <span key={s} className={i <= step ? 'on' : ''} />)}
      </div>
      <h2>{STEPS[step]}</h2>
      {step === 0 && <StoreSection value={draft} onChange={setDraft} />}
      {step === 1 && <BudgetSection value={draft} onChange={setDraft} />}
      {step === 1 && draft.storeId === 'costco' && (
        <Banner tone="info">
          Costco sells bulk packs — a week for 2 people usually runs $250 or more here.
        </Banner>
      )}
      {step === 2 && <DietSection value={draft} onChange={setDraft} />}
      {step === 3 && <AppliancesSection value={draft} onChange={setDraft} />}
      {step === 4 && <StaplesSection value={draft} onChange={setDraft} />}
      {step === 4 && thin.length > 0 && (
        <Banner tone="warn">
          Only a few recipes fit your filters for {thin.map((m) => MEAL_LABELS[m].toLowerCase()).join(' and ')}
          {' '}({thin.map((m) => counts[m]).join(', ')} found). You may see repeats or empty slots. Loosen the diet, allergens or appliances to get more variety.
        </Banner>
      )}
      <div className="row between" style={{ marginTop: 16 }}>
        <button className="btn" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
        {step < STEPS.length - 1
          ? <button className="btn primary" onClick={() => setStep(step + 1)}>Next</button>
          : <button className="btn primary" onClick={finish}>Plan my week</button>}
      </div>
    </main>
  );
}
