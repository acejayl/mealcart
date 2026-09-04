import { useApp } from '../../state/context';
import { overridesFor, profileFor, shoppingListFor, storeFor } from '../../state/selectors';
import { regenerateOne, regenerateWeek } from '../../state/actions';
import { recipeCostPerServing } from '../../domain/shoppingList';
import { dayNutrition, recipeNutritionPerServing } from '../../domain/nutrition';
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

  function regenWeek() {
    const next = regenerateWeek(state);
    if (next) dispatch({ type: 'SET_PLAN', plan: next, archivePrevious: true });
  }
  function regenSlot(day: number, meal: (typeof MEAL_TYPES)[number]) {
    const next = regenerateOne(state, day, meal);
    if (next) dispatch({ type: 'UPDATE_PLAN', plan: next });
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
              if (!recipe) {
                // No slot at all = this meal type was added after the plan was made; an empty
                // slot = the planner had nothing eligible left to put there.
                return (
                  <div key={meal} className="card row between">
                    <span className="muted">
                      {MEAL_LABELS[meal]}: {slot ? 'no recipe fits your filters' : 'Not planned yet — tap ↻ to add one'}
                    </span>
                    <button className="btn icon" onClick={() => regenSlot(day, meal)} aria-label={`Try again for ${MEAL_LABELS[meal]}`}>↻</button>
                  </div>
                );
              }
              return (
                <MealCard key={meal} recipe={recipe}
                  costPerServing={recipeCostPerServing(recipe, profile, overrides, prefs.stapleIds, INGREDIENTS_BY_ID)}
                  kcal={recipeNutritionPerServing(recipe, INGREDIENTS_BY_ID).kcal}
                  onOpen={() => onOpenRecipe(recipe.id)} onRegenerate={() => regenSlot(day, meal)} />
              );
            })}
          </section>
        );
      })}
    </>
  );
}
