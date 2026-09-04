import { useState } from 'react';
import { useApp } from '../../state/context';
import { overridesFor, profileFor, shoppingListFor, storeFor } from '../../state/selectors';
import { regenerateOne, regenerateWeek } from '../../state/actions';
import { recipeCostPerServing } from '../../domain/shoppingList';
import { dayNutrition, recipeNutritionPerServing } from '../../domain/nutrition';
import { isEligible } from '../../domain/eligibility';
import { INGREDIENTS_BY_ID, RECIPES_BY_ID } from '../../data';
import { DAY_LABELS, MEAL_LABELS, MEAL_TYPES } from '../../domain/types';
import { Banner } from '../components/Banner';
import { MealCard } from '../components/MealCard';

export function PlanScreen({ onOpenRecipe }: { onOpenRecipe: (recipeId: string) => void }) {
  const { state, dispatch } = useApp();
  const prefs = state.prefs!;
  const plan = state.plan;
  const list = shoppingListFor(state);
  const profile = profileFor(prefs);
  const overrides = overridesFor(state);
  // Slots whose last ↻ had nothing eligible left to swap in, so the press looks like a no-op.
  const [noAlternative, setNoAlternative] = useState<Record<string, boolean>>({});

  function regenWeek() {
    const next = regenerateWeek(state);
    if (next) {
      setNoAlternative({});
      dispatch({ type: 'SET_PLAN', plan: next, archivePrevious: true });
    }
  }
  function regenSlot(day: number, meal: (typeof MEAL_TYPES)[number]) {
    const key = `${day}-${meal}`;
    const at = (p: typeof plan) => p?.slots.find((s) => s.day === day && s.meal === meal)?.recipeId ?? null;
    const next = regenerateOne(state, day, meal);
    if (!next || at(next) === null || at(next) === at(state.plan)) {
      setNoAlternative((m) => ({ ...m, [key]: true }));
      return;
    }
    setNoAlternative((m) => { const { [key]: _dropped, ...rest } = m; return rest; });
    dispatch({ type: 'UPDATE_PLAN', plan: next });
  }

  if (!plan) {
    return (
      <>
        <h1>Plan</h1>
        <button className="btn primary block" onClick={regenWeek}>Plan my week</button>
      </>
    );
  }

  const total = list?.total ?? 0;
  const over = Math.max(0, Math.round((total - prefs.weeklyBudget) * 100) / 100);
  const meals = MEAL_TYPES.filter((m) => prefs.mealsToPlan.includes(m));
  // Only the meals actually shown below count toward the day's nutrition, so a kept plan that
  // still holds slots for un-planned meals cannot inflate the numbers next to each day.
  const plannedSlots = plan.slots.filter((s) => prefs.mealsToPlan.includes(s.meal));
  // A kept plan can outlive the settings it was built under (store, diet, allergens,
  // appliances). Flag those meals rather than silently rewriting the week.
  const ineligible = plannedSlots.filter((s) => {
    const r = s.recipeId ? RECIPES_BY_ID[s.recipeId] : null;
    return !!r && !isEligible(r, prefs, profile, INGREDIENTS_BY_ID);
  }).length;

  return (
    <>
      <div className="row between">
        <div>
          <h1>This week</h1>
          <p className="muted">{storeFor(prefs).name} · {prefs.householdSize} {prefs.householdSize === 1 ? 'person' : 'people'}</p>
        </div>
        <button className="btn" onClick={regenWeek}>↻ New week</button>
      </div>
      <div className="card row between">
        <span>Shopping total</span>
        <span className="total">${total.toFixed(2)} <span className="muted small">/ ${prefs.weeklyBudget.toFixed(0)}</span></span>
      </div>
      {over > 0 && (
        <Banner tone="warn">
          Over budget by ${over.toFixed(2)}. Raise the budget, plan fewer meals, or mark more pantry staples in Settings.
        </Banner>
      )}
      {ineligible > 0 && (
        <Banner tone="warn">
          {ineligible} {ineligible === 1 ? 'meal no longer fits' : 'meals no longer fit'} your settings — tap ↻ on {ineligible === 1 ? 'it' : 'them'} or start a new week.
        </Banner>
      )}
      {DAY_LABELS.map((label, day) => {
        const n = dayNutrition(day, plannedSlots, RECIPES_BY_ID, INGREDIENTS_BY_ID);
        return (
          <section key={label}>
            <div className="day-title">
              <h2>{label}</h2>
              <span className="muted small">{n.kcal} kcal · {n.proteinG}g protein</span>
            </div>
            {meals.map((meal) => {
              const slot = plan.slots.find((s) => s.day === day && s.meal === meal);
              const recipe = slot?.recipeId ? RECIPES_BY_ID[slot.recipeId] : null;
              const stuck = noAlternative[`${day}-${meal}`];
              if (!recipe) {
                // No slot at all = this meal type was added after the plan was made; an empty
                // slot = the planner had nothing eligible left to put there.
                return (
                  <div key={meal} className="card row between">
                    <div className="grow">
                      <span className="muted">
                        {MEAL_LABELS[meal]}: {slot ? 'no recipe fits your filters' : 'Not planned yet — tap ↻ to add one'}
                      </span>
                      {stuck && <div className="muted small" role="status">No other recipe fits your settings.</div>}
                    </div>
                    <button className="btn icon" onClick={() => regenSlot(day, meal)} aria-label={`Try again for ${MEAL_LABELS[meal]}`}>↻</button>
                  </div>
                );
              }
              return (
                <MealCard key={meal} recipe={recipe}
                  costPerServing={recipeCostPerServing(recipe, profile, overrides, prefs.stapleIds, INGREDIENTS_BY_ID)}
                  kcal={recipeNutritionPerServing(recipe, INGREDIENTS_BY_ID).kcal}
                  warn={isEligible(recipe, prefs, profile, INGREDIENTS_BY_ID) ? undefined : "Doesn't fit your current settings"}
                  note={stuck ? 'No other recipe fits your settings.' : undefined}
                  onOpen={() => onOpenRecipe(recipe.id)} onRegenerate={() => regenSlot(day, meal)} />
              );
            })}
          </section>
        );
      })}
    </>
  );
}
