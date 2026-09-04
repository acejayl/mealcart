import { useApp } from '../../state/context';
import { profileFor } from '../../state/selectors';
import { INGREDIENTS_BY_ID, RECIPES_BY_ID } from '../../data';
import { formatQty, scaleFactor } from '../../domain/scaling';
import { recipeMinutes, recipeNutritionPerServing } from '../../domain/nutrition';

export function RecipeScreen({ recipeId, onBack }: { recipeId: string; onBack: () => void }) {
  const { state } = useApp();
  const prefs = state.prefs!;
  const recipe = RECIPES_BY_ID[recipeId];
  if (!recipe) return <><button className="btn" onClick={onBack}>← Back</button><p>Recipe not found.</p></>;
  const profile = profileFor(prefs);
  const f = scaleFactor(recipe, prefs.householdSize);
  const n = recipeNutritionPerServing(recipe, INGREDIENTS_BY_ID);
  const staples = new Set(prefs.stapleIds);

  return (
    <>
      <button className="btn" onClick={onBack}>← Back to plan</button>
      <h1 style={{ marginTop: 12 }}>{recipe.emoji} {recipe.name}</h1>
      <p className="muted">{recipe.prepMinutes} min prep · {recipe.cookMinutes} min cook · {recipeMinutes(recipe)} min total</p>
      <p className="muted">Scaled to {prefs.householdSize} {prefs.householdSize === 1 ? 'serving' : 'servings'} (recipe makes {recipe.servings})</p>
      <div className="card row between">
        <span>Per serving</span>
        <span className="small">{n.kcal} kcal · {n.proteinG}g protein · {n.carbsG}g carbs · {n.fatG}g fat</span>
      </div>
      <h2>Ingredients</h2>
      <ul className="ingredients">
        {recipe.ingredients.map((ri) => {
          const ing = INGREDIENTS_BY_ID[ri.ingredientId];
          const product = profile.products[ri.ingredientId];
          return (
            <li key={ri.ingredientId}>
              <span>
                {ing.name}{ri.note ? ` (${ri.note})` : ''}
                <div className="muted small">{staples.has(ri.ingredientId) ? 'pantry staple' : product?.available ? product.name : 'not sold at this store'}</div>
              </span>
              <span>{formatQty(ri.qty * f, ing.unit)}</span>
            </li>
          );
        })}
      </ul>
      <h2>Steps</h2>
      <ol className="steps">{recipe.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
    </>
  );
}
