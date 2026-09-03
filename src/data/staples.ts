import { INGREDIENTS } from './ingredients';

/** Ingredient ids pre-checked as "always in my pantry" during setup. */
export const DEFAULT_STAPLE_IDS: string[] = INGREDIENTS.filter((i) => i.defaultStaple).map((i) => i.id);
