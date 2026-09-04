import type { Recipe } from '../../domain/types';
import { recipeMinutes } from '../../domain/nutrition';

export function MealCard({ recipe, costPerServing, kcal, warn, note, onOpen, onRegenerate }: {
  recipe: Recipe; costPerServing: number; kcal: number;
  /** Shown under the meta line when this meal no longer matches the saved preferences. */
  warn?: string;
  /** Feedback from the last ↻ press, e.g. when there was nothing to swap in. */
  note?: string;
  onOpen: () => void; onRegenerate: () => void;
}) {
  return (
    <div className="card row">
      <div className="row grow tappable" role="button" tabIndex={0} onClick={onOpen}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(); }}>
        <div className="emoji" aria-hidden>{recipe.emoji}</div>
        <div className="grow">
          <div>{recipe.name}</div>
          <div className="muted small">{recipeMinutes(recipe)} min · ${costPerServing.toFixed(2)}/serving · {kcal} kcal</div>
          {warn && <div className="warn-line small">⚠ {warn}</div>}
          {note && <div className="muted small" role="status">{note}</div>}
        </div>
      </div>
      <button className="btn icon" aria-label={`Regenerate ${recipe.name}`} title="Swap this meal" onClick={onRegenerate}>↻</button>
    </div>
  );
}
